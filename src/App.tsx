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
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-circuit-bg overflow-x-clip  ">
      <Nav />
      <main ref={pageRef}>
        <Hero />
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
