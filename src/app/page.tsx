import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Recognition } from "@/components/Recognition";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="relative z-[1]">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
