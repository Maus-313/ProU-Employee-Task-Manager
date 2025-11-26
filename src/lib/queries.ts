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