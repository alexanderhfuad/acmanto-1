import { useEffect } from "react";
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import ServiceArea from "@/components/landing/ServiceArea";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import BookingForm from "@/components/landing/BookingForm";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

export default function Home() {
  useEffect(() => {
    // Implement smooth scrolling for anchor links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const id = anchor.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <HowItWorks />
        <Pricing />
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <BookingForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
