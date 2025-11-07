export const priorityOrder = { Low: 1, Medium: 2, High: 3, Critical: 4 };
export const statusOrder = { Open: 1, 'In Progress': 2, 'On Hold': 3, Resolved: 4 };


export const nextStatus = (current) => {
switch (current) {
case 'Open':
return 'In Progress';
case 'In Progress':
return Math.random() < 0.7 ? 'Resolved' : 'On Hold';
case 'On Hold':
return 'In Progress';
default:
return 'Resolved';
}
};


export const adjustPriority = (current) => {
const levels = ['Low', 'Medium', 'High', 'Critical'];
const i = levels.indexOf(current);
const r = Math.random();
// Mostly small adjustments; rarely jump to Critical
if (r < 0.15 && i < levels.length - 1) return levels[i + 1]; // escalate
if (r > 0.85 && i > 0) return levels[i - 1]; // de-escalate
if (r < 0.03) return 'Critical'; // rare spike
return current;
};