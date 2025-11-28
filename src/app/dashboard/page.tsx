import { AppLayout } from '@/components/layout/app-layout'
import { getDashboardStats, getAllTasksWithEmployees, getProjectTaskCounts } from '@/lib/queries'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

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