# Gravity Train

Interactive educational web experience about gravity trains - a theoretical transportation concept using Earth's gravity to travel through tunnels.

Part of Naatak's theatrical production "Hole" (2026).

## Tech Stack

- React 18 + TypeScript + Vite
- React Router 6 (SPA)
- TailwindCSS 3 + Radix UI
- Three.js / React Three Fiber (3D simulation)
- Express backend (optional, for API routes)
- pnpm package manager

## Project Structure

```
client/
├── pages/           # Route pages (Index, Simulation, Concepts, History, About)
├── components/ui/   # Radix-based UI components
├── App.tsx          # Router setup
└── global.css       # Tailwind theme

server/              # Express API (optional)
shared/              # Shared types
public/              # Static assets (includes CNAME for GitHub Pages)
```

## Commands

```bash
pnpm dev           # Dev server on port 8080
pnpm build:client  # Build SPA to dist/spa
pnpm test          # Run tests
pnpm typecheck     # TypeScript check
```

## Deployment

- Hosted on GitHub Pages at gravity-train.com
- Auto-deploys from main branch via `.github/workflows/deploy.yml`
- CNAME file in `public/` ensures custom domain persists

## Guidelines

- Keep physics simulations accurate
- Maintain the space/cosmic visual theme (dark backgrounds, indigo/purple gradients)
- All routes must work as SPA (client-side routing)
- Test 3D components on mobile - keep performance in mind

## Git

- No Co-Authored-By sign-off needed in commits
