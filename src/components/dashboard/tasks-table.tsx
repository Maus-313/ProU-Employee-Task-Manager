'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

type Task = {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  createdAt: Date | null
  dueDate: string | null
  projectName: string | null
  employeeName?: string | null
}

interface TasksTableProps {
  initialTasks: Task[]
}

export function TasksTable({ initialTasks }: TasksTableProps) {
  const [sortColumn, setSortColumn] = useState<"priority" | "deadline" | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  const sortTasks = (tasks: Task[], column: string | null, order: string | null) => {
    if (!column || !order) return tasks
    return [...tasks].sort((a, b) => {
      if (column === "priority") {
        const priorityOrder = { low: 1, medium: 2, high: 3 }
        const aVal = priorityOrder[a.priority]
        const bVal = priorityOrder[b.priority]
        return order === "asc" ? aVal - bVal : bVal - aVal
      } else if (column === "deadline") {
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
        return order === "asc" ? aDate - bDate : bDate - aDate
      }
      return 0
    })
  }

  const sortedTasks = sortTasks(initialTasks, sortColumn, sortOrder)

  const handleSort = (column: "priority" | "deadline") => {
    if (sortColumn !== column) {
      setSortColumn(column)
      setSortOrder("asc")
    } else {
      if (sortOrder === "asc") setSortOrder("desc")
      else if (sortOrder === "desc") {
        setSortColumn(null)
        setSortOrder(null)
      } else {
        setSortOrder("asc")
      }
    }
  }

  const getSortIcon = (column: "priority" | "deadline") => {
    if (sortColumn !== column) return null
    if (sortOrder === "asc") return <ChevronUp className="inline h-4 w-4 ml-1" />
    if (sortOrder === "desc") return <ChevronDown className="inline h-4 w-4 ml-1" />
    return null
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left font-semibold">Task</th>
            <th className="p-4 text-left font-semibold">Date</th>
            <th className="p-4 text-left font-semibold">
              <button onClick={() => handleSort("priority")} className="flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                Priority {getSortIcon("priority")}
              </button>
            </th>
            <th className="p-4 text-left font-semibold">Project</th>
            <th className="p-4 text-left font-semibold">
              <button onClick={() => handleSort("deadline")} className="flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                Deadline {getSortIcon("deadline")}
              </button>
            </th>
            <th className="p-4 text-left font-semibold">Assigned To</th>
          </tr>
        </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-4">{task.title}</td>
                <td className="p-4">{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="p-4 capitalize">{task.priority}</td>
                <td className="p-4">{task.projectName || 'N/A'}</td>
                <td className="p-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                <td className="p-4">{task.employeeName || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}