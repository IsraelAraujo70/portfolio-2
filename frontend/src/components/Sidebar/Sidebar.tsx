import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Home, MessageSquareText, X } from "lucide-react";
import GlassCard from "../GlassCard";
import type { SidebarProps, SidebarItem } from "../types";

export default function Sidebar({ fullpageApi, visible }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const items: SidebarItem[] = useMemo(
    () => [
      { key: "home", label: "Home", icon: Home },
      { key: "projects", label: "Projects", icon: Code2 },
      { key: "contact", label: "Contact", icon: MessageSquareText },
    ],
    []
  );

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
          </GlassCard>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
