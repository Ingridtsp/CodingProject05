'use client';

'use client';

import { useEffect, useMemo, useState } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import TicketList from './TicketList';
import StatusMessage from './StatusMessage';
import MyQueueSummary from './MyQueueSummary';
import { nextStatus, nudgePriority } from '../lib/severity';

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({}); // { [id]: true }

  // Fetch on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/tickets', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!cancelled) {
          setTickets(data);
          setError('');
        }
      } catch (e) {
        if (!cancelled) setError('Unable to load tickets.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Simulate live updates (status/priority churn)
  useEffect(() => {
    if (!tickets.length) return;
    const interval = setInterval(() => {
      setTickets(prev => {
        if (prev.length === 0) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        const t = prev[idx];

        const flip = Math.random() < 0.5 ? 'status' : 'priority';
        const updated = { ...t, updatedAt: new Date().toISOString() };
        if (flip === 'status') {
          updated.status = nextStatus(t.status);
        } else {
          const dir = Math.random() < 0.5 ? -1 : 1;
          updated.priority = nudgePriority(t.priority, dir);
        }
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      });
    }, Math.floor(6000 + Math.random() * 4000)); // 6–10s
    return () => clearInterval(interval);
  }, [tickets.length]);

  // Derived visible tickets
  const visibleTickets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter(t => {
      const statusOk = filters.status === 'All' || t.status === filters.status;
      const priorityOk = filters.priority === 'All' || t.priority === filters.priority;
      const searchOk =
        q.length === 0 ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return statusOk && priorityOk && searchOk;
    });
  }, [tickets, filters, search]);

  const handleAddToQueue = (id) => {
    setQueue(prev => ({ ...prev, [id]: true }));
  };
  const handleRemoveFromQueue = (id) => {
    setQueue(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };
  const handleClearQueue = () => setQueue({});

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <StatusFilter
          value={filters.status}
          onChange={(v) => setFilters(f => ({ ...f, status: v }))}
        />
        <PriorityFilter
          value={filters.priority}
          onChange={(v) => setFilters(f => ({ ...f, priority: v }))}
        />
        <SearchBox value={search} onChange={setSearch} />
      </div>

      {/* Status messages */}
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && visibleTickets.length === 0}
      />

      {/* List */}
      {!loading && !error && visibleTickets.length > 0 && (
        <TicketList
          tickets={visibleTickets}
          queue={queue}
          onAddToQueue={handleAddToQueue}
        />
      )}

      {/* Queue summary */}
      <MyQueueSummary
        tickets={tickets}
        queue={queue}
        onRemove={handleRemoveFromQueue}
        onClear={handleClearQueue}
      />
    </div>
  );
}



