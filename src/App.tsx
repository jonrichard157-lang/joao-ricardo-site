import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Demos } from "./components/Demos";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-forest px-5 py-3 font-display text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Services />
        <Demos />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
