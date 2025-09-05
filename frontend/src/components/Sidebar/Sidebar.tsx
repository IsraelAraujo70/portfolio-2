import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Home, MessageSquareText } from "lucide-react";
import GlassCard from "../GlassCard";
import type { SidebarProps, SidebarItem } from "../types";

export default function Sidebar({ fullpageApi, visible }: SidebarProps) {
  const items: SidebarItem[] = useMemo(
    () => [
      { key: "home", label: "Home", icon: Home },
      { key: "projects", label: "Projects", icon: Code2 },
      { key: "contact", label: "Contact", icon: MessageSquareText },
    ],
    []
  );

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
