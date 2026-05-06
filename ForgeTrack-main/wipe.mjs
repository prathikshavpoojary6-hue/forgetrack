import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    try {
        console.log("Dropping existing tables to refresh data...");
        await client.query(`
            DROP TABLE IF EXISTS public.attendance CASCADE;
            DROP TABLE IF EXISTS public.materials CASCADE;
            DROP TABLE IF EXISTS public.sessions CASCADE;
            DROP TABLE IF EXISTS public.import_log CASCADE;
            DROP TABLE IF EXISTS public.students CASCADE;
            DROP TABLE IF EXISTS public.users CASCADE;
        `);
        console.log("Tables dropped successfully.");
    } catch (e) {
        console.error("Error dropping tables:", e);
    } finally {
        await client.end();
    }
}
main();
