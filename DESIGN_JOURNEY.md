# PulseHQ — Design Journey & System Architecture Case Study

**Role**: Lead Product Designer & Full-Stack Systems Architect  
**Domain Tags**: `#DesignSystem` `#ProductStrategy` `#FullStackArchitecture` `#MVPtoProduction` `#Deployment` `#WCAG`

---

## 1. Context & Problem Statement

### 1.1 User Pain Points & Market Gap
Engineering managers and squad leads face severe cognitive overload caused by fragmented telemetry across Jira, Slack, GitHub, and spreadsheets. Existing project management tools act as **reactive data sinks**—recording past velocity without flagging imminent delivery bottlenecks or workload imbalances until sprints fail.

Key friction points:
- **Opaque Risk Exposure**: Critical dependencies (e.g., pending API approvals or security reviews) remain hidden inside comment threads.
- **Workload Imbalance**: Overloaded engineers (e.g., 34h logged on a 30h baseline) suffer burnout while peer capacity remains underutilized.
- **Context-Switching Fatigue**: Managers lose up to 12 hours weekly manually synthesizing executive briefings and sprint status updates.

### 1.2 Target Audience
- **Primary**: Engineering Managers, Lead Systems Architects, Technical Product Managers.
- **Secondary**: VPs of Engineering, CTOs requiring high-level delivery risk heatmaps.

### 1.3 Core Value Proposition
**PulseHQ** synthesizes team load, delivery confidence, and cross-team dependencies into an actionable, dark glassmorphic single-pane dashboard featuring **one-click predictive workload rebalancing** and an **integrated AI assistant**.

### 1.4 Success Metrics (KPIs)
- **Sprint Tail-Risk Reduction**: Decrease high-risk delivery bottlenecks by **35%**.
- **Approval Lag Reduction**: Shorten cross-team review response times by **45%**.
- **Optimal Utilization Rate**: Maintain squad load balance within **85%** of capacity baseline.
- **Client-Side Latency**: Achieve **<1ms** local data rendering across static edge hosting environments.

---

## 2. Design System & Visual Identity

### 2.1 Design Aesthetic
PulseHQ utilizes a **Minimalist Dark Glassmorphic Aesthetic** with page-specific neon accent themes, tactile card elevations, and glowing indicator lines. The UI pairs deep slate background surfaces with high-contrast cyan and purple neon highlights, maintaining executive readability under low-light operating conditions.

### 2.2 Color Palette & CSS Tokens

```css
:root {
  /* Base Surfaces */
  --bg-primary: #0A0E17;        /* App main canvas background */
  --bg-secondary: #111726;      /* Header & modal backdrop surface */
  --bg-card: #141C2E;           /* Default glassmorphic card fill */
  --bg-card-hover: #18233A;     /* Interactive card hover fill */
  
  /* Borders & Shadows */
  --border-light: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(0, 242, 254, 0.25);
  
  /* Cyan Neon Tokens (Analytics Theme) */
  --cyan-primary: #00F2FE;
  --cyan-secondary: #4FACFE;
  --cyan-gradient: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
  --cyan-glow: 0 0 20px rgba(0, 242, 254, 0.5);
  
  /* Purple Neon Tokens (Team Theme) */
  --purple-primary: #D946EF;
  --purple-secondary: #A855F7;
  --purple-gradient: linear-gradient(135deg, #D946EF 0%, #A855F7 100%);
  --purple-glow: 0 0 20px rgba(217, 70, 239, 0.5);
  
  /* Status & Alerts */
  --danger-pink: #FF4B72;       /* Overload & critical blocker tag */
  --warning-amber: #FFB800;     /* Watch status & upcoming deadline */
  --success-teal: #00E676;      /* On-track status & positive metric trend */
  --info-blue: #38BDF8;         /* Opportunity & info badge */
  
  /* Typography Tokens */
  --text-main: #F1F5F9;
  --text-muted: #94A3B8;
  --text-dim: #64748B;
}
```

### 2.3 Typography Hierarchy
The typography system uses **Plus Jakarta Sans**, offering geometric clarity for metrics and data-dense tables.

| Role | Font Size | Weight | Line Height | CSS Value |
| :--- | :--- | :--- | :--- | :--- |
| **Display Title** | 36px / 2.25rem | 900 (Black) | 1.1 | `font-size: 36px; font-weight: 900;` |
| **Hero Greeting** | 24px / 1.5rem | 800 (ExtraBold)| 1.2 | `font-size: 24px; font-weight: 800;` |
| **Section Header**| 18px / 1.125rem| 700 (Bold) | 1.3 | `font-size: 18px; font-weight: 700;` |
| **Body Primary** | 14px / 0.875rem| 500 (Medium) | 1.45 | `font-size: 14px; font-weight: 500;` |
| **Caption / Subtitle**| 12px / 0.75rem | 600 (SemiBold)| 1.4 | `font-size: 12px; font-weight: 600;` |
| **Copyright Footer**| 12px / 0.75rem | 500 (Medium) | 1.0 | `font-size: 0.75rem; color: #64748B;` |

---

## 3. Atomic Component Architecture

### 3.1 Component Library Structure

```
src/components/
├── SplashLoader.jsx      # Atom: Animated sine-wave logo & entry trigger
├── DashboardView.jsx     # Molecule: Metric grid, AI panel, Workload rebalancer
├── AnalyticsView.jsx     # Molecule: Cyan neon line chart, Heatmap matrix
├── MeetingView.jsx       # Molecule: Purple neon hero, Team directory & syncs
├── AIAssistantModal.jsx  # Organism: Global Ask AI drawer & prompt stream
└── ActionPlanModal.jsx   # Organism: Step-by-step manager action drawer
```

### 3.2 Key Micro-Interactions & Motion Tokens

1. **Rebalance Workload Action**:
   - **Interaction**: Clicking `"Reassign 2 tasks from Riya to Aman"` triggers an instant state mutation.
   - **Animation**: Riya's hours collapse from `34h` to `28h` (`#FF4B72` -> `#00E676`), Aman's hours update to `28h`, and Health Score shifts up to `9.1`.
   - **Motion Specs**: `transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`.

2. **Bottom Navigation Indicator Line**:
   - **Interaction**: Switching tabs slides the glowing bottom indicator bar under the active tab item.
   - **Dynamic Styling**:
     - `Analytics Tab`: Cyan gradient (`linear-gradient(90deg, #00F2FE, #4FACFE)`).
     - `Home Tab`: Periwinkle gradient (`linear-gradient(90deg, #00F2FE, #A855F7)`).
     - `Team Tab`: Purple gradient (`linear-gradient(90deg, #D946EF, #A855F7)`).

3. **Chart Point Hover Tooltips**:
   - **Interaction**: Hovering over data points on the SVG productivity chart scales the circle (`r: 4 -> r: 6`) and displays an absolute-positioned glass tooltip displaying exact confidence percentages.

---

## 4. Phase 1: MVP Scope vs. Phase 2: Finished Production

| Architecture Dimension | Phase 1: MVP Scope | Phase 2: Finished Production |
| :--- | :--- | :--- |
| **Data Engine** | Node.js / Express REST Server (`/api/dashboard`) | Hybrid Dual Engine: Express REST Server + `apiService` 0ms fallback engine for static edge environments. |
| **Screen Coverage** | Dashboard Home View | Complete 4-screen suite (Splash Loader, Home Dashboard, Cyan Analytics, Purple Team Hub). |
| **Interactivity** | Basic metric display | One-click workload rebalancer, instant priority queue task add/check, period filter chips (`3D`, `7D`, `Quarter`). |
| **Accessibility (a11y)** | Dark mode default colors | Full WCAG AA compliance (`#00F2FE` on `#031520` at 12:1 contrast ratio, high-contrast focus rings, screen reader landmarks). |
| **Hosting & CI/CD** | Local development server | Automated GitHub Actions workflow (`deploy.yml`) deploying to GitHub Pages with `.nojekyll` and `404.html` SPA routing. |
| **Copyright & Branding** | Basic text footer | Standardized isolated copyright notice (`Copyright © 2026 Kaustobh Bhattacharya`) enforced on every view. |

---

## 5. Implementation & Deployment Strategy

```
+-----------------------------------------------------------------------+
|                            USER BROWSER                               |
|                                                                       |
|  [Phone Frame Mode] <-----------------------> [Responsive Desktop]    |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   |                         App.jsx                               |   |
|   +-------------------------------+-------------------------------+   |
|                                   |                                   |
|                    apiService.js (Unified Gateway)                    |
|                                   |                                   |
|         +-------------------------+-------------------------+         |
|         | (hostname == 'localhost')                         |         |
|         v                                                   v         |
|  Express REST Backend                             Client In-Memory    |
|  (http://localhost:3001)                          Mock State (0ms)    |
|  - GET /api/dashboard                             (GitHub Pages Edge) |
|  - POST /api/workload/rebalance                                       |
+-----------------------------------------------------------------------+
```

### 5.1 Frontend Tech Stack & Bundler Config
- **Framework**: React 19 + Vite 8
- **Animation**: Framer Motion 12
- **Iconography**: Lucide React
- **Vite Base Path**: Configured as `base: './'` for 100% relative asset path resolution across all subpaths and custom domain hosts.

### 5.2 CI/CD & Deployment Pipeline
- **Pipeline Workflow**: `.github/workflows/deploy.yml`
- **Runner**: `ubuntu-latest` with Node `20.x`
- **Build Steps**:
  1. `git checkout main`
  2. `npm ci`
  3. `npm run build` (Emits production bundle to `dist/`)
  4. `actions/upload-pages-artifact@v3` (Packages `dist/`)
  5. `actions/deploy-pages@v4` (Deploys live to GitHub Pages)
- **Live Host**: [https://Kaustobh.github.io/Pulse-HQ/](https://Kaustobh.github.io/Pulse-HQ/)

---

## 6. Case Study Conclusion

PulseHQ demonstrates how product design and full-stack architecture can merge to transform raw operational data into predictive managerial workflows. By pairing high-contrast glassmorphic design tokens with a zero-latency hybrid API fallback strategy, PulseHQ delivers an executive experience that remains functional across both live Node.js backends and edge-hosted static GitHub Pages environments.
