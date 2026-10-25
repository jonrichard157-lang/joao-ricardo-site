import { Benefits } from "./components/Benefits";
import { Differentials } from "./components/Differentials";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { DemoBanner, Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MobileBar } from "./components/MobileBar";
import { Plans } from "./components/Plans";
import { Structure } from "./components/Structure";
import { Testimonials } from "./components/Testimonials";
import { Visit } from "./components/Visit";
import { WhatsAppProvider } from "./whatsapp";

export default function App() {
  return (
    <WhatsAppProvider>
      <a href="#conteudo" className="sr-only z-50 rounded-full bg-cobalt px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <Header />
      <main id="conteudo">
        <Hero />
        <Benefits />
        <Structure />
        <Plans />
        <Differentials />
        <Testimonials />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </WhatsAppProvider>
  );
}
