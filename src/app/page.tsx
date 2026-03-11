
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
import { TrustedBy } from "@/components/sections/TrustedBy";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#08070b] pb-24">
      <UrbeLudoBanner />
      
      <Navbar />
      
      <Hero />
      
      {/* Prova Social Estratégica: Antes do título "Como podemos ajudar" */}
      <div className="py-8 md:py-16">
        <TrustedBy />
      </div>

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
