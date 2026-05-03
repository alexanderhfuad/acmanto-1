import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const cuciPrices = [
    { type: "AC Split 0.5 - 1 PK", price: "Rp 65.000" },
    { type: "AC Split 1.5 - 2 PK", price: "Rp 75.000" },
    { type: "AC Cassette / Standing", price: "Rp 150.000 - Rp 250.000" },
    { type: "AC Inverter (Semua PK)", price: "+ Rp 15.000 dari harga standar" },
  ];

  const freonPrices = [
    { type: "Tambah Freon R32 / R410a", price: "Rp 150.000" },
    { type: "Isi Full Freon R32 / R410a", price: "Rp 250.000" },
    { type: "Tambah Freon R22", price: "Rp 125.000" },
    { type: "Isi Full Freon R22", price: "Rp 200.000" },
  ];

  return (
    <section id="harga" className="py-24 bg-white dark:bg-slate-950" aria-label="Daftar Harga">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Harga Transparan</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Estimasi Biaya Layanan</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Kami percaya pada transparansi. Berikut adalah daftar harga standar kami. Harga final akan dipastikan oleh teknisi setelah pengecekan di lokasi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Jasa Cuci AC
            </h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="font-bold text-slate-900 dark:text-white">Tipe AC</TableHead>
                    <TableHead className="text-right font-bold text-slate-900 dark:text-white">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cuciPrices.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell className="text-right text-primary font-semibold">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
              Isi/Tambah Freon
            </h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="font-bold text-slate-900 dark:text-white">Tipe Freon</TableHead>
                    <TableHead className="text-right font-bold text-slate-900 dark:text-white">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freonPrices.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell className="text-right text-primary font-semibold">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-6 italic">
            *Biaya pengecekan (tanpa tindakan) adalah Rp 50.000. Biaya bongkar pasang mulai dari Rp 250.000.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <a href="#booking">Booking Sekarang</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
