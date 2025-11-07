'use client';


export default function MyQueueSummary({ tickets, count, onRemove, onClear }) {
return (
<div className="sticky top-6 rounded-2xl border p-4 bg-white shadow-sm">
<h2 className="font-semibold text-lg mb-2">My Queue ({count})</h2>
{tickets.length === 0 ? (
<p className="text-sm text-gray-600">No tickets selected.</p>
) : (
<ul className="space-y-2 mb-3">
{tickets.map((t) => (
<li key={t.id} className="flex items-start justify-between gap-3">
<div>
<p className="text-sm font-medium leading-snug">{t.title}</p>
<p className="text-xs text-gray-500">{t.id}</p>
</div>
<button
className="text-xs px-2 py-1 rounded border"
onClick={() => onRemove(t.id)}
>
Remove
</button>
</li>
))}
</ul>
)}
<button
className="w-full text-sm px-3 py-2 rounded-lg border disabled:opacity-50"
onClick={onClear}
disabled={tickets.length === 0}
>
Clear Queue
</button>
</div>
);
}