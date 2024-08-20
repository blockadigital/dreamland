import 'dotenv/config';
import { migrationClient } from '@/lib/config/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

(async () => {
    await migrate(drizzle(migrationClient), { migrationsFolder: 'migrations' });
    await migrationClient.end();
})();
