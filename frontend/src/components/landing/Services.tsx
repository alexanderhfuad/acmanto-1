import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import cuciImg from "@/assets/images/cuci-ac.png";
import perbaikanImg from "@/assets/images/perbaikan-ac.png";
import pasangImg from "@/assets/images/pemasangan-ac.png";

export default function Services() {
  const services = [
    {
      id: "cuci",
      title: "Cuci AC Profesional",
      price: "Mulai Rp 65.000",
      description: "Pembersihan menyeluruh unit indoor dan outdoor untuk mengembalikan suhu dingin optimal.",
      image: cuciImg,
      features: [
        "Pembersihan filter & evaporator",
        "Pembersihan unit outdoor",
        "Cek tekanan freon dasar",
        "Pengecekan fungsi remote",
        "Pembersihan selang pembuangan"
      ]
    },
    {
      id: "perbaikan",
      title: "Perbaikan & Isi Freon",
      price: "Mulai Rp 150.000",
      description: "Diagnosis akurat dan perbaikan masalah AC bocor, tidak dingin, atau mati total.",
      image: perbaikanImg,
      features: [
        "Cari titik kebocoran",
        "Isi freon R32 / R410a / R22",
        "Perbaikan modul/PCB",
        "Ganti kapasitor",
        "Garansi perbaikan 30 hari"
      ]
    },
    {
      id: "pemasangan",
      title: "Pasang & Bongkar AC",
      price: "Mulai Rp 250.000",
      description: "Jasa pasang AC baru atau bekas, serta bongkar AC lama dengan rapi dan aman.",
      image: pasangImg,
      features: [
        "Pemasangan unit indoor & outdoor",
        "Instalasi pipa standar",
        "Vakum pipa freon",
        "Bobok dinding rapi",
        "Uji coba running test"
      ]
    }
  ];

  return (
    <section id="layanan" className="py-24 bg-slate-50 dark:bg-slate-900/50" aria-label="Layanan Kami">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Layanan Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Solusi Lengkap untuk Segala Kebutuhan AC Anda</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Dari perawatan rutin hingga perbaikan kompleks, tim kami dilengkapi untuk menangani semua merk dan tipe AC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur py-1 px-3 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                    {service.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full rounded-xl" size="lg">
                    <a href={`#booking?service=${service.id}`}>Pesan Layanan Ini</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
