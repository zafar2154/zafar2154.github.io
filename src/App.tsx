import About from "./components/About";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Nav from "./components/Nav";
import SkillsEducation from "./components/SkillsEducation";

function App() {
  return (
    <div className="min-h-screen bg-circuit-bg">
      <Nav />
      <main>
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
