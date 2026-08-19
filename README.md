# Briqona SaaS

A scratch-built multi-tenant SaaS platform.

## Architecture

- `apps/marketing` — public marketing website
- `apps/control-center` — platform administration
- `apps/workspace` — customer tenant workspace
- `packages/ui` — shared UI primitives
- `packages/auth` — authentication and authorization types
- `packages/database` — tenant/workspace data model
- `packages/config` — shared application configuration

## Core model

Platform → Tenant → Workspace → Users / Roles / Modules / Data

The repository uses pnpm workspaces and Turborepo so the three applications can evolve independently while sharing common packages.
