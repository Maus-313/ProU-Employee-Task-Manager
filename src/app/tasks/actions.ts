'use server'

import { db } from '@/lib/db'
import { tasks } from '@/lib/schema'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'

export async function getTasks() {
  return await db.query.tasks.findMany({
    with: {
      employee: true,
    },
  })
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string
  const dueDate = formData.get('dueDate') as string
  const employeeId = formData.get('employeeId') as string

  await db.insert(tasks).values({
    title,
    description,
    status: status as 'pending' | 'in_progress' | 'completed',
    dueDate: dueDate || null,
    employeeId: employeeId || null,
  })

  revalidatePath('/tasks')
}

export async function updateTask(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string
  const dueDate = formData.get('dueDate') as string
  const employeeId = formData.get('employeeId') as string

  await db
    .update(tasks)
    .set({
      title,
      description,
      status: status as 'pending' | 'in_progress' | 'completed',
      dueDate: dueDate || null,
      employeeId: employeeId || null,
    })
    .where(eq(tasks.id, id))

  revalidatePath('/tasks')
}

export async function deleteTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id))
  revalidatePath('/tasks')
}