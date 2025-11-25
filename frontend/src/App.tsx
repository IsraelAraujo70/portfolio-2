import { useMemo, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AppBackground } from "@/shared/components/AppBackground";
import Text from "@/shared/components/typography/Text";

// Pages
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { LoginPage, SignupPage } from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

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
