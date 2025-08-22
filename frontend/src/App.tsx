import { useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { LoadingScreen } from "./components/LoadingScreen";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Skills from "./pages/Skills/Skills";
import Contact from "./pages/Contact/Contact";

function App() {
  // Clear URL hash on load to ensure LoadingScreen always appears
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#08090F" }}>
      {/* Background Effects - Always Present */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {/* Glow radial left - red/pink in top-left corner */}
        <div 
          className="absolute -top-96 -left-96 h-[1200px] w-[1200px] rounded-full blur-3xl opacity-35"
          style={{
            background: "radial-gradient(closest-side, rgba(220,35,65,0.45), rgba(220,35,65,0) 70%)"
          }}
        />
        {/* Glow radial right - blue in bottom-right corner */}
        <div 
          className="absolute -bottom-96 -right-96 h-[1400px] w-[1400px] rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(closest-side, rgba(26,140,255,0.5), rgba(26,140,255,0) 70%)"
          }}
        />
        
      </div>

      {/* Fullpage Scroll - Always Present */}
      <ReactFullpage
        credits={{ enabled: false }}
        scrollingSpeed={700}
        navigation
        navigationPosition="right"
        showActiveTooltip
        anchors={["loading", "home", "about", "projects", "skills", "contact"]}
        navigationTooltips={["", "Home", "Sobre", "Projetos", "Skills", "Contato"]}
        recordHistory={false}
        sectionsColor={["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"]}
        onLeave={(origin, destination) => {
          // Prevent going back to loading screen (section 0)
          if (destination.index === 0 && origin.index > 0) {
            return false;
          }
          return true;
        }}
        render={({ fullpageApi }) => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LoadingScreen fullpageApi={fullpageApi} />
            </div>
            <div className="section">
              <Hero />
            </div>
            <div className="section">
              <About />
            </div>
            <div className="section">
              <Projects />
            </div>
            <div className="section">
              <Skills />
            </div>
            <div className="section">
              <Contact />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
      
    </div>
  )
}

export default App
