'use server'

import { db } from '@/lib/db'
import { employees } from '@/lib/schema'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'

export async function getEmployees() {
  return await db.select().from(employees)
}

export async function createEmployee(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const position = formData.get('position') as string
  const department = formData.get('department') as string

  await db.insert(employees).values({
    name,
    email,
    position,
    department,
  })

  revalidatePath('/employees')
}

export async function updateEmployee(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const position = formData.get('position') as string
  const department = formData.get('department') as string

  await db
    .update(employees)
    .set({
      name,
      email,
      position,
      department,
    })
    .where(eq(employees.id, id))

  revalidatePath('/employees')
}

export async function deleteEmployee(id: string) {
  await db.delete(employees).where(eq(employees.id, id))
  revalidatePath('/employees')
}