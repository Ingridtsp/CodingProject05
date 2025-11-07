'use client';

'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) {
    return <p className="text-slate-300">Loading…</p>;
  }
  if (error) {
    return <p className="text-red-400">Unable to load tickets.</p>;
  }
  if (isEmpty) {
    return <p className="text-slate-400">No tickets match your filters.</p>;
  }
  return null;
}