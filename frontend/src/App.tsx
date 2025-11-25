import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import { LoadingScreen } from "./components/LoadingScreen";
import Hero from "./pages/Hero/Hero";
import Projects from "./pages/Projects/Projects";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact/Contact";
import Sidebar from "./components/Sidebar/Sidebar";
import type { FullpageApi } from "./components/types";
import { LoginPage, SignupPage } from "./pages/Auth";
import { useAuth } from "./hooks/useAuth";
import Text from "./components/typography/Text";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingExperience />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <StandaloneChat />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

function LandingExperience() {
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

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, token, isLoading } = useAuth();
  const location = useLocation();

  const loadingView = useMemo(
    () => (
      <AppBackground>
        <div className="min-h-screen flex items-center justify-center">
          <Text as="div" className="text-base text-white/80">
            Carregando sessão...
          </Text>
        </div>
      </AppBackground>
    ),
    [],
  );

  if (isLoading && !user) {
    return loadingView;
  }

  if (!user || !token) {
    const target =
      location.pathname === "/chat"
        ? "/#chat"
        : `${location.pathname}${location.hash ?? ""}` || "/#chat";
    return <Navigate to="/login" replace state={{ from: target }} />;
  }

  return <>{children}</>;
}

function StandaloneChat() {
  return (
    <AppBackground>
      <Chat />
    </AppBackground>
  );
}

function AppBackground({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ backgroundColor: "#08090F" }}
      className="min-h-screen w-full relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-96 -left-96 h-[1200px] w-[1200px] rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(closest-side, rgba(220,35,65,0.45), rgba(220,35,65,0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-96 -right-96 h-[1400px] w-[1400px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(26,140,255,0.5), rgba(26,140,255,0) 70%)",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
