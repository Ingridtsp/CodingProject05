'use client';


export default function SearchBox({ value, onChange }) {
return (
<input
type="text"
placeholder="Search title or description…"
className="w-full sm:flex-1 px-3 py-2 rounded-lg border"
value={value}
onChange={(e) => onChange(e.target.value)}
/>
);
}