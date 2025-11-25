import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Home, LogIn, LogOut, MessageCircle, MessageSquareText, UserCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../GlassCard";
import type { SidebarProps, SidebarItem } from "../types";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar({ fullpageApi, visible }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  
  const items: SidebarItem[] = useMemo(
    () => [
      { key: "home", label: "Home", icon: Home },
      { key: "projects", label: "Projects", icon: Code2 },
      { key: "chat", label: "Chat", icon: MessageCircle },
      { key: "contact", label: "Contact", icon: MessageSquareText },
    ],
    []
  );

  const handleAuthNavigate = () => {
    if (user) {
      logout();
      navigate("/", { replace: true });
      fullpageApi?.moveTo?.("home");
    } else {
      navigate("/login", { state: { from: "/#chat" } });
    }
    setIsMobileMenuOpen(false);
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile menu item click
  const handleMobileItemClick = (key: string) => {
    fullpageApi?.moveTo?.(key);
    setIsMobileMenuOpen(false);
  };

  // Mobile toggle button
  if (isMobile && visible) {
    return (
      <>
        {/* Mobile toggle button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-3 rounded-xl backdrop-blur-md bg-black/20 border border-white/10 cursor-pointer hover:bg-black/30 transition-colors"
        >
          <Code2 className="text-white/90" size={24} />
        </motion.button>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              
              {/* Mobile sidebar */}
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 w-64 z-50"
              >
                <GlassCard hover={false} className="h-full w-full rounded-r-2xl flex flex-col py-6 px-4">
                  {/* Mobile Header with close button */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Code2 className="text-white/90" size={26} />
                      <div className="text-sm font-semibold tracking-wide bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                        Israel <span className="text-[#23A8BF]">&lt;dev&gt;</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="text-white/90" size={20} />
                    </button>
                  </div>

                  {/* Mobile navigation */}
                  <nav className="flex-1 flex flex-col gap-4">
                    {items.map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleMobileItemClick(key)}
                        className="flex items-center gap-4 p-4 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      >
                        <Icon size={24} />
                        <span className="text-base font-medium tracking-wide hover:text-cyan-400 transition-colors duration-300">
                          {label}
                        </span>
                      </button>
                    ))}
                  </nav>
                  <div className="pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleAuthNavigate}
                      className="w-full flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-white/90 hover:bg-white/10 transition-all"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3">
                        {user ? <UserCircle2 size={24} /> : <LogIn size={24} />}
                        <div className="text-left">
                          <span className="text-sm font-medium block">
                            {user ? user.name : "Entrar"}
                          </span>
                          <span className="text-xs text-white/60 block">
                            {user ? "Sair da conta" : "Acessar para conversar"}
                          </span>
                        </div>
                      </div>
                      {user ? <LogOut size={18} /> : null}
                    </button>
                  </div>
                </GlassCard>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar (unchanged)
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="group fixed left-3 top-3 bottom-3 z-50"
        >
          <GlassCard hover={false} className="h-full w-14 group-hover:w-56 transition-all duration-300 ease-out rounded-2xl flex flex-col py-4">
            {/* Brand - Fixed at top */}
            <div className="flex items-center justify-center group-hover:justify-start gap-3 px-3 group-hover:px-4 transition-all duration-300">
              <Code2 className="text-white/90" size={26} />
              <div className="hidden group-hover:block transition-all duration-300 select-none overflow-hidden">
                <div className="text-sm font-semibold tracking-wide whitespace-nowrap bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">Israel <span className="text-[#23A8BF]">&lt;dev&gt;</span></div>
              </div>
            </div>

            {/* Nav - Centered vertically */}
            <nav className="flex-1 flex flex-col justify-center gap-5">
              {items.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => fullpageApi?.moveTo?.(key)}
                  className="flex items-center justify-center group-hover:justify-start gap-4 text-white/90 hover:text-white transition-all duration-300 px-3 group-hover:px-4 cursor-pointer"
                >
                  <Icon size={24} className="shrink-0" />
                  <span className="hidden group-hover:block text-base font-medium tracking-wide whitespace-nowrap overflow-hidden transition-colors duration-300 text-white hover:text-cyan-400">
                    {label}
                  </span>
                </button>
              ))}
            </nav>
            <div className="px-3 group-hover:px-4 pb-2">
              <button
                type="button"
                onClick={handleAuthNavigate}
                className="w-full flex items-center justify-center group-hover:justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-white/90 hover:bg-white/10 transition-all"
                disabled={isLoading}
              >
                <span className="flex items-center justify-center rounded-xl bg-white/10 p-2">
                  {user ? <UserCircle2 size={20} className="text-white" /> : <LogIn size={20} className="text-white" />}
                </span>
                <div className="hidden group-hover:flex flex-1 flex-col items-start overflow-hidden">
                  <span className="text-sm font-medium text-white truncate">
                    {user ? user.name : "Entrar"}
                  </span>
                  <span className="text-xs text-white/60 truncate">
                    {user ? user.email : "Acessar para conversar"}
                  </span>
                </div>
                {user ? (
                  <LogOut size={18} className="hidden group-hover:block text-white/80" />
                ) : null}
              </button>
            </div>
          </GlassCard>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
