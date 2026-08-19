# Contributing to PulseHQ

Thank you for considering contributing to **PulseHQ**! Follow these guidelines to keep the codebase clean, consistent, and easy to maintain.

---

## 🌿 Git Branching Strategy

We follow a feature-branch workflow. All feature work and bug fixes should be created in dedicated branches:

- **Main Branch**: `main` (Production deployment branch, synced with GitHub Pages)
- **Feature Branches**: `feature/short-description` (e.g. `feature/add-export-pdf`)
- **Bug Fixes**: `fix/issue-description` (e.g. `fix/chart-tooltip-offset`)
- **Documentation**: `docs/update-readme`

---

## 💬 Commit Message Standards

We enforce [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>
```

### Supported Types:
- `feat:` A new feature or screen component.
- `fix:` A bug fix.
- `docs:` Documentation updates only (`README.md`, `DEPLOYMENT.md`).
- `style:` Changes that do not affect code logic (formatting, CSS tweaks).
- `refactor:` Code improvements without adding features or fixing bugs.
- `perf:` Performance optimizations.
- `chore:` Maintenance tasks, dependency updates, build configs.

### Examples:
- `feat(analytics): add cyan neon interactive line chart tooltip`
- `fix(rebalance): resolve workload hours calculation state reset`
- `docs(deployment): update GitHub Pages live URL references`

---

## 🧪 Pre-Commit Quality Checks

Before pushing code or opening a Pull Request, run local verification commands:

```bash
# 1. Check for syntax and build errors
npm run build

# 2. Test fullstack execution locally
npm run dev
```

---

## 📬 Pull Request (PR) Workflow

1. **Fork/Clone** the repository.
2. **Create your feature branch**: `git checkout -b feature/cool-new-feature`
3. **Commit your changes**: `git commit -m "feat(ui): add new task modal"`
4. **Push to GitHub**: `git push origin feature/cool-new-feature`
5. **Open a Pull Request** against the `main` branch with a clear summary of changes and visual screenshots if altering UI elements.
