'use client';

const OPTIONS = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved'];

export default function StatusFilter({ value, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm text-slate-300">Status</span>
      <select
        className="rounded-md border border-slate-700 bg-neutral-900 p-2 text-slate-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}