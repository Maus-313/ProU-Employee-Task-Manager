# Employee Task Manager

Streamline employee and task management with a sleek Next.js app powered by TypeScript, Drizzle ORM, and NeonDB.

## Features

- **Dashboard**: Real-time stats on employees, tasks, and completions.
- **Employee Management**: CRUD operations for employee records.
- **Task Management**: Assign, track, and update tasks with due dates.
- **Responsive UI**: Built with Tailwind CSS and Shadcn/UI for seamless mobile experience.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- NeonDB (Serverless PostgreSQL)
- Drizzle ORM
- Tailwind CSS + Shadcn/UI
- Lucide React Icons

## Quick Start

### Prerequisites
- Node.js 18+
- NeonDB account

### Setup
1. Clone repo: `git clone <repo-url> && cd prou-employee-task-manager`
2. Install: `npm install`
3. Env: Copy `.env.example` to `.env.local`, add `DATABASE_URL=your_neon_url`
4. DB: `npm run db:push`
5. Seed: `npm run seed`
6. Run: `npm run dev`
7. Visit: [http://localhost:3000](http://localhost:3000)

## Database Schema

- **Employees**: id, name, email, position, department, created_at
- **Tasks**: id, title, description, status, due_date, employee_id, created_at

## Scripts

- `npm run dev` - Dev server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Lint code
- `npm run db:generate` - Generate migrations
- `npm run db:push` - Push schema
- `npm run seed` - Seed data

## Project Structure

```
src/
├── app/ (pages: dashboard, employees, tasks)
├── components/ (layout, ui)
├── lib/ (db, schema, queries, seed)
```

## Deployment

The app is deployed on Netlify at: [https://prou-employee-task-manager.netlify.app](https://prou-employee-task-manager.netlify.app)

### Netlify Deployment
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --create-site <site-name> --prod`
4. For continuous deployment, connect your GitHub repo in Netlify dashboard

### Environment Variables
Set the following in your deployment environment:
- `DATABASE_URL` - Your NeonDB connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your deployment URL

Deploy to Vercel, Netlify, or any Next.js-compatible platform.