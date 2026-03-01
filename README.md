# Next.js + Supabase Starter App

A full-stack starter template built with Next.js and Supabase, designed to jump-start building production-ready applications.

This app provides:

- Authentication via Supabase standard auth API  
- Protected routes for login-required pages  
- Profiles database table with avatar support  
- Organized component and library structure  
- Fully automated local setup with Docker  

---

## Overview

This starter app is intended as a scaffold for quickly building Next.js + Supabase applications. It includes:

- Login and authentication flow  
- Protected pages under a `/protected` directory  
- Centralized component organization (`_components` for shared/global, page-specific components in their folders)  
- Server-side functions and API logic in `lib` or page folders  
- Avatar support via Supabase storage  

---

## Tech Stack

**Frontend**

- Next.js (App Router)  
- React Server Components  
- TypeScript  
- Server Actions (`'use server'`)  

**Backend**

- Supabase  
  - Postgres database with `profiles` table  
  - Supabase authentication (sign-up/sign-in)  
  - Row Level Security (RLS)  
  - Storage buckets (avatars)  

**Local Development**

- Node.js (v18+ recommended)  
- Docker Desktop  
- Supabase CLI  

---

## File Structure

app/  
├── _components/         (Shared/global components)  
├── protected/           (Login-required pages)  
│   ├── dashboard/  
│   │   ├── page.tsx  
│   │   └── components/  (Components specific to this page/folder)  
├── page.tsx             (Public pages)  
lib/                     (Global/shared functions, server actions 'use server')  
startup.sh               (Script to start Supabase and setup .env)  

**Components & Functions**

- Components live either **within their page folder** or in `_components` if shared globally.  
- Non-component logic/functions:  
  - **Page-specific** → inside the folder of the page  
  - **Global/shared** → inside `lib/` (includes `'use server'` functions)  

---

## Database Schema

The main table is `profiles`:

- `id` (UUID) — Primary key, matches Supabase auth user ID  
- `email` (text) — User email, unique  
- `first` (text) — First name  
- `last` (text) — Last name  
- `avatar_path` (text) — Path to user's avatar in the `avatars` bucket  

**Notes:**

- `avatar_path` points to a file inside the `avatars` storage bucket.  
- RLS policies can restrict users to only read/write their own avatars.

---

## Environment Variables

The app relies on standard Supabase environment variables. The `startup.sh` script automatically generates them:

NEXT_PUBLIC_SUPABASE_URL=<your local Supabase URL>  
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon/publishable key>  
SUPABASE_SERVICE_ROLE_KEY=<service role key, optional for server-side tasks>  

---

## Startup Script

`startup.sh` automates local setup:

1. Starts Supabase Docker services  
2. Fetches the project URL and publishable key  
3. Generates a `.env` file with required environment variables  
4. Prepares the database (migrations, buckets, etc.)  

To run:

    chmod +x startup.sh
    ./startup.sh

After this, your app is ready locally.

---

## Usage

1. Clone the repository:  

    git clone <repo-url>
    cd <repo-folder>

2. Ensure prerequisites are installed:  
    - Node.js (v18+)  
    - Docker Desktop  

3. Run the startup script:  

    ./startup.sh

4. Start the Next.js dev server:  

    npm run dev

5. Open the app at http://localhost:3000  

---

## Notes

- All protected routes live under `/protected` and require authentication.  
- Shared components go in `app/_components`; page-specific components live in the page folder.  
- Global/shared functions and `'use server'` actions live in `lib`.  

## deployment

this has been deployed to vercel at the location [https://next-supabase-template-phi.vercel.app/](https://next-supabase-template-phi.vercel.app/)
- uses github runners to automatically run migrations upon each push. 
- uses built in vercel CI/CD for updates.
- used cloud database for deployment, local database for development (setup with the setup script)
