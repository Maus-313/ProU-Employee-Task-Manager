'use client'

import { useState } from 'react'
import { X, Calendar, User, Flag, Clock } from 'lucide-react'

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

interface ScrumViewProps {
  tasks: Task[]
  projectCounts: ProjectCount[]
  onClose: () => void
}

const priorityOrder = { high: 3, medium: 2, low: 1 }

export function ScrumView({ tasks: initialTasks, projectCounts, onClose }: ScrumViewProps) {
  const [tasks] = useState<Task[]>(initialTasks)

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by priority (high first), then by due date
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff

    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    if (a.dueDate) return -1
    if (b.dueDate) return 1
    return 0
  })

  const priorityColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100',
  }

  const statusColors = {
    pending: 'border-l-blue-500',
    in_progress: 'border-l-yellow-500',
    completed: 'border-l-green-500',
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-semibold">Scrum Sprint Board</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4 text-sm text-gray-600">
          Tasks sorted by priority and due date for sprint planning
        </div>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {sortedTasks.map((task, index) => (
            <div
              key={task.id}
              className={`bg-white border-l-4 ${statusColors[task.status]} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{task.status.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {task.employee && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.employee.name}</span>
                      </div>
                    )}
                  </div>
                  {task.projectName && (
                    <div className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                      {task.projectName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {sortedTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks available for sprint planning
          </div>
        )}
      </div>
    </div>
  )
}