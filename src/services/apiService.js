// Client-side Fallback & Mock API Engine for GitHub Pages Static Hosting

let dashboardState = {
  managerBrief: {
    time: "AI-generated 2m ago",
    greeting: "Good afternoon, Daniel",
    risksCount: 3,
    actionPlanSteps: [
      "Review cross-team dependency on API sign-off",
      "Accelerate Payments redesign review checkpoints",
      "Reassign overload tasks from Riya to Aman"
    ]
  },
  metrics: {
    teamUtilization: { label: "Team Utilization", value: "78%", change: "4.2% vs yesterday", status: "up", sparkline: [60, 65, 62, 70, 75, 78] },
    tasksToday: { label: "Tasks Today", value: "12", sub: "18 baseline", status: "normal", sparkline: [8, 10, 14, 11, 15, 12] },
    atRisk: { label: "At-Risk", value: "3", change: "↓ 1 after rebalance", status: "down", sparkline: [5, 4, 4, 3, 3, 3] },
    healthScore: { label: "Health Score", value: "8.6", change: "+0.4 this sprint", status: "up", sparkline: [7.8, 8.0, 8.2, 8.4, 8.5, 8.6] }
  },
  aiInsight: {
    title: "What needs action next",
    description: "PulseHQ synthesized team load, delivery confidence, and blockers into a prioritized manager view.",
    riskCluster: "Payments review, API sign-off",
    recoveryPath: "Move review checkpoints earlier",
    expandedDetails: [
      { id: 1, title: "Payments API Bottleneck", detail: "Riya S. is blocked waiting for security review of OAuth scopes." },
      { id: 2, title: "Aman Capacity Available", detail: "Aman K. has 8h buffer in sprint 14 to absorb task offloads." },
      { id: 3, title: "Risk Mitigation", detail: "Moving checkpoints earlier reduces sprint tail risk by 35%." }
    ]
  },
  teamWorkload: [
    { id: "riya", name: "Riya S.", task: "Payments redesign", loggedHours: 34, maxHours: 30, status: "Overloaded", statusType: "danger" },
    { id: "aman", name: "Aman K.", task: "API integration", loggedHours: 22, maxHours: 30, status: "On track", statusType: "success" },
    { id: "priya", name: "Priya T.", task: "Sprint review prep", loggedHours: 28, maxHours: 30, status: "Watch", statusType: "warning" }
  ],
  priorityQueue: [
    { id: "p1", type: "Critical blocker", title: "API approval pending", tag: "critical", completed: false },
    { id: "p2", type: "Upcoming deadline", title: "Sprint 14 review pack", tag: "warning", completed: false },
    { id: "p3", type: "Opportunity", title: "Aman can absorb design review", tag: "opportunity", completed: false }
  ],
  rebalanced: false
};

const analyticsDatasets = {
  "3D": {
    period: "3D",
    confidenceRose: "12% this month",
    confidenceDesc: "Most delays came from cross-team review dependency. Largest gain comes from reducing approval lag.",
    trend: {
      labels: ["Day 1", "Day 2", "Day 3"],
      deliveryConfidence: [68, 76, 88],
      velocityScore: [48, 54, 62]
    },
    matrix: [
      { name: "Riya", percentage: 75, activeBars: 3, totalBars: 4, color: "#FF4B72" },
      { name: "Aman", percentage: 50, activeBars: 2, totalBars: 4, color: "#00F2FE" },
      { name: "Priya", percentage: 75, activeBars: 3, totalBars: 4, color: "#FFB800" }
    ],
    workloadBalance: { balanced: 45, overloaded: 30, underutilized: 25 },
    riskHeatmap: {
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
      rows: [
        { name: "Alice", values: [30, 50, 85, 60, 40, 20] },
        { name: "Portal", values: [20, 35, 65, 90, 65, 30] }
      ]
    }
  },
  "7D": {
    period: "7D",
    confidenceRose: "18% this sprint",
    confidenceDesc: "Sprint cadence stabilized after task rebalancing across core feature streams.",
    trend: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      deliveryConfidence: [62, 60, 71, 78, 80, 85, 92],
      velocityScore: [40, 48, 42, 58, 52, 60, 68]
    },
    matrix: [
      { name: "Riya", percentage: 80, activeBars: 3, totalBars: 4, color: "#FF4B72" },
      { name: "Aman", percentage: 65, activeBars: 3, totalBars: 4, color: "#00F2FE" },
      { name: "Priya", percentage: 70, activeBars: 3, totalBars: 4, color: "#FFB800" }
    ],
    workloadBalance: { balanced: 55, overloaded: 25, underutilized: 20 },
    riskHeatmap: {
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
      rows: [
        { name: "Alice", values: [40, 60, 90, 75, 45, 25] },
        { name: "Portal", values: [25, 45, 70, 85, 75, 35] }
      ]
    }
  },
  "Quarter": {
    period: "Quarter",
    confidenceRose: "24% overall",
    confidenceDesc: "Q3 delivery confidence peaked following cross-functional workflow streamlining.",
    trend: {
      labels: ["Q1 W1", "Q1 W4", "Q1 W8", "Q1 W12"],
      deliveryConfidence: [55, 68, 82, 94],
      velocityScore: [42, 59, 74, 88]
    },
    matrix: [
      { name: "Riya", percentage: 90, activeBars: 4, totalBars: 4, color: "#FF4B72" },
      { name: "Aman", percentage: 80, activeBars: 3, totalBars: 4, color: "#00F2FE" },
      { name: "Priya", percentage: 85, activeBars: 3, totalBars: 4, color: "#FFB800" }
    ],
    workloadBalance: { balanced: 65, overloaded: 20, underutilized: 15 },
    riskHeatmap: {
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
      rows: [
        { name: "Alice", values: [50, 70, 95, 80, 50, 30] },
        { name: "Portal", values: [30, 50, 80, 95, 80, 45] }
      ]
    }
  }
};

// Unified API Service Handler
export const apiService = {
  async getDashboard() {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback for GitHub Pages static environment
    }
    return dashboardState;
  },

  async rebalanceWorkload() {
    try {
      const res = await fetch('/api/workload/rebalance', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        dashboardState = data.dashboard;
        return dashboardState;
      }
    } catch (e) {
      // Fallback
    }

    if (!dashboardState.rebalanced) {
      dashboardState.rebalanced = true;
      dashboardState.teamWorkload = [
        { id: "riya", name: "Riya S.", task: "Payments redesign", loggedHours: 28, maxHours: 30, status: "On track", statusType: "success" },
        { id: "aman", name: "Aman K.", task: "API integration + Payments review", loggedHours: 28, maxHours: 30, status: "On track", statusType: "success" },
        { id: "priya", name: "Priya T.", task: "Sprint review prep", loggedHours: 28, maxHours: 30, status: "Watch", statusType: "warning" }
      ];
      dashboardState.metrics.atRisk = { label: "At-Risk", value: "2", change: "↓ 1 after rebalance", status: "down", sparkline: [5, 4, 3, 2, 2, 2] };
      dashboardState.metrics.teamUtilization = { label: "Team Utilization", value: "85%", change: "7.0% optimal balance", status: "up", sparkline: [60, 65, 70, 78, 82, 85] };
      dashboardState.metrics.healthScore = { label: "Health Score", value: "9.1", change: "+0.9 post-rebalance", status: "up", sparkline: [7.8, 8.0, 8.4, 8.6, 8.9, 9.1] };
    } else {
      dashboardState.rebalanced = false;
      dashboardState.teamWorkload = [
        { id: "riya", name: "Riya S.", task: "Payments redesign", loggedHours: 34, maxHours: 30, status: "Overloaded", statusType: "danger" },
        { id: "aman", name: "Aman K.", task: "API integration", loggedHours: 22, maxHours: 30, status: "On track", statusType: "success" },
        { id: "priya", name: "Priya T.", task: "Sprint review prep", loggedHours: 28, maxHours: 30, status: "Watch", statusType: "warning" }
      ];
      dashboardState.metrics.atRisk = { label: "At-Risk", value: "3", change: "Original distribution", status: "normal", sparkline: [5, 4, 4, 3, 3, 3] };
      dashboardState.metrics.teamUtilization = { label: "Team Utilization", value: "78%", change: "4.2% vs yesterday", status: "up", sparkline: [60, 65, 62, 70, 75, 78] };
      dashboardState.metrics.healthScore = { label: "Health Score", value: "8.6", change: "+0.4 this sprint", status: "up", sparkline: [7.8, 8.0, 8.2, 8.4, 8.5, 8.6] };
    }
    return dashboardState;
  },

  async toggleTask(id) {
    try {
      const res = await fetch('/api/tasks/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        const data = await res.json();
        return data.priorityQueue;
      }
    } catch (e) {
      // Fallback
    }

    const task = dashboardState.priorityQueue.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    return dashboardState.priorityQueue;
  },

  async addTask(title) {
    try {
      const res = await fetch('/api/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type: 'New objective', tag: 'warning' })
      });
      if (res.ok) {
        const data = await res.json();
        return data.priorityQueue;
      }
    } catch (e) {
      // Fallback
    }

    const newTask = {
      id: `p${Date.now()}`,
      type: "New objective",
      title: title || "New team objective",
      tag: "warning",
      completed: false
    };
    dashboardState.priorityQueue.unshift(newTask);
    return dashboardState.priorityQueue;
  },

  async getAnalytics(period = "3D") {
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return analyticsDatasets[period] || analyticsDatasets["3D"];
  },

  async askAI(query) {
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }

    const q = (query || "").toLowerCase();
    let responseText = "PulseHQ AI analyzed your team data. High delivery confidence across active sprints with 1 workload alert currently flagged.";
    let suggestions = ["Rebalance Payments team workload", "View cross-team dependencies", "Schedule sprint retrospective"];

    if (q.includes("rebalance") || q.includes("workload") || q.includes("riya")) {
      responseText = "Riya S. is currently overloaded at 34h/30h. Reassigning 2 subtasks to Aman K. (22h/30h) will bring team utilization to an optimal 85% and eliminate delivery risk.";
      suggestions = ["Execute rebalance now", "View Aman's schedule", "Notify team leads"];
    } else if (q.includes("risk") || q.includes("blocker")) {
      responseText = "3 items currently require attention: Critical API approval pending, Sprint 14 review pack deadline tomorrow, and cross-team review lag in Alice project.";
      suggestions = ["Resolve API blocker", "Send deadline reminder", "Open risk heatmap"];
    } else if (q.includes("summary") || q.includes("report")) {
      responseText = "Weekly Executive Summary: Team velocity increased +12% this month. Overall Health Score stands strong at 8.6/10 with 12 of 18 baseline tasks completed today.";
      suggestions = ["Export PDF report", "Share with stakeholders", "View trend chart"];
    }

    return { response: responseText, suggestions };
  }
};
