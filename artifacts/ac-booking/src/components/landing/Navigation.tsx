import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Snowflake, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Layanan", href: "#layanan" },
    { name: "Harga", href: "#harga" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-xl group-hover:bg-primary/90 transition-colors">
              <Snowflake className="h-6 w-6" />
            </div>
            <span className={`font-display font-bold text-2xl tracking-tight ${isScrolled ? "text-foreground" : "text-white"}`}>
              Dingin<span className="text-primary">Pro</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? "text-muted-foreground" : "text-white/90"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>0812-3456-7890</span>
              </a>
              <Button asChild size="lg" className="rounded-full shadow-md font-semibold">
                <a href="#booking">Booking Sekarang</a>
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-md ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block py-2 text-foreground font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-px bg-border my-2" />
          <a 
            href="https://wa.me/6281234567890" 
            className="flex items-center gap-2 py-2 text-foreground font-medium"
          >
            <Phone className="h-5 w-5 text-primary" />
            <span>0812-3456-7890</span>
          </a>
          <Button asChild className="w-full mt-2" size="lg">
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>Booking Sekarang</a>
          </Button>
        </div>
      )}
    </header>
  );
}
