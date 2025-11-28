import { Suspense } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { getDashboardStats, getAllTasksWithEmployees } from '@/lib/queries'

function DashboardSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function DashboardContent() {
  const stats = await getDashboardStats()
  const tasks = await getAllTasksWithEmployees()

  return (
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
      <h2 className="text-xl font-bold mt-8 mb-4">All Tasks</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left font-semibold">Task</th>
              <th className="p-4 text-left font-semibold">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-4">{task.title}</td>
                <td className="p-4">{task.employeeName || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AppLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </AppLayout>
  )
}