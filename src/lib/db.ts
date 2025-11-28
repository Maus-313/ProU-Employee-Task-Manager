import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'
import * as schema from './schema'

// Ensure DATABASE_URL is loaded when running via scripts (e.g. tsx seed)
if (!process.env.DATABASE_URL) {
  config({ path: '.env.local' })
}

// Configure Neon for better performance
neonConfig.fetchConnectionCache = true

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })