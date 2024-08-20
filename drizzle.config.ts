import { defineConfig } from 'drizzle-kit';
import { env } from './lib/utils/env';

export default defineConfig({
    schema: './database/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL
    }
});
