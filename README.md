# Murnova Konect — Monorepo

This is the official monorepo for **Murnova Konect**, an AI-powered multi-tenant School Operating System built by **Murnova Technology Limited**.

Technologies:
- Next.js (web + site)
- NestJS + Prisma (API)
- Expo (mobile)
- Turborepo + pnpm (monorepo)
- PostgreSQL
- Multi-tenant infrastructure (school-level isolation)
- AI-powered intelligence layers

Folder Structure:
- apps/site → Marketing website
- apps/web → SaaS Web Application
- apps/mobile → Mobile App (Parents/Teachers/Students)
- apps/api → Backend API
- packages/* → shared UI, core logic, auth, configs
- prisma → DB schema & migrations
- docs → PRD + architecture
- infra → cloud & deployment

Run:
1. pnpm install
2. pnpm dev
