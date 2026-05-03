import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Star, Users, ArrowRight } from "lucide-react";
import heroImg from "@/assets/images/hero.png";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" aria-label="Beranda">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-sky-50 dark:bg-slate-900/50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Layanan AC #1 di Jabodetabek
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-6">
              Kembalikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Kesejukan</span> Ruangan Anda Hari Ini
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Tim teknisi profesional DinginPro siap mencuci, memperbaiki, dan memasang AC Anda. Respon cepat, harga transparan, dan bergaransi 30 hari.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="text-base h-14 px-8 rounded-full shadow-lg shadow-primary/25 group">
                <a href="#booking">
                  Pesan Teknisi Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base h-14 px-8 rounded-full bg-white hover:bg-slate-50 border-slate-200">
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                  Konsultasi via WhatsApp
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-lg text-slate-900 dark:text-white">4.9/5</span>
                </div>
                <span className="text-xs text-slate-500">Rating Google</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-primary">
                  <Users className="h-4 w-4" />
                  <span className="font-bold text-lg text-slate-900 dark:text-white">10rb+</span>
                </div>
                <span className="text-xs text-slate-500">Pelanggan Puas</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-primary">
                  <Shield className="h-4 w-4" />
                  <span className="font-bold text-lg text-slate-900 dark:text-white">30 Hari</span>
                </div>
                <span className="text-xs text-slate-500">Garansi Service</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border-[8px] border-white dark:border-slate-800 aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src={heroImg} 
                alt="Teknisi AC DinginPro yang profesional sedang memeriksa unit outdoor di balkon" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Teknisi</p>
                <p className="font-bold text-slate-900 dark:text-white">Bersertifikat BNSP</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
