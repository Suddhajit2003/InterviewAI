// "use server";

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = neon(process.env.DATABASE_URL);

const db = drizzle(pool);
