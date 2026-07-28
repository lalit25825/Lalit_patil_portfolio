import Loader from "@/components/Loader";
import Background, { ScrollProgress } from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechOrbit from "@/components/TechOrbit";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Background />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechOrbit />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
