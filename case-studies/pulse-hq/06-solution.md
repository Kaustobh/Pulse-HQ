# 06 — Solution & Execution: PulseHQ

## Screen Suite Overview

### 1. Splash Loader (`SplashLoader.jsx`)
- Glowing sine wave pulse icon with CSS glow `0 0 35px rgba(0, 242, 254, 0.3)`.
- Tagline: *"Manage, Analyze, Implement"*.
- Interactive launcher entry button with animated spring entrance.

### 2. Home Dashboard (`DashboardView.jsx`)
- **Manager Brief Banner**: Greeting, AI generation timestamp, and action triggers (`Review risks` & `Action plan`).
- **4 Metric Cards Grid**: Team Utilization (78%), Tasks Today (12/18 baseline), At-Risk (3), Health Score (8.6) with SVG sparkline animations.
- **AI Insight Panel**: Warning status rows and `Expand AI insight ↗` drawer trigger.
- **Team Workload Rebalancer**: Live squad cards with status badges (`Overloaded`, `On track`, `Watch`) and one-click rebalance execution button.
- **Priority Queue**: Risk tag indicators (`♦ Critical blocker`, `⚠ Upcoming deadline`, `↗ Opportunity`) with interactive checkbox completion and inline task creation.

### 3. Analytics & Reports (`AnalyticsView.jsx`)
- **Cyan Neon Theme** (`#00F2FE`).
- **Timeframe Selector**: Filter chips (`3D`, `7D`, `Quarter`, `Custom`).
- **Productivity Trend Chart**: Interactive dual-line SVG graph with hover tooltips.
- **Team Performance Matrix**: Grid fill indicators per member.
- **Workload Balance Bar**: Stacked distribution bar (Balanced 45%, Overloaded 30%, Underutilized 25%).
- **Delivery Risk Heatmap**: 6-week matrix grid across project streams (`Alice`, `Portal`).

### 4. Team & Meeting Hub (`MeetingView.jsx`)
- **Purple Neon Theme** (`#D946EF`).
- **Coming Soon Feature Modules**: `Wire-frames` (Amber border `#D97706`), `Assumptions` (Teal `#34D399`), `Icon` (Cyan `#22D3EE`).
- **Team Directory & 1:1 Sync Scheduler**: Squad roster with instant calendar invite trigger.

### 5. Ask AI Assistant Drawer (`AIAssistantModal.jsx`)
- Global chat overlay with prompt suggestion chips (*"Rebalance Payments workload"*, *"Summarize sprint risks"*).
