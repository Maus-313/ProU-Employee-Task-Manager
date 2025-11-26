import { AppLayout } from '@/components/layout/app-layout'
import { getDashboardStats } from '@/lib/queries'

export default async function Dashboard() {
  const stats = await getDashboardStats()

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Employees</h2>
            <p className="text-3xl font-bold">{stats.employeeCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-3xl font-bold">{stats.taskCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Completed Tasks</h2>
            <p className="text-3xl font-bold">{stats.completedTaskCount}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}