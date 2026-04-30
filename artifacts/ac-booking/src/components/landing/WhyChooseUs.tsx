import { motion } from "framer-motion";
import { CheckCircle2, Shield, Clock, Award, Wrench, ThumbsUp } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Teknisi Bersertifikat",
      description: "Semua teknisi kami telah lulus uji kompetensi dan memiliki sertifikat BNSP.",
      icon: Award
    },
    {
      title: "Garansi Service 30 Hari",
      description: "Kami memberikan garansi penuh untuk setiap pekerjaan perbaikan dan pemasangan.",
      icon: Shield
    },
    {
      title: "Tepat Waktu",
      description: "Kami menghargai waktu Anda. Teknisi datang sesuai jadwal yang disepakati.",
      icon: Clock
    },
    {
      title: "Peralatan Modern & Bersih",
      description: "Menggunakan peralatan standar industri dan selalu menjaga kebersihan area kerja.",
      icon: Wrench
    },
    {
      title: "Harga Transparan",
      description: "Tidak ada biaya tersembunyi. Anda akan mengetahui estimasi harga sebelum pengerjaan.",
      icon: CheckCircle2
    },
    {
      title: "Kepuasan Terjamin",
      description: "Prioritas utama kami adalah memastikan AC Anda kembali dingin dan berfungsi optimal.",
      icon: ThumbsUp
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900" aria-label="Mengapa Memilih Kami">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Standar Pelayanan <span className="text-primary">Profesional</span></h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Kami tidak hanya mendinginkan ruangan Anda, tapi juga memberikan ketenangan pikiran melalui pelayanan yang jujur dan andal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <reason.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{reason.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
