import { motion } from "framer-motion";
import { MousePointerClick, CalendarCheck, PenTool, ThumbsUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Booking Online",
      description: "Isi form pemesanan singkat atau hubungi kami via WhatsApp untuk menjadwalkan kunjungan.",
      icon: MousePointerClick
    },
    {
      title: "Konfirmasi Jadwal",
      description: "Tim admin kami akan segera mengkonfirmasi pesanan dan memastikan ketersediaan teknisi.",
      icon: CalendarCheck
    },
    {
      title: "Pengerjaan",
      description: "Teknisi datang tepat waktu, menganalisis, dan mengerjakan sesuai SOP yang profesional.",
      icon: PenTool
    },
    {
      title: "Selesai & Bergaransi",
      description: "Bayar setelah pekerjaan selesai. Nikmati garansi 30 hari untuk setiap layanan perbaikan.",
      icon: ThumbsUp
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden" aria-label="Cara Kerja">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Proses Mudah</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Cara Memesan Layanan Kami</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hanya butuh beberapa menit untuk mengamankan jadwal teknisi untuk AC Anda.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 relative group">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <step.icon className="h-8 w-8 text-primary relative z-10" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 dark:bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-white dark:border-slate-900">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
