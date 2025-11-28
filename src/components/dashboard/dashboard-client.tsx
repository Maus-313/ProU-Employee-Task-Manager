'use client'

import { useState } from 'react'
import { TasksTable } from '@/components/dashboard/tasks-table'
import { GraphicalView } from '@/components/dashboard/graphical-view'

type ViewType = 'list' | 'graphical'

type DashboardStats = {
  employeeCount: number
  taskCount: number
  completedTaskCount: number
}

interface DashboardClientProps {
  initialStats: DashboardStats
  initialTasks: any[]
  initialProjectCounts: any[]
}

export function DashboardClient({ initialStats, initialTasks, initialProjectCounts }: DashboardClientProps) {
  const [view, setView] = useState<ViewType>('list')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-3xl font-bold">{initialStats.employeeCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold">{initialStats.taskCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-3xl font-bold">{initialStats.completedTaskCount}</p>
        </div>
      </div>
      <div className="mt-8 mb-4 flex items-center gap-4">
        <h2 className="text-xl font-bold">All Tasks</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('graphical')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'graphical' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Graphical View
          </button>
        </div>
      </div>
      {view === 'list' && <TasksTable initialTasks={initialTasks} />}
      {view === 'graphical' && (
        <GraphicalView projectCounts={initialProjectCounts} onClose={() => setView('list')} />
      )}
    </div>
  )
}