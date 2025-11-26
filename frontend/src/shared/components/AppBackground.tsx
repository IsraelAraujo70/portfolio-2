import type { ReactNode } from "react";

export function AppBackground({ children }: { children: ReactNode }) {
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
