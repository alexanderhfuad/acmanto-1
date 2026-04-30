import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function ServiceArea() {
  const areas = [
    "Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara",
    "Depok", "Bogor Kota", "Tangerang Selatan", "Kota Tangerang", "Bekasi Barat", "Bekasi Selatan"
  ];

  return (
    <section className="py-20 bg-primary text-white" aria-label="Area Layanan">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Area Layanan Jabodetabek</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Tim teknisi kami tersebar di berbagai titik di Jabodetabek untuk memastikan respon yang cepat ke lokasi Anda.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {areas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-2 px-4 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            {/* Abstract Map Representation */}
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
                <MapPin className="h-32 w-32 text-white/20" />
                
                {/* Pulsing Dots */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-300 rounded-full animate-ping"></div>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-300 rounded-full"></div>
                
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full"></div>
                
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-cyan-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
