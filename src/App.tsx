import About from "./components/About";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Nav from "./components/Nav";
import SkillsEducation from "./components/SkillsEducation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { setupHeroToAbout } from "../src/animations/pages/sectionTransition";


gsap.registerPlugin(ScrollTrigger);

function App() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      setupHeroToAbout();
    }, pageRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className="min-h-screen bg-circuit-bg">
      <Nav />
      <main ref={pageRef}>
        <Hero />
        <About />
        <Experience />
        <Journey />
        <Achievements />
        <SkillsEducation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
