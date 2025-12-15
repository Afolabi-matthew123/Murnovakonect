# FM-1 ‚Äî FOUNDATION MODULE STATUS (ARCHITECTURAL FREEZE)

## Status
‚úÖ **COMPLETED**
Ì¥í **ARCHITECTURALLY FROZEN**

FM-1 is now treated as immutable infrastructure.

---

## Purpose of FM-1
FM-1 provides the **non-negotiable core infrastructure** for the Murnova Konect ecosystem.

It is not a feature layer.
It is not a UI layer.
It is not a business experiment layer.

It is **bedrock**.

---

## Architecture Summary

- **Monorepo**
- **NestJS (API)**
- **Prisma + PostgreSQL**
- **Redis (explicit dependency discipline)**
- **Row-Level Security (Postgres-native)**
- **JWT-based authentication**
- **Multi-tenant (school-based isolation)**

---

## Tenant Isolation (CRITICAL)

Tenant isolation is enforced at **two levels**:

1. **Application level**
   - `TenancyMiddleware`
   - `AsyncLocalStorage`
   - `SET app.current_school`

2. **Database level (PostgreSQL RLS)**
   - Enabled on:
     - School
     - User
     - Student
     - Staff
   - Policies reference:
     - `current_setting('app.current_school', true)`

> Even if NestJS is bypassed, data remains protected.

---

## Authentication Guarantees

The following are **frozen guarantees**:

- JWT shape is fixed
- Refresh tokens:
  - Rotated
  - Hashed
  - Revocable
- Auth guards enforce:
  - Role
  - Tenant
  - Permission

No auth rewrites are allowed in FM-2 or beyond.

---

## Identity & Relationship Model (FM-1 Extended)

FM-1 supports:

- A user belonging to multiple schools
- A user holding multiple roles per school
- Parents with multiple children across schools
- Users acting as:
  - Parent in one school
  - Staff in another
  - Or both in the same school

This is implemented via:

- `SchoolUser`
- `StudentParent`

These models are **frozen**.

---

## Folder Structure Freeze

The following must never be changed:

- `apps/api/src/common`
- `apps/api/src/database`
- `apps/api/src/modules/auth`
- `apps/api/src/modules/users`
- `apps/api/src/modules/schools`
- `apps/api/src/modules/students`
- `apps/api/src/modules/super-admin`
- `prisma/schema.prisma` (base models only)

---

## What FM-2 Is Allowed To Do

FM-2 **may**:

- Add UI
- Add new feature modules
- Extend services
- Read FM-1 data

FM-2 **must NOT**:

- Change Prisma base models
- Modify tenant resolution
- Touch auth token shape
- Bypass RLS
- Rewire AppModule core imports

---

## Enforcement Rule

If a change requires modifying FM-1:
‚ùå The change is invalid  
‚úÖ A new module must be created instead

---

## Signed-Off

FM-1 is officially sealed.

Date: 2025-12-15  
Status: LOCKED  
