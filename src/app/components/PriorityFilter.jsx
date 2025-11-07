'use client';


export default function PriorityFilter({ value, onChange }) {
return (
<label className="flex items-center gap-2">
<span className="text-sm font-medium w-24">Priority</span>
<select
className="select select-bordered px-3 py-2 rounded-lg border w-48"
value={value}
onChange={(e) => onChange(e.target.value)}
>
{['All', 'Low', 'Medium', 'High', 'Critical'].map((p) => (
<option key={p} value={p}>{p}</option>
))}
</select>
</label>
);
}