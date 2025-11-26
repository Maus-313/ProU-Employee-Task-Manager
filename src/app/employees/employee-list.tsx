'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { createEmployee, updateEmployee, deleteEmployee } from './actions'
import { employees } from '@/lib/schema'

type Employee = typeof employees.$inferSelect

interface EmployeeListProps {
  initialEmployees: Employee[]
}

export function EmployeeList({ initialEmployees }: EmployeeListProps) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const handleCreate = async (formData: FormData) => {
    await createEmployee(formData)
    setIsAddOpen(false)
    // Refresh the list - in a real app, you might refetch or use optimistic updates
    window.location.reload()
  }

  const handleUpdate = async (formData: FormData) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, formData)
      setEditingEmployee(null)
      window.location.reload()
    }
  }

  const handleDelete = async (id: string) => {
    await deleteEmployee(id)
    window.location.reload()
  }

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <Input name="name" placeholder="Name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="position" placeholder="Position" required />
              <Input name="department" placeholder="Department" required />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {employee.name}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEmployee(employee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                      </DialogHeader>
                      <form action={handleUpdate} className="space-y-4">
                        <Input name="name" defaultValue={employee.name} required />
                        <Input name="email" type="email" defaultValue={employee.email} required />
                        <Input name="position" defaultValue={employee.position} required />
                        <Input name="department" defaultValue={employee.department} required />
                        <Button type="submit">Update</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {employee.email}</p>
              <p>Position: {employee.position}</p>
              <p>Department: {employee.department}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No employees found. Add your first employee above.
        </div>
      )}
    </div>
  )
}