import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Pillars from "./components/Pillars";
import NeuronsThink from "./components/NeuronsThink";
import Team from "./components/Team";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Mission />
      <Pillars />
      <NeuronsThink />
      <Team />
      <Publications />
      <Projects />
      <Footer />
    </main>
  );
}
