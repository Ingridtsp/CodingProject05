export async function GET() {
  const tickets = [
    {
      id: 't-1001',
      title: 'Cannot connect to VPN',
      description: 'User reports intermittent VPN connectivity errors.',
      priority: 'High',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-10-31T14:05:00Z'
    },
    {
{
id: 't-1009',
title: 'Laptop fan noise',
description: 'Device overheating during Zoom calls.',
priority: 'Medium',
status: 'In Progress',
assignee: 'Hardware Team',
updatedAt: '2025-11-05T12:22:00Z'
},
{
id: 't-1010',
title: 'New hire onboarding',
description: 'Provision laptop and accounts for new analyst.',
priority: 'Medium',
status: 'Open',
assignee: 'IT Onboarding',
updatedAt: '2025-11-05T09:00:00Z'
},
{
id: 't-1011',
title: 'Two-factor authentication failure',
description: 'SMS codes not delivered to user; fallback needed.',
priority: 'High',
status: 'Open',
assignee: 'Security',
updatedAt: '2025-11-01T17:45:00Z'
},
{
id: 't-1012',
title: 'Zoom license upgrade',
description: 'Request to upgrade Pro license to Business.',
priority: 'Low',
status: 'Resolved',
assignee: 'Licensing',
updatedAt: '2025-10-28T11:10:00Z'
},
{
id: 't-1013',
title: 'MacOS update causing app crash',
description: 'After 14.1 update, design app crashes at launch.',
priority: 'High',
status: 'On Hold',
assignee: 'App Support',
updatedAt: '2025-11-02T07:55:00Z'
},
{
id: 't-1014',
title: 'Wi‑Fi dead zone in conference room C',
description: 'Signal drops to 1 bar during meetings.',
priority: 'Medium',
status: 'Open',
assignee: 'Network Ops',
updatedAt: '2025-11-05T15:30:00Z'
},
{
id: 't-1015',
title: 'Incident post‑mortem doc access',
description: 'SRE needs access to last month’s post‑mortem docs.',
priority: 'Low',
status: 'Resolved',
assignee: 'Security',
updatedAt: '2025-10-29T10:02:00Z'
},
{
id: 't-1016',
title: 'Account locked after PTO',
description: 'User returns from PTO and account is locked.',
priority: 'Medium',
status: 'Open',
assignee: 'Helpdesk L1',
updatedAt: '2025-11-06T13:33:00Z'
}
];


return Response.json(tickets);
}

