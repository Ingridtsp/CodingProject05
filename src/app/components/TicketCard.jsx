'use client';

export default function TicketCard({ ticket, inQueue, onAdd }) {
  const { title, description, priority, status, assignee, updatedAt } = ticket;
  const updated = new Date(updatedAt).toLocaleString();

  return (
    <div className="rounded-xl border border-slate-700 bg-neutral-900 text-slate-100 p-4 shadow">
      <div className="text-xs text-slate-400 mb-1">Priority: <span className="font-semibold">{priority}</span></div>
      <div className="text-xs text-slate-400 mb-2">Status: <span className="font-semibold">{status}</span></div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-300 mt-1">{description}</p>
      <div className="mt-3 text-xs text-slate-400">
        Assignee: <span className="font-medium">{assignee}</span>
      </div>
      <div className="text-xs text-slate-500">Updated: {updated}</div>

      <button
        className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-40"
        onClick={onAdd}
        disabled={inQueue}
      >
        {inQueue ? 'Already in My Queue' : 'Add to My Queue'}
      </button>
      {inQueue && (
        <p className="mt-1 text-[11px] text-slate-400">
          This ticket is in your queue.
        </p>
      )}
    </div>
  );
}