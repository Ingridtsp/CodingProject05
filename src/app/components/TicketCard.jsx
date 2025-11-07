'use client';


function Badge({ children }) {
return (
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border">
{children}
</span>
);
}


export default function TicketCard({ ticket, onAdd, isQueued }) {
const { id, title, description, priority, status, assignee, updatedAt } = ticket;
const date = new Date(updatedAt);


return (
<article className="rounded-2xl border p-4 shadow-sm bg-white">
<div className="flex items-start justify-between mb-2">
<h3 className="font-semibold text-lg leading-snug">
{title}
</h3>
<Badge>{id}</Badge>
</div>
<p className="text-sm text-gray-600 mb-3">{description}</p>


<div className="flex flex-wrap gap-2 mb-3">
<Badge>Priority: {priority}</Badge>
<Badge>Status: {status}</Badge>
<Badge>Assignee: {assignee}</Badge>
</div>


<p className="text-xs text-gray-500 mb-3">Updated {date.toLocaleString()}</p>


<div className="flex items-center gap-3">
<button
className="px-3 py-2 rounded-lg border disabled:opacity-50"
onClick={onAdd}
disabled={isQueued}
>
{isQueued ? 'In My Queue' : 'Add to My Queue'}
</button>
{isQueued && (
<span className="text-xs text-gray-500">Already queued</span>
)}
</div>
</article>
);
}