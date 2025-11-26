import { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { LoadingScreen } from "@/shared/components/LoadingScreen";
import { AppBackground } from "@/shared/components/AppBackground";
import Hero from "@/features/portfolio/components/Hero/Hero";
import Projects from "@/features/portfolio/components/Projects/Projects";
import Contact from "@/features/portfolio/components/Contact/Contact";
import Sidebar from "@/features/portfolio/components/Sidebar/Sidebar";
import Chat from "@/features/chat/components/Chat";
import type { FullpageApi } from "@/shared/components/types";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullpageApi, setFullpageApi] = useState<
    FullpageApi | null | undefined
  >(null);

  // Clear URL hash on load to ensure LoadingScreen always appears
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#chat") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <AppBackground>
      <Sidebar fullpageApi={fullpageApi} visible={activeIndex >= 2} />
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
        sectionsColor={[
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ]}
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
    </AppBackground>
  );
}
