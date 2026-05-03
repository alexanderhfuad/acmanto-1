import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { bookingsTable } from "./schema";

const databaseUrl = process.env["DATABASE_URL"];
const host = process.env["MYSQL_HOST"];
const user = process.env["MYSQL_USER"];
const password = process.env["MYSQL_PASSWORD"];
const database = process.env["MYSQL_DATABASE"];
const port = process.env["MYSQL_PORT"]
  ? Number(process.env["MYSQL_PORT"])
  : 3306;

if (process.env["MYSQL_PORT"] && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid MYSQL_PORT value: "${process.env["MYSQL_PORT"]}"`);
}

if (!databaseUrl && (!host || !user || !database)) {
  throw new Error(
    "Set DATABASE_URL or MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE for the MySQL connection.",
  );
}

export const pool = databaseUrl
  ? mysql.createPool(databaseUrl)
  : mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      timezone: "Z",
    });

export const db = drizzle(pool, {
  schema: { bookingsTable },
  mode: "default",
});

export async function ensureDatabaseSchema(): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      service_type TEXT NOT NULL,
      ac_type TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      notes TEXT NULL,
      status TEXT NOT NULL DEFAULT ('pending'),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export { bookingsTable };
