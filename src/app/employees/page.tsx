import { Suspense } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { getEmployees } from './actions'
import { EmployeeList } from './employee-list'

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic'
export const revalidate = 0

function EmployeesSkeleton() {
  return (
    <div className="p-6">
      <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function EmployeesContent() {
  const employees = await getEmployees()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employees</h1>
      <EmployeeList initialEmployees={employees} />
    </div>
  )
}

export default function Employees() {
  return (
    <AppLayout>
      <Suspense fallback={<EmployeesSkeleton />}>
        <EmployeesContent />
      </Suspense>
    </AppLayout>
  )
}