'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { createTask, updateTask, deleteTask } from './actions'
import { tasks, employees } from '@/lib/schema'

type Task = typeof tasks.$inferSelect & { employee?: typeof employees.$inferSelect | null }
type Employee = typeof employees.$inferSelect

interface TaskListProps {
  initialTasks: Task[]
  employees: Employee[]
}

export function TaskList({ initialTasks, employees }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [sortOrder, setSortOrder] = useState("none")

  const handleCreate = async (formData: FormData) => {
    await createTask(formData)
    setIsAddOpen(false)
    window.location.reload()
  }

  const handleUpdate = async (formData: FormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, formData)
      setEditingTask(null)
      window.location.reload()
    }
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    window.location.reload()
  }

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

  const sortedTasks = sortTasks(tasks, sortOrder)

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Task title" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Task description" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" />
              </div>
              <div>
                <Label htmlFor="employeeId">Assign to Employee</Label>
                <Select name="employeeId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Label htmlFor="sort-priority">Sort by Priority</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
            <SelectItem value="high-to-low">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {sortedTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {task.title}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTask(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <form action={handleUpdate} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-title">Title</Label>
                          <Input id="edit-title" name="title" defaultValue={task.title} required />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Input id="edit-description" name="description" defaultValue={task.description || ''} />
                        </div>
                        <div>
                          <Label htmlFor="edit-status">Status</Label>
                          <Select name="status" defaultValue={task.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-priority">Priority</Label>
                          <Select name="priority" defaultValue={task.priority}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-dueDate">Due Date</Label>
                          <Input id="edit-dueDate" name="dueDate" type="date" defaultValue={task.dueDate || ''} />
                        </div>
                        <div>
                          <Label htmlFor="edit-employeeId">Assign to Employee</Label>
                          <Select name="employeeId" defaultValue={task.employeeId || ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map((employee) => (
                                <SelectItem key={employee.id} value={employee.id}>
                                  {employee.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit">Update</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Assigned to: {task.employee?.name || 'Unassigned'}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add your first task above.
        </div>
      )}
    </div>
  )
}