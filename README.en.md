# TT-Admin

## Overview
TT-Admin is a DDD-based admin system with backend services and a Vue3 admin console, supporting plugin-based extensions and unified plugin frontend workflows.

## Structure
- tt-admin-backend: backend services
  - tt-admin-domain: domain model
  - tt-admin-application: use case orchestration
  - tt-admin-infrastructure: persistence and integrations
  - tt-admin-interfaces: REST APIs and DTOs
  - tt-admin-plugin-core: plugin utilities and constants
  - tt-admin-plugins: built-in plugins
- tt-admin-frontend: admin console (Vite + Vue3)
  - src: business pages
  - packages: shared packages
  - public: static assets
- tt-amdin/sql: plugin and init SQL

## Tech Stack
- Backend: Java 21, Spring Boot, JUnit5, MockMvc
- Frontend: Vite, Vue3, TypeScript, pnpm

## Requirements
- JDK 21
- Maven 3.9+
- Node.js 18+ with pnpm
- MySQL and Redis

## Quick Start
### Backend
- Build: `mvn clean verify`
- Run: `mvn -pl tt-admin-server spring-boot:run`
- Module test: `mvn -pl <module> -am test`
- Config: `tt-admin-backend/tt-admin-server/src/main/resources/application.yml`
- Local secrets: `tt-admin-backend/tt-admin-server/src/main/resources/application-local.yml`

### Frontend
- Install: `pnpm install`
- Dev: `pnpm dev` (uses `.env.dev`)
- Build: `pnpm build` or `pnpm build:dev`
- Preview: `pnpm preview`
- Before commit: `pnpm lint` and `pnpm typecheck`

## Plugin System
### Structure and Assets
- Plugin source: `tt-admin-backend/tt-admin-plugins/<plugin>`
- Plugin config: `plugin.yaml`, `frontend.yaml`, `setting.json`
- Plugin UI assets: `src/main/resources/ui` (build output, do not commit)
- Plugin SQL: `tt-amdin/sql`

### Key plugin.yaml fields
- `id/name/version/staticLocations`: metadata and static resources
- `isDev/frontDevAddress`: frontend dev mode switch

### Frontend loading
- Plugin modules are described in `frontend.yaml` and registered as routes and menus.
- Dev mode loads modules from `frontDevAddress`.
- Production loads modules from `/api/plugin-static/{pluginId}`.

### Packaging and shared libs
- Build host first to generate `shared-lib` so plugins avoid duplicating host dependencies.
- Build outputs must be ignored from VCS.

## Commit Convention (Conventional Commit)
Use `pnpm commit` (EN) or `pnpm commit:zh` (ZH), example:
- `feat(plugin): enable dynamic loading`

Common types:
| Type | Purpose | Example |
| --- | --- | --- |
| feat | New feature | `feat(plugin): add dictionary api` |
| fix | Bug fix | `fix(ai-chat): handle sse error` |
| docs | Documentation | `docs: update plugin dev guide` |
| style | Formatting | `style(frontend): format lint` |
| refactor | Refactor | `refactor(plugin): extract api module` |
| perf | Performance | `perf(route): reduce re-render` |
| test | Tests | `test(plugin): add service tests` |
| build | Build/deps | `build: bump pnpm lock` |
| chore | Maintenance | `chore: cleanup build outputs` |
| ci | CI related | `ci: update pipeline` |

## Contribution
- PR should include goals, affected paths, commands/results, and UI screenshots/recordings when applicable.
- Keep each commit scoped to one module and note related SQL if any.

## Docs
- Plugin dev guide: `tt-admin-frontend/docs/plugin-dev.md`
