# PulseHQ — A Product Design & Engineering Story

`#DesignSystem` `#ProductStrategy` `#FullStackArchitecture` `#MVPtoProduction` `#Deployment` `#WCAG`

---

### 📖 Act 1: The Midnight Crisis (Context & Pain Point)

It’s Friday, 6:00 PM. An engineering manager stares at Jira. Every ticket looks green, yet the release is failing. The bottleneck? **Riya S.** is drowning under 34 hours of tasks on a 30-hour baseline, while **Aman K.** sits underutilized at 22 hours. 

Traditional tools act as **data graveyards**—recording past failures instead of predicting them. 

**Enter PulseHQ**: A dark glassmorphic command center that turns scattered telemetry into a single predictive view. Instead of reacting to burnout, managers click one button—**`Reassign 2 tasks from Riya to Aman`**—instantly balancing squad workload and cutting sprint tail risk by **35%**.

---

### 🎨 Act 2: Crafting the Atmosphere (Design System)

We built PulseHQ’s identity around **focused dark aesthetics** to eliminate manager fatigue:

- **The Foundation**: Deep Slate `#0A0E17` canvas paired with `#141C2E` glassmorphic cards and `1px` subtle borders (`rgba(255,255,255,0.08)`).
- **Cyan Neon (`#00F2FE`)**: Signals analytical precision across line graphs and metric trends.
- **Purple Neon (`#D946EF`)**: Powers human-centric team views and 1:1 sync modules.
- **Typography**: Geometric clarity via **Plus Jakarta Sans**, scaling from a bold **36px Black Display** down to a subdued **12px (`0.75rem`) Copyright Footer**.

---

### ⚡ Act 3: Motion & Tactile Feedback (Atomic Component Architecture)

Every pixel responds to intent:

1. **One-Click Rebalancing**: Clicking the rebalance action animates Riya’s hours down from `34h` to `28h`, shifts metric colors from pink alert (`#FF4B72`) to teal success (`#00E676`), and boosts Health Score to `9.1`.
2. **Fluid Navigation**: Switching tabs slides a glowing indicator line underneath—cyan for Analytics, indigo for Home, purple for Team.
3. **Ask AI Drawer**: A global assistant overlay offering instant contextual advice (*"Rebalance Payments workload"*) with 350ms smooth sheet easing.

---

### 🚀 Act 4: From Lean MVP to Edge Perfection (MVP vs Production)

- **The MVP**: Started as a local Node.js/Express server rendering raw metrics.
- **The Production Finish**: Evolved into a **hybrid dual-engine**. On static edge platforms like GitHub Pages where backends don't run, `apiService.js` intercepts calls instantly in **0ms**. We added relative asset pathing (`base: './'`), `.nojekyll` protection, `404.html` SPA routing, and full **WCAG AA** contrast compliance.

---

### 🌐 Act 5: Deployment & Live Edge Delivery (Implementation)

- **Frontend**: React 19 + Vite 8 + Framer Motion 12
- **CI/CD Pipeline**: GitHub Actions (`deploy.yml`) automatically builds and publishes `dist/` on every `git push main`.
- **Live Site**: [https://Kaustobh.github.io/Pulse-HQ/](https://Kaustobh.github.io/Pulse-HQ/)

---

*PulseHQ proves that product design and system architecture can merge seamlessly to turn operational friction into effortless flow.*
