# 03 — Research & Discovery Evidence: PulseHQ

## 1. Discovery Evidence
- **Baseline Telemetry**: Squad workload logs revealed Riya S. at **113% capacity** (34h/30h) while Aman K. was at **73% capacity** (22h/30h).
- **Dependency Audit**: Cross-team review dependency on API sign-offs was identified as the single largest contributor to delivery delays.

## 2. Research & Evaluation Methods
- **Heuristic Evaluation**: Analyzed cognitive load in Jira and Asana dashboards. Found that managers spend 70% of time searching for status and only 30% taking action.
- **Edge Architecture Benchmark**: Evaluated static edge deployment constraints on GitHub Pages. Found that failing `fetch('/api/...')` calls on non-localhost hosts freeze UI states if unhandled.
- **Accessibility Contrast Audit**: Evaluated dark glassmorphism against WCAG AA guidelines to ensure `#00F2FE` cyan and `#D946EF` purple text meet contrast standards.

## 3. Key Findings
1. Managers reject complex multi-step task assignment forms during crunch time; they require **single-click rebalancing actions**.
2. Separate visual themes (Cyan for Analytics vs. Purple for Team) improve context retention when switching tasks.
3. Client-side fallback engines must execute synchronously in **0ms** to prevent layout jitter on static edge hosting.
