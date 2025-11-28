'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

type Task = {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  employeeName?: string | null
}

interface TasksTableProps {
  initialTasks: Task[]
}

export function TasksTable({ initialTasks }: TasksTableProps) {
  const [sortOrder, setSortOrder] = useState("none")

  const sortTasks = (tasks: Task[], order: string) => {
    if (order === "none") return tasks
    const priorityOrder = { low: 1, medium: 2, high: 3 }
    return [...tasks].sort((a, b) => {
      if (order === "low-to-high") {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else if (order === "high-to-low") {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })
  }

  const sortedTasks = sortTasks(initialTasks, sortOrder)

  const handlePrioritySort = () => {
    if (sortOrder === "none") setSortOrder("low-to-high")
    else if (sortOrder === "low-to-high") setSortOrder("high-to-low")
    else setSortOrder("none")
  }

  const getSortIcon = () => {
    if (sortOrder === "low-to-high") return <ChevronUp className="inline h-4 w-4 ml-1" />
    if (sortOrder === "high-to-low") return <ChevronDown className="inline h-4 w-4 ml-1" />
    return null
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left font-semibold">Task</th>
            <th className="p-4 text-left font-semibold">
              <button onClick={handlePrioritySort} className="flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                Priority {getSortIcon()}
              </button>
            </th>
            <th className="p-4 text-left font-semibold">Assigned To</th>
          </tr>
        </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-4">{task.title}</td>
                <td className="p-4 capitalize">{task.priority}</td>
                <td className="p-4">{task.employeeName || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}