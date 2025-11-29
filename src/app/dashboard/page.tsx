import { AppLayout } from '@/components/layout/app-layout'
import { getDashboardStats, getAllTasksWithEmployees, getProjectTaskCounts } from '@/lib/queries'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const [stats, tasks, projectCounts] = await Promise.all([
    getDashboardStats(),
    getAllTasksWithEmployees(),
    getProjectTaskCounts(),
  ])

  return (
    <AppLayout>
      <DashboardClient
        initialStats={stats}
        initialTasks={tasks}
        initialProjectCounts={projectCounts}
      />
    </AppLayout>
  )
}