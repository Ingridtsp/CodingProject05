'use client';
import TicketCard from './TicketCard';


export default function TicketList({ tickets, onAddToQueue, isQueued }) {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{tickets.map((t) => (
<TicketCard
key={t.id}
ticket={t}
onAdd={() => onAddToQueue(t.id)}
isQueued={isQueued(t.id)}
/>
))}
</div>
);
}