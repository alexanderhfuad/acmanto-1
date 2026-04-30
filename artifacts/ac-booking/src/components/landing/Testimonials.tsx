import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Warga Jakarta Selatan",
      content: "Pesan jasa cuci AC jam 8 pagi, jam 10 teknisi sudah sampai. Kerja rapi, bersih, dan AC dingin kembali seperti baru. Sangat direkomendasikan!",
      initials: "BS"
    },
    {
      name: "Siti Rahmawati",
      role: "Pemilik Cafe, Depok",
      content: "Sudah dua bengkel AC menyerah perbaiki AC standing di cafe saya. Tim DinginPro datang, langsung ketemu masalah modulnya, dan diperbaiki hari itu juga.",
      initials: "SR"
    },
    {
      name: "Anton Wijaya",
      role: "Warga Tangerang",
      content: "Harga transparan banget. Dikasih tau dulu rincian biayanya sebelum dikerjakan, ga ada biaya kaget di akhir. Teknisi ramah dan informatif.",
      initials: "AW"
    }
  ];

  return (
    <section id="testimoni" className="py-24 bg-slate-50 dark:bg-slate-900/50" aria-label="Testimoni Pelanggan">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Apa Kata Mereka</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Ribuan Pelanggan Telah Mempercayai Kami</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg bg-white dark:bg-slate-900 relative">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-slate-100 dark:text-slate-800" />
                <CardHeader className="flex flex-row items-center gap-4 pb-2 relative z-10">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
