import AboutMe from "./components/AboutMe/AboutMe";
import CoolPeople from "./components/CoolPeople/CoolPeople";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainCard from "./components/MainCard/MainCard";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Terminal from "./components/Terminal/Terminal";
import { Webring } from "./components/Webring/Webring";

const OLD_DOMAIN = "caelondev.is-a.dev"; // stabring still uses my old subdomain

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <MainCard />
        <AboutMe id="about" />
        <Terminal id="terminal" />
        <Skills id="skills" />
        <Projects id="projects" />
        <CoolPeople id="cool-people" />
      </main>
      <Webring
        prev={`https://ring.stabbed.me/prev/from/${OLD_DOMAIN}`}
        next={`https://ring.stabbed.me/next/from/${OLD_DOMAIN}`}
      />
      <Footer />
    </>
  );
}

export default App;
