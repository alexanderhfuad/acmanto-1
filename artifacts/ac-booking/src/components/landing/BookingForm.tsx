import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useCreateBooking } from "@workspace/api-client-react";

const SERVICE_LABEL: Record<string, string> = {
  cuci: "Cuci AC",
  perbaikan: "Perbaikan AC",
  pemasangan: "Pemasangan AC",
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi (minimal 2 karakter)." }),
  phone: z.string().min(10, { message: "Nomor HP tidak valid." }),
  address: z.string().min(10, { message: "Alamat lengkap harus diisi." }),
  service: z.enum(["cuci", "perbaikan", "pemasangan"], {
    errorMap: () => ({ message: "Pilih jenis layanan." }),
  }),
  acType: z.string().min(1, { message: "Pilih jenis AC." }),
  date: z.string().min(1, { message: "Pilih tanggal." }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingForm() {
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      acType: "",
      date: "",
      notes: "",
    },
  });

  function onSubmit(values: FormValues) {
    createBooking.mutate(
      {
        data: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          serviceType: values.service,
          acType: values.acType,
          preferredDate: values.date,
          notes: values.notes ?? null,
        },
      },
      {
        onSuccess: (booking) => {
          toast({
            title: "Booking berhasil dikirim!",
            description: `Terima kasih ${booking.name}. Tim DinginPro akan segera menghubungi Anda via WhatsApp untuk konfirmasi jadwal ${SERVICE_LABEL[booking.serviceType] ?? "layanan"}.`,
            duration: 6000,
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Booking gagal dikirim",
            description: "Terjadi kesalahan saat mengirim booking. Silakan coba lagi atau hubungi kami via WhatsApp.",
            variant: "destructive",
            duration: 6000,
          });
        },
      },
    );
  }

  const isSubmitting = createBooking.isPending;

  return (
    <section id="booking" className="py-24 bg-sky-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800" aria-label="Booking Layanan">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-800">
          
          {/* Info Side */}
          <div className="bg-primary text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Booking Teknisi Sekarang</h2>
              <p className="text-white/80 mb-8 text-lg">
                Isi form di samping untuk menjadwalkan kunjungan teknisi. Cepat, mudah, dan terjamin.
              </p>
            </div>
            
            <div className="relative z-10 space-y-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Jadwal Fleksibel</h4>
                  <p className="text-white/70 text-sm">Pilih hari yang paling pas untuk Anda.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">Rp</span>
                </div>
                <div>
                  <h4 className="font-semibold">Bayar Setelah Selesai</h4>
                  <p className="text-white/70 text-sm">Aman dan tanpa DP.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 md:w-3/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Budi Santoso" {...field} className="bg-slate-50 dark:bg-slate-950" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. HP / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="081234567890" type="tel" {...field} className="bg-slate-50 dark:bg-slate-950" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Layanan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                            <SelectValue placeholder="Pilih layanan yang dibutuhkan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cuci">Cuci AC Reguler</SelectItem>
                          <SelectItem value="perbaikan">Perbaikan / AC Tidak Dingin / Isi Freon</SelectItem>
                          <SelectItem value="pemasangan">Pemasangan / Bongkar Pasang AC</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="acType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis AC</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 dark:bg-slate-950">
                              <SelectValue placeholder="Pilih kapasitas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0.5pk">0.5 PK</SelectItem>
                            <SelectItem value="0.75pk">3/4 PK</SelectItem>
                            <SelectItem value="1pk">1 PK</SelectItem>
                            <SelectItem value="1.5pk">1.5 PK</SelectItem>
                            <SelectItem value="2pk">2 PK atau lebih</SelectItem>
                            <SelectItem value="tidak_tahu">Tidak Tahu</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Kedatangan</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="bg-slate-50 dark:bg-slate-950" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Lengkap</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota..." 
                          className="resize-none bg-slate-50 dark:bg-slate-950 h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan Keluhan (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: AC netes air, tidak dingin sama sekali, dll." {...field} className="bg-slate-50 dark:bg-slate-950" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full text-base h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Kirim Permintaan Booking"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
