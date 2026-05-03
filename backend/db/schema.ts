import { mysqlTable, text, int, timestamp } from "drizzle-orm/mysql-core";

export const bookingsTable = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  serviceType: text("service_type").notNull(),
  acType: text("ac_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type BookingRow = typeof bookingsTable.$inferSelect;
