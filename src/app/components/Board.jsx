'use client';

import { useEffect, useMemo, useState } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import TicketList from './TicketList';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';
import { nextStatus, adjustPriority } from '../lib/severity';

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});

  // Fetch tickets on mount
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tickets');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (active) setTickets(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!tickets.length) return;
    const update = () => {
      setTickets(prev => {
        const copy = [...prev];
        const i = Math.floor(Math.random() * copy.length);
        const t = copy[i];
        const updated = {
          ...t,
          status: Math.random() < 0.5 ? nextStatus(t.status) : t.status,
          priority: Math.random() >= 0.5 ? adjustPriority(t.priority) : t.priority,
          updatedAt: new Date().toISOString(),
        };
        copy[i] = updated;
        return copy;
      });
    };
    const interval = setInterval(update, 8000);
    return () => clearInterval(interval);
  }, [tickets.length]);

  const visibleTickets = useMemo(() => {
    const q = search.toLowerCase();
    return tickets.filter(t => {
      const statusOk = filters.status === 'All' || t.status === filters.status;
      const priorityOk = filters.priority === 'All' || t.priority === filters.priority;
      const textOk =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return statusOk && priorityOk && textOk;
    });
  }, [tickets, filters, search]);

  const addToQueue = id =>
    setQueue(prev => (prev[id] ? prev : { ...prev, [id]: true }));
  const removeFromQueue = id =>
    setQueue(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  const clearQueue = () => setQueue({});

  const queuedTickets = tickets.filter(t => queue[t.id]);
  const isEmpty = !loading && !error && visibleTickets.length === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <section className="lg:col-span-3 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <StatusFilter
            value={filters.status}
            onChange={v => setFilters(f => ({ ...f, status: v }))}
          />
          <PriorityFilter
            value={filters.priority}
            onChange={v => setFilters(f => ({ ...f, priority: v }))}
          />
          <SearchBox value={search} onChange={setSearch} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

        {!loading && !error && (
          <TicketList
            tickets={visibleTickets}
            onAddToQueue={addToQueue}
            isQueued={id => !!queue[id]}
          />
        )}
      </section>

      <aside className="lg:col-span-1">
        <MyQueueSummary
          tickets={queuedTickets}
          count={queuedTickets.length}
          onRemove={removeFromQueue}
          onClear={clearQueue}
        />
      </aside>
    </div>
  );
}
