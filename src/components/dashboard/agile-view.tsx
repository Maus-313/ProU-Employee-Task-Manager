'use client'

import { useState } from 'react'
import { X, Calendar, User, Flag, TrendingUp } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string | null
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  dueDate: string | null
  projectName: string | null
  employee: {
    name: string
    email: string
  } | null
}

interface ProjectCount {
  projectName: string | null
  taskCount: number
}

interface AgileViewProps {
  tasks: Task[]
  projectCounts: ProjectCount[]
  onClose: () => void
}

const priorityColors = {
  low: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-red-600 bg-red-100',
}

const statusColors = {
  pending: 'bg-blue-100 border-blue-300',
  in_progress: 'bg-yellow-100 border-yellow-300',
  completed: 'bg-green-100 border-green-300',
}

export function AgileView({ tasks: initialTasks, projectCounts, onClose }: AgileViewProps) {
  const [tasks] = useState<Task[]>(initialTasks)

  // Group tasks by due date
  const groupedTasks = tasks.reduce((acc, task) => {
    const dateKey = task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : 'No Due Date'

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  // Sort date keys
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    if (a === 'No Due Date') return 1
    if (b === 'No Due Date') return -1
    return new Date(a).getTime() - new Date(b).getTime()
  })

  const getCompletionRate = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.status === 'completed').length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Agile Timeline</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{getCompletionRate()}% Complete</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4 text-sm text-gray-600">
          Tasks organized by due dates for agile planning and tracking
        </div>
        <div className="space-y-6 max-h-[600px] overflow-y-auto">
          {sortedDateKeys.map((dateKey) => (
            <div key={dateKey} className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {dateKey}
                <span className="text-sm text-gray-500">({groupedTasks[dateKey].length} tasks)</span>
              </h4>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {groupedTasks[dateKey].map((task) => (
                  <div
                    key={task.id}
                    className={`border rounded-lg p-3 ${statusColors[task.status]} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm line-clamp-1">{task.title}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                        {task.priority[0].toUpperCase()}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.employee?.name || 'Unassigned'}</span>
                      </div>
                      <span className="capitalize">{task.status.replace('_', ' ')}</span>
                    </div>
                    {task.projectName && (
                      <div className="mt-2 text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                        {task.projectName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks available for agile timeline view
          </div>
        )}
      </div>
    </div>
  )
}