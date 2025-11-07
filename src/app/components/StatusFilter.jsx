'use client';


export default function StatusFilter({ value, onChange }) {
return (
<label className="flex items-center gap-2">
<span className="text-sm font-medium w-24">Status</span>
<select
className="select select-bordered px-3 py-2 rounded-lg border w-48"
value={value}
onChange={(e) => onChange(e.target.value)}
>
{['All', 'Open', 'In Progress', 'On Hold', 'Resolved'].map((s) => (
<option key={s} value={s}>{s}</option>
))}
</select>
</label>
);
}