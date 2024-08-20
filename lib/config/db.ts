import { env } from '@/lib/utils/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/database/schema';

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
export const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });
