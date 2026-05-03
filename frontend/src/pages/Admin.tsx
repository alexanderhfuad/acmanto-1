import { useEffect, useMemo, useState } from "react";
import {
  Snowflake,
  LogOut,
  Phone,
  MapPin,
  Calendar,
  AirVent,
  StickyNote,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  useGetBookings,
  useUpdateBookingStatus,
  getGetBookingsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Booking } from "@workspace/api-client-react";
import { Link } from "wouter";
import { isApiEnabled } from "@/lib/deployment";

const TOKEN_KEY = "dinginpro_admin_token";

const SERVICE_LABEL: Record<string, string> = {
  cuci: "Cuci AC",
  perbaikan: "Perbaikan AC",
  pemasangan: "Pemasangan AC",
};

const STATUS_META: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Menunggu",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 border-amber-200",
  },
  confirmed: {
    label: "Dikonfirmasi",
    className: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200 border-sky-200",
  },
  completed: {
    label: "Selesai",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-200",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 border-rose-200",
  },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function formatPreferredDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function whatsappLink(phone: string, name: string, service: string): string {
  const cleaned = phone.replace(/[^\d]/g, "").replace(/^0/, "62");
  const message = encodeURIComponent(
    `Halo ${name}, saya dari DinginPro ingin mengonfirmasi booking ${SERVICE_LABEL[service] ?? "layanan AC"} Anda. Apakah jadwal yang Anda pilih masih sesuai?`,
  );
  return `https://wa.me/${cleaned}?text=${message}`;
}

function LoginCard({ onLogin }: { onLogin: (token: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <Card className="w-full max-w-md shadow-xl border-sky-100 dark:border-slate-800">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl">Admin DinginPro</CardTitle>
          <p className="text-sm text-muted-foreground">
            Masukkan token admin untuk melihat data booking yang masuk.
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (value.trim()) onLogin(value.trim());
            }}
            className="space-y-4"
          >
            <Input
              type="password"
              placeholder="Token admin"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              className="h-12"
            />
            <Button type="submit" className="w-full h-12 text-base">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  if (!isApiEnabled) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <Card className="w-full max-w-xl shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl">Panel admin belum aktif</CardTitle>
            <p className="text-sm text-muted-foreground">
              Halaman admin membutuhkan backend API. Untuk sementara, frontend ini sedang berjalan dalam mode tampilan saja.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                Hubungi via WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  const requestInit = useMemo<RequestInit>(
    () => ({ headers: { "x-admin-token": token ?? "" } }),
    [token],
  );

  const bookingsQuery = useGetBookings({
    query: {
      queryKey: getGetBookingsQueryKey(),
      enabled: Boolean(token),
      refetchInterval: 15000,
      retry: false,
    },
    request: requestInit,
  });

  const updateStatus = useUpdateBookingStatus({
    request: requestInit,
  });

  useEffect(() => {
    if (bookingsQuery.error && token) {
      const status = (bookingsQuery.error as { status?: number }).status;
      if (status === 401) {
        setAuthError(true);
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        toast({
          title: "Token tidak valid",
          description: "Silakan masukkan token admin yang benar.",
          variant: "destructive",
        });
      }
    }
  }, [bookingsQuery.error, token, toast]);

  if (!token) {
    return (
      <LoginCard
        onLogin={(t) => {
          setAuthError(false);
          localStorage.setItem(TOKEN_KEY, t);
          setToken(t);
        }}
      />
    );
  }

  const bookings: Booking[] = bookingsQuery.data ?? [];
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  function handleStatusChange(id: number, status: string) {
    if (!token) return;
    updateStatus.mutate(
      {
        id,
        data: { status: status as "pending" | "confirmed" | "completed" | "cancelled" },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetBookingsQueryKey() });
          toast({
            title: "Status diperbarui",
            description: `Status booking #${id} berhasil diubah.`,
          });
        },
        onError: () => {
          toast({
            title: "Gagal memperbarui status",
            variant: "destructive",
          });
        },
      },
    );
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold leading-none">DinginPro Admin</p>
              <p className="text-xs text-muted-foreground mt-1">Manajemen booking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => bookingsQuery.refetch()}
              disabled={bookingsQuery.isFetching}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${bookingsQuery.isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        <section aria-label="Ringkasan">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Booking" value={stats.total} icon={<AirVent className="w-5 h-5" />} accent="bg-primary/10 text-primary" />
            <StatCard label="Menunggu" value={stats.pending} icon={<Clock className="w-5 h-5" />} accent="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200" />
            <StatCard label="Dikonfirmasi" value={stats.confirmed} icon={<CheckCircle2 className="w-5 h-5" />} accent="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200" />
            <StatCard label="Selesai" value={stats.completed} icon={<CheckCircle2 className="w-5 h-5" />} accent="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200" />
          </div>
        </section>

        <section aria-label="Daftar booking" className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Booking Masuk</h1>
            <p className="text-sm text-muted-foreground">Diperbarui otomatis tiap 15 detik</p>
          </div>

          {bookingsQuery.isLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Memuat data booking...
            </div>
          ) : authError ? (
            <Card className="border-destructive/50">
              <CardContent className="py-12 text-center text-destructive">
                <XCircle className="w-10 h-10 mx-auto mb-3" />
                Token admin tidak valid. Silakan masuk ulang.
              </CardContent>
            </Card>
          ) : bookings.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <AirVent className="w-12 h-12 mx-auto mb-3 opacity-40" />
                Belum ada booking yang masuk.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookings.map((b) => {
                const meta = STATUS_META[b.status] ?? STATUS_META["pending"]!;
                return (
                  <Card key={b.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-semibold">{b.name}</h3>
                            <Badge variant="outline" className={meta.className}>
                              {meta.label}
                            </Badge>
                            <Badge variant="secondary">
                              {SERVICE_LABEL[b.serviceType] ?? b.serviceType}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            #{b.id} · Dibuat {formatDate(b.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={b.status}
                            onValueChange={(v) => handleStatusChange(b.id, v)}
                            disabled={updateStatus.isPending}
                          >
                            <SelectTrigger className="w-44">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Menunggu</SelectItem>
                              <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                              <SelectItem value="completed">Selesai</SelectItem>
                              <SelectItem value="cancelled">Dibatalkan</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <a
                              href={whatsappLink(b.phone, b.name, b.serviceType)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <InfoRow icon={<Phone className="w-4 h-4" />} label="No. HP">
                          <a href={`tel:${b.phone}`} className="hover:underline">{b.phone}</a>
                        </InfoRow>
                        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Tanggal Diminta">
                          {formatPreferredDate(b.preferredDate)}
                        </InfoRow>
                        <InfoRow icon={<AirVent className="w-4 h-4" />} label="Jenis AC">
                          {b.acType.toUpperCase()}
                        </InfoRow>
                        <InfoRow icon={<MapPin className="w-4 h-4" />} label="Alamat">
                          {b.address}
                        </InfoRow>
                        {b.notes ? (
                          <InfoRow icon={<StickyNote className="w-4 h-4" />} label="Catatan" full>
                            {b.notes}
                          </InfoRow>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  children,
  full = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 ${full ? "md:col-span-2" : ""}`}>
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground break-words">{children}</p>
      </div>
    </div>
  );
}
