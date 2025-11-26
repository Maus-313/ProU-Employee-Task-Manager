'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <Input name="title" placeholder="Title" required />
              <Input name="description" placeholder="Description" />
              <Select name="status">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Input name="dueDate" type="date" />
              <Select name="employeeId">
                <SelectTrigger>
                  <SelectValue placeholder="Assign to Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <form action={handleUpdate} className="space-y-4">
                        <Input name="title" defaultValue={task.title} required />
                        <Input name="description" defaultValue={task.description || ''} />
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
                        <Input name="dueDate" type="date" defaultValue={task.dueDate || ''} />
                        <Select name="employeeId" defaultValue={task.employeeId || ''}>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign to Employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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