import { db } from './db'
import { employees, tasks } from './schema'

export async function seed() {
  // Seed employees
  const employeeData = [
    { name: 'John Doe', email: 'john@example.com', position: 'Developer', department: 'Engineering' },
    { name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', department: 'Design' },
    { name: 'Bob Johnson', email: 'bob@example.com', position: 'Manager', department: 'Management' },
  ]

  const insertedEmployees = await db.insert(employees).values(employeeData).returning()

  // Seed tasks
  const taskData = [
    {
      title: 'Implement user authentication',
      description: 'Add login and registration functionality',
      status: 'in_progress' as const,
      dueDate: '2024-12-01',
      employeeId: insertedEmployees[0].id,
    },
    {
      title: 'Design new landing page',
      description: 'Create a modern and responsive landing page',
      status: 'pending' as const,
      dueDate: '2024-11-30',
      employeeId: insertedEmployees[1].id,
    },
    {
      title: 'Review project proposal',
      description: 'Evaluate the new project proposal and provide feedback',
      status: 'completed' as const,
      dueDate: '2024-11-25',
      employeeId: insertedEmployees[2].id,
    },
  ]

  await db.insert(tasks).values(taskData)

  console.log('Database seeded successfully!')
}