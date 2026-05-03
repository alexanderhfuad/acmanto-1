import { defineConfig } from "drizzle-kit";
import path from "path";

function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.MYSQL_HOST;
  const port = process.env.MYSQL_PORT || "3306";
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE;

  if (!host || !user || !database) {
    throw new Error(
      "Set DATABASE_URL or MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE before running drizzle-kit.",
    );
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const auth = encodedPassword
    ? `${encodedUser}:${encodedPassword}`
    : encodedUser;

  return `mysql://${auth}@${host}:${port}/${database}`;
}

export default defineConfig({
  schema: path.join(__dirname, "./db/schema.ts"),
  dialect: "mysql",
  dbCredentials: {
    url: resolveDatabaseUrl(),
  },
});
