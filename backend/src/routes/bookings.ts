import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db, bookingsTable } from "../../db";
import { desc, eq } from "drizzle-orm";
import {
  CreateBookingBody,
  UpdateBookingStatusBody,
  UpdateBookingStatusParams,
} from "../lib/api-zod";

const router: IRouter = Router();

function toIsoString(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function serializeBooking<T extends { createdAt: Date | string }>(booking: T) {
  return {
    ...booking,
    createdAt: toIsoString(booking.createdAt),
  };
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env["ADMIN_TOKEN"];
  const provided = req.header("x-admin-token");
  if (!expected || provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/bookings", requireAdmin, async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));
    const data = rows.map((r: typeof rows[number]) => serializeBooking(r));
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Gagal memuat data booking" });
  }
});

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Data booking tidak valid" });
    return;
  }
  try {
    const result = await db
      .insert(bookingsTable)
      .values({
        name: parsed.data.name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        serviceType: parsed.data.serviceType,
        acType: parsed.data.acType,
        preferredDate: parsed.data.preferredDate,
        notes: parsed.data.notes ?? null,
      });
    const insertId = Number(result[0].insertId);
    const [created] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, insertId))
      .limit(1);
    if (!created) {
      res.status(500).json({ error: "Gagal menyimpan booking" });
      return;
    }
    res.status(201).json(serializeBooking(created));
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Gagal menyimpan booking" });
  }
});

router.patch("/bookings/:id/status", requireAdmin, async (req, res) => {
  const params = UpdateBookingStatusParams.safeParse({ id: Number(req.params["id"]) });
  if (!params.success) {
    res.status(400).json({ error: "ID tidak valid" });
    return;
  }
  const body = UpdateBookingStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Status tidak valid" });
    return;
  }
  try {
    await db
      .update(bookingsTable)
      .set({ status: body.data.status })
      .where(eq(bookingsTable.id, params.data.id));
    const [updated] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, params.data.id))
      .limit(1);
    if (!updated) {
      res.status(404).json({ error: "Booking tidak ditemukan" });
      return;
    }
    res.json(serializeBooking(updated));
  } catch (err) {
    req.log.error({ err }, "Failed to update booking status");
    res.status(500).json({ error: "Gagal memperbarui status booking" });
  }
});

export default router;
