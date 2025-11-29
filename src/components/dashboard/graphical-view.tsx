'use client'

import { useState } from 'react'
import { X, Calendar, User, Flag, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

interface GraphicalViewProps {
  tasks: Task[]
  projectCounts: ProjectCount[]
  onClose: () => void
}

const statusColumns = [
  { key: 'pending', label: 'To Do', color: 'bg-gray-100 border-gray-300' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-blue-100 border-blue-300' },
  { key: 'completed', label: 'Done', color: 'bg-green-100 border-green-300' },
] as const

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
}

export function BoardView({ tasks: initialTasks, projectCounts, onClose }: GraphicalViewProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [selectedProject, setSelectedProject] = useState<string>('all')

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (!draggedTask) return

    // Update the task status locally
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTask.id
          ? { ...task, status: newStatus as 'pending' | 'in_progress' | 'completed' }
          : task
      )
    )
    setDraggedTask(null)
  }

  const getTasksByStatus = (status: string) => {
    const filteredTasks = selectedProject === 'all'
      ? tasks
      : tasks.filter(task => task.projectName === selectedProject)
    return filteredTasks.filter(task => task.status === status)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-semibold">Task Board</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by Project:</span>
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projectCounts.map((project) => (
                <SelectItem key={project.projectName || 'null'} value={project.projectName || ''}>
                  {project.projectName || 'No Project'} ({project.taskCount})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
          {statusColumns.map((column) => (
            <div
              key={column.key}
              className={`flex-shrink-0 ${column.color} rounded-lg p-4 min-w-[300px] max-w-[300px]`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              <h4 className="font-medium text-gray-900 mb-4 text-center">
                {column.label} ({getTasksByStatus(column.key).length})
              </h4>
              <div className="space-y-3">
                {getTasksByStatus(column.key).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <h5 className="font-medium text-gray-900 mb-2">{task.title}</h5>
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Flag className={`h-3 w-3 ${priorityColors[task.priority]}`} />
                        <span className="capitalize">{task.priority}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    {task.employee && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{task.employee.name}</span>
                      </div>
                    )}
                    {task.projectName && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {task.projectName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}