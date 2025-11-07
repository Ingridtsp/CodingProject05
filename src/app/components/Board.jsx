  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <section className="lg:col-span-3 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <StatusFilter
            value={filters.status}
            onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
          />
          <PriorityFilter
            value={filters.priority}
            onChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
          />
          <SearchBox value={search} onChange={setSearch} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

        {!loading && !error && (
          <TicketList
            tickets={visibleTickets}
            onAddToQueue={addToQueue}
            isQueued={(id) => !!queue[id]}
          />
        )}
      </section>

      <aside className="lg:col-span-1">
        <MyQueueSummary
          tickets={queuedTickets}
          count={queuedIds.length}
          onRemove={removeFromQueue}
          onClear={clearQueue}
        />
      </aside>
    </div>
  );
}
