import type { Metadata } from 'next';
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { VoiceDiscussion } from "@/components/ai/VoiceDiscussion";
import { UrbeLudoBanner } from "@/components/sections/UrbeLudoBanner";

export const metadata: Metadata = {
  title: 'Início | Estratégia e Resultados de Impacto',
  description: 'Maximize o ROI do seu negócio com a studiosapient. Somos especialistas em design de alta performance e tráfego pago focado em conversão. Solicite seu diagnóstico.',
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#08070b] pb-24">
      <UrbeLudoBanner />
      
      <Navbar />
      
      <Hero />
      
      <Services />
      <Process />
      <FAQ />
      <Contact />
      
      <Footer />
      <AIChat />
      <VoiceDiscussion />
    </main>
  );
}
