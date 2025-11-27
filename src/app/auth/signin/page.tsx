'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignIn() {
  const router = useRouter()

  const handleDemoLogin = () => {
    // Mock authentication - in production, implement real auth
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Employee Task Manager</CardTitle>
          <CardDescription>
            Welcome to your task management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Click below to access the demo application
            </p>
            <Button onClick={handleDemoLogin} className="w-full">
              Enter Demo
            </Button>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🚀 Features available:</p>
            <ul className="mt-2 text-xs">
              <li>• Dashboard with statistics</li>
              <li>• Employee management (CRUD)</li>
              <li>• Task management (CRUD)</li>
              <li>• Fast navigation with loading states</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}