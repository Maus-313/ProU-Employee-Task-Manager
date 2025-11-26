import { AppLayout } from '@/components/layout/app-layout'
import { getTasks } from './actions'
import { getEmployees } from '../employees/actions'
import { TaskList } from './task-list'

export default async function Tasks() {
  const [tasks, employees] = await Promise.all([getTasks(), getEmployees()])

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Tasks</h1>
        <TaskList initialTasks={tasks} employees={employees} />
      </div>
    </AppLayout>
  )
}