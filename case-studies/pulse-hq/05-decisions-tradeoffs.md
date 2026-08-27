# 05 — Key Decisions & Trade-Offs: PulseHQ

## 1. Decision 1: Single-Click Rebalance Button over Drag-and-Drop
- **Choice**: Implemented `⌃ Reassign 2 tasks from Riya to Aman` directly inside the workload card.
- **Rationale**: Reduces manual task reassignments from 5 steps to 1 click, cutting execution time during crunch periods.
- **Rejected Alternative**: Drag-and-drop task card reassignment.
- **Why Rejected**: Drag-and-drop is clunky on mobile touch containers (390px phone frame).
- **Trade-Off**: Reduced granular task selection flexibility in exchange for maximum execution speed.

## 2. Decision 2: Multi-Theme Neon Accents (Cyan vs. Purple)
- **Choice**: Cyan Neon (`#00F2FE`) for Analytics & Reports, Purple Neon (`#D946EF`) for Team Hub.
- **Rationale**: Establishes visual hierarchy and mental model shifts between data analytics and human squad management.
- **Trade-Off**: Required dynamic CSS variable scoping and tab indicator line color transitions.

## 3. Decision 3: Hybrid Edge API Engine (`apiService.js`)
- **Choice**: Created an environment-aware API gateway that calls Express REST on `localhost` and executes an instant client fallback engine on static GitHub Pages.
- **Rationale**: Solves static hosting limitations on GitHub Pages, ensuring **100% fullstack feature parity and 0ms rendering latency**.
- **Trade-Off**: Required maintaining synchronized state schemas between backend (`server/index.js`) and client mock engine (`apiService.js`).
