import Achievements from "./components/Achievements";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import SkillsEducation from "./components/SkillsEducation";

function App() {
  return (
    <div className="relative isolate min-h-screen bg-circuit-bg overflow-x-clip">
      <Background />
      <Nav />
      <main>
        <Hero />
        <Projects />
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
