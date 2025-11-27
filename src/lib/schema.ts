import { pgTable, uuid, text, timestamp, date, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const statusEnum = pgEnum('status', ['pending', 'in_progress', 'completed'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const employees = pgTable('employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  position: text('position').notNull(),
  department: text('department').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  status: statusEnum('status').default('pending').notNull(),
  dueDate: date('due_date'),
  employeeId: uuid('employee_id').references(() => employees.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, ({}) => ({}))

export const employeesRelations = relations(employees, ({ many }) => ({
  tasks: many(tasks),
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  employee: one(employees, {
    fields: [tasks.employeeId],
    references: [employees.id],
  }),
}))