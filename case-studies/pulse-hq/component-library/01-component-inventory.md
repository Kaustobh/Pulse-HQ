# 01 — Component Inventory: PulseHQ

## 1. Action Buttons

### Primary Cyan Button (`.btn-cyan`)
- **Visuals**: Gradient `linear-gradient(135deg, #00F2FE 0%, #00C6FF 100%)`, text `#031520`, weight 700, radius 20px.
- **States**: Hover `translateY(-2px)` + glow `box-shadow: 0 6px 20px rgba(0, 242, 254, 0.5)`. Active `translateY(0)`.
- **Use Case**: Primary CTA ("Review risks", "Execute Action Plan").

### Rebalance Workload Button (`.btn-rebalance`)
- **Visuals**: Gradient fill `rgba(0, 242, 254, 0.12)` to `rgba(0, 230, 118, 0.12)`, border `1px solid rgba(0, 242, 254, 0.3)`, radius 14px.
- **States**: Hover background scale & glow `0 0 20px rgba(0, 242, 254, 0.3)`.
- **Use Case**: One-click squad task rebalancing trigger.

### Purple Neon Button (`.purple-btn`)
- **Visuals**: Gradient `linear-gradient(135deg, #D946EF 0%, #A855F7 100%)`, text `#FFF`, radius 16px.
- **Use Case**: Team member additions & squad actions.

## 2. Data Visualization & Metric Cards

### Sparkline Metric Card (`.metric-card`)
- **Visuals**: Glass card surface `#141C2E`, flex layout, integrated SVG sparkline polyline.
- **Micro-interaction**: Hover `translateY(-3px)` with subtle border highlight.

### Workload Balance Progress Bar
- **Visuals**: Multi-segment progress bar with cyan (`#00F2FE`), pink (`#FF4B72`), and periwinkle (`#4FACFE`) color blocks.

## 3. Navigation Controls

### Dynamic Bottom Navigation Bar (`.bottom-nav`)
- **Visuals**: Fixed bottom panel with backdrop blur `20px`, 3 tab triggers (`Analytics`, `Home`, `Team`).
- **Indicator**: Active indicator bar (`.nav-indicator-bar`) with dynamic theme color transitions matching active screen.
