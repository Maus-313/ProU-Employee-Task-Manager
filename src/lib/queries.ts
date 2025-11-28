import { db } from './db'
import { employees, tasks } from './schema'
import { eq, sql } from 'drizzle-orm'

export async function getDashboardStats() {
  const [employeeResult] = await db.select({ count: sql<number>`count(*)` }).from(employees)
  const [taskResult] = await db.select({ count: sql<number>`count(*)` }).from(tasks)
  const [completedResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(eq(tasks.status, 'completed'))

  return {
    employeeCount: employeeResult.count,
    taskCount: taskResult.count,
    completedTaskCount: completedResult.count,
  }
}
export async function getAllTasksWithEmployees() {
  return await db
    .select({
      id: tasks.id,
      title: tasks.title,
      priority: tasks.priority,
      createdAt: tasks.createdAt,
      dueDate: tasks.dueDate,
      employeeName: employees.name,
    })
    .from(tasks)
    .leftJoin(employees, eq(tasks.employeeId, employees.id))
}