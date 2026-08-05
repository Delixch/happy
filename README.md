# Happy Beck — Website

Restaurant/Bäckerei-Website mit öffentlichem Auftritt und Admin-Panel für Content-Pflege.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- Supabase (DB, Auth, Row Level Security)
- Cloudinary (Bild-/Video-Hosting)
- Vercel (Hosting + Serverless-Funktion für Kontaktformular)

## Setup

```bash
npm install
cp .env.example .env
```

`.env` mit echten Werten füllen (Supabase-Projekt, Cloudinary-Account). `RESEND_API_KEY` nur für die Vercel-Funktion nötig (`api/contact.ts`), lokal über `vercel dev` oder direkt in den Vercel-Projekteinstellungen setzen.

## Scripts

```bash
npm run dev        # Dev-Server (Vite)
npm run build       # Production-Build
npm run preview     # Build lokal ansehen
npm run lint         # ESLint
npm run typecheck   # tsc --noEmit
```

## Struktur

- `src/pages/` — öffentliche Seiten (Home, Menu, Team, Jobs, ...)
- `src/pages/admin/` — Admin-Panel (CRUD für Menü, Team, Medien, Jobs, Deals, Instagram, Aktuelles)
- `src/hooks/` — geteilte Hooks (z.B. `useAdminAuth`)
- `src/lib/` — Supabase- und Cloudinary-Clients
- `api/` — Vercel Serverless Functions (Kontaktformular)
- `supabase/sql/` — SQL-Skripte für Row Level Security

## Admin-Zugang

Auth läuft über Supabase Auth (`supabase.auth.signInWithPassword`). Nutzer werden im Supabase-Dashboard angelegt, kein separates Passwort-System.

## Datenbank-Setup

RLS-Policies für alle Content-Tabellen liegen in [`supabase/sql/enable_admin_rls.sql`](supabase/sql/enable_admin_rls.sql) — einmalig im Supabase SQL-Editor ausführen. Öffentliches Lesen erlaubt, Schreiben nur für authentifizierte Nutzer.
