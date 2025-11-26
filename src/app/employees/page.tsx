import { AppLayout } from '@/components/layout/app-layout'
import { getEmployees } from './actions'
import { EmployeeList } from './employee-list'

export default async function Employees() {
  const employees = await getEmployees()

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Employees</h1>
        <EmployeeList initialEmployees={employees} />
      </div>
    </AppLayout>
  )
}