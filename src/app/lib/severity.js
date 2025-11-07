// Named exports for potential sorting/validation
export const priorityOrder = { Low: 1, Medium: 2, High: 3, Critical: 4 };
export const statusOrder   = { 'Open': 1, 'In Progress': 2, 'On Hold': 3, 'Resolved': 4 };

// Helpers for realistic transitions (optional use)
export function nextStatus(current) {
  const flow = ['Open', 'In Progress', 'On Hold', 'Resolved'];
  const i = flow.indexOf(current);
  if (i === -1) return 'Open';
  if (current === 'On Hold') return 'In Progress';
  if (current === 'Resolved') return 'Resolved';
  return flow[i + 1];
}

export function nudgePriority(current, dir = 1) {
  const levels = ['Low', 'Medium', 'High', 'Critical'];
  let i = levels.indexOf(current);
  if (i === -1) i = 1;
  i = Math.min(levels.length - 1, Math.max(0, i + dir));
  return levels[i];
}