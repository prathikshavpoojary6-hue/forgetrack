import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    try {
        console.log("Deleting vaishalnvpc@gmail.com...");
        await client.query(`
            DELETE FROM public.users WHERE email = 'vaishalnvpc@gmail.com';
            DELETE FROM auth.users WHERE email = 'vaishalnvpc@gmail.com';
        `);
        console.log("User successfully deleted.");
    } catch (e) {
        console.error("Error deleting user:", e);
    } finally {
        await client.end();
    }
}
main();
