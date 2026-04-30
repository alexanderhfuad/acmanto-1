import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Berapa lama teknisi akan datang setelah saya booking?",
      answer: "Untuk booking reguler, kami akan menjadwalkan pada hari yang sama atau H+1. Untuk kasus darurat (AC mati total/bocor parah), kami mengupayakan kedatangan dalam waktu 2-4 jam tergantung lokasi dan ketersediaan teknisi di area Anda."
    },
    {
      question: "Apakah ada garansi untuk perbaikan AC?",
      answer: "Ya, kami memberikan garansi 30 hari untuk pekerjaan perbaikan (seperti perbaikan kebocoran, ganti sparepart) dan isi freon full. Garansi berlaku untuk kerusakan yang sama pada titik yang sama."
    },
    {
      question: "Apakah cuci AC juga harus tambah freon?",
      answer: "TIDAK. Freon bekerja dalam sistem tertutup dan tidak akan habis jika tidak ada kebocoran. Teknisi kami akan mengecek tekanan freon secara gratis saat mencuci AC, dan hanya akan menyarankan pengisian/tambah jika memang terbukti kurang."
    },
    {
      question: "Berapa idealnya jangka waktu untuk cuci AC rutin?",
      answer: "Untuk rumah tinggal biasa, idealnya AC dicuci setiap 3-4 bulan sekali. Untuk ruko, kantor, atau ruangan yang menghadap jalan raya/banyak debu, disarankan setiap 2 bulan sekali."
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer: "Pembayaran dilakukan SETELAH pekerjaan selesai dan AC dites berfungsi dengan baik. Anda dapat membayar tunai kepada teknisi atau transfer ke rekening perusahaan (BCA/Mandiri/BCA/QRIS)."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950" aria-label="FAQ (Tanya Jawab)">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Temukan jawaban untuk pertanyaan umum seputar layanan kami.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-slate-200 dark:border-slate-800">
              <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
