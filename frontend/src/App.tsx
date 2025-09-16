import { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { LoadingScreen } from "./components/LoadingScreen";
import Hero from "./pages/Hero/Hero";
import Projects from "./pages/Projects/Projects";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact/Contact";
import Sidebar from "./components/Sidebar/Sidebar";
import type { FullpageApi } from "./components/types";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullpageApi, setFullpageApi] = useState<FullpageApi | null | undefined>(null);

  // Clear URL hash on load to ensure LoadingScreen always appears
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#08090F" }} className="min-h-screen">
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

      {/* Sidebar */}
      <Sidebar fullpageApi={fullpageApi} visible={activeIndex >= 2} />

      {/* Fullpage Scroll - Always Present */}
      <ReactFullpage
        licenseKey="gplv3-license"
        credits={{ enabled: false }}
        scrollingSpeed={700}
        navigation
        navigationPosition="right"
        showActiveTooltip
        anchors={["loading", "home", "projects", "chat", "contact"]}
        navigationTooltips={["", "Home", "Projetos", "Chat", "Contato"]}
        recordHistory={false}
        sectionsColor={["transparent", "transparent", "transparent", "transparent", "transparent"]}
        onLeave={(origin, destination) => {
          // Prevent going back to loading screen (section 0)
          if (destination.index === 0 && origin.index > 0) {
            return false;
          }
          return true;
        }}
        afterLoad={(_origin, destination) => {
          // destination.index is 0-based
          setActiveIndex(destination.index);
        }}
        render={({ fullpageApi: api }) => {
          // Store the API for use in the outside Sidebar
          if (api !== fullpageApi) {
            setFullpageApi(api);
          }
          return (
            <ReactFullpage.Wrapper>
              <div className="section h-screen">
                <LoadingScreen fullpageApi={api} />
              </div>
              <div className="section h-screen">
                <Hero />
              </div>
              <div className="section h-screen">
                <Projects />
              </div>
              <div className="section h-screen">
                <Chat />
              </div>
              <div className="section h-screen">
                <Contact />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
      
    </div>
  )
}

export default App
