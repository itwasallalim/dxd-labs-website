import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Mission from "./components/Mission";
import Pillars from "./components/Pillars";
import NeuronsThink from "./components/NeuronsThink";
import News from "./components/News";
import Team from "./components/Team";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <Pillars />
      <NeuronsThink />
      <News />
      <Team />
      <Publications />
      <Projects />
      <Footer />
    </main>
  );
}
