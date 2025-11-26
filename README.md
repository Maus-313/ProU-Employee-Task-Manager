# Employee Task Manager

A modern web application for managing employees and tasks, built with Next.js 14, TypeScript, Drizzle ORM, and NeonDB.

## Features

- **Dashboard**: Overview of total employees, tasks, and completed tasks
- **Employee Management**: Add, edit, delete, and list employees
- **Task Management**: Create tasks, assign to employees, track status and due dates
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and Shadcn/UI components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: NeonDB (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A NeonDB account and database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd prou-employee-task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your NeonDB connection string:
     ```
     DATABASE_URL=your_neon_database_url_here
     ```

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Seed the database with mock data:
   ```bash
   npm run seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

- **Employees**: id, name, email, position, department, created_at
- **Tasks**: id, title, description, status, due_date, employee_id, created_at

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema to database
- `npm run seed` - Seed database with mock data

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   ├── employees/
│   ├── tasks/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── db.ts
│   ├── schema.ts
│   ├── queries.ts
│   └── seed.ts
```

## Deployment

This app can be deployed to Vercel, Netlify, or any platform supporting Next.js.

Make sure to set the `DATABASE_URL` environment variable in your deployment platform.