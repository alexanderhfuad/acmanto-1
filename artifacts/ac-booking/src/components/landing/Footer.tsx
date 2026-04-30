import { Snowflake, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <Snowflake className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Dingin<span className="text-primary">Pro</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Jasa service AC profesional terpercaya di Jabodetabek. Teknisi handal, harga transparan, bergaransi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors bg-slate-900 p-2 rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors bg-slate-900 p-2 rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <a href="https://wa.me/6281234567890" className="hover:text-white transition-colors block">
                    0812-3456-7890 (WhatsApp)
                  </a>
                  <span className="text-xs text-slate-500">Senin - Minggu: 07:00 - 21:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <a href="mailto:halo@dinginpro.com" className="hover:text-white transition-colors">
                  halo@dinginpro.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">
                  Jl. Sudirman No. 123, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                </span>
              </li>
            </ul>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Layanan</h3>
            <ul className="space-y-3">
              <li><a href="#layanan" className="hover:text-white transition-colors text-sm flex items-center before:content-['›'] before:text-primary before:mr-2 before:font-bold">Cuci AC Reguler</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors text-sm flex items-center before:content-['›'] before:text-primary before:mr-2 before:font-bold">Isi/Tambah Freon</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors text-sm flex items-center before:content-['›'] before:text-primary before:mr-2 before:font-bold">Perbaikan AC Bocor</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors text-sm flex items-center before:content-['›'] before:text-primary before:mr-2 before:font-bold">Bongkar Pasang AC</a></li>
              <li><a href="#harga" className="hover:text-white transition-colors text-sm flex items-center before:content-['›'] before:text-primary before:mr-2 before:font-bold">Daftar Harga</a></li>
            </ul>
          </div>

          {/* Area Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Area Jangkauan</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>Jakarta Selatan</li>
              <li>Jakarta Pusat</li>
              <li>Jakarta Barat</li>
              <li>Jakarta Timur</li>
              <li>Jakarta Utara</li>
              <li>Depok</li>
              <li>Bogor</li>
              <li>Tangerang</li>
              <li>Bekasi</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} DinginPro. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
