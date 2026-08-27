# 01 — Problem & Context: PulseHQ

## 1. User Pain Points
- **Context-Switching Fatigue**: Engineering managers lose up to 12 hours weekly checking Jira tickets, GitHub PRs, and Slack threads to assess sprint progress.
- **Opaque Delivery Bottlenecks**: Critical dependencies (e.g., pending API approvals or OAuth scope reviews) remain hidden until delivery dates fail.
- **Capacity Imbalance & Burnout**: Lead engineers (e.g., Riya S. logged at 34h/30h) suffer burnout while peer capacity (Aman K. at 22h/30h) sits underutilized.

## 2. Current Market Gap
Traditional project tools (Jira, Asana) act as **passive data graveyards**. They log completed tasks but fail to provide **predictive rebalancing** or actionable manager guidance.

## 3. Target Audience
- **Primary**: Engineering Managers, Lead Product Designers, Technical Squad Directors.
- **Secondary**: VPs of Engineering needing multi-sprint risk heatmaps.

## 4. Technical & Design Constraints
- **Static Edge Deployment**: Hosted on GitHub Pages with no persistent Node.js cloud server process.
- **Responsive Layout Requirements**: Must support both a 390px native mobile phone frame container and a full-bleed responsive desktop grid.
- **Dark Mode Accessibility**: Dark slate glassmorphism must meet strict WCAG AA contrast standards (`#00F2FE` on `#031520` at 12:1 ratio).
- **Zero Latency Target**: All UI state updates and chart filter toggles must render in **0ms**.

## 5. What If Nothing Changed?
Squads would continue experiencing recurring sprint tail-risk delays, compounding developer burnout, and missed milestone commitments.
