'use client';

export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search title or description"
      className="min-w-0 flex-1 rounded-md border border-slate-700 bg-neutral-900 p-2 text-slate-100 placeholder-slate-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}