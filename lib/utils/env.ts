import { config } from 'dotenv';
import { cleanEnv, str, url } from 'envalid';

config({ path: ['.env.local', '.env'] });

export const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production', 'staging']
    }),
    NEXT_PUBLIC_PROJECT_URL: url({ default: 'http://localhost:3000' }),
    NEXT_PUBLIC_PROJECT_ID: str(),
    NEXTAUTH_URL: url({ default: 'http://localhost:3000' }),
    NEXTAUTH_SECRET: str(),
    DATABASE_URL: url({
        default: 'postgresql://postgres:postgres@localhost:5432/postgres'
    }),
    SUPABASE_URL: str({ default: '' }),
    SUPABASE_KEY: str({ default: '' })
});
