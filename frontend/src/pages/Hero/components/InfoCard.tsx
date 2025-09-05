import GlassCard from "../../../components/GlassCard";
import { Title, Text } from "../../../components/typography";
import type { InfoCardProps } from "../types";

const gradientByAccent: Record<NonNullable<InfoCardProps["accent"]>, string> = {
  cyan: "linear-gradient(135deg, rgba(80,200,255,0.6), rgba(160,220,255,0.35))",
  pink: "linear-gradient(135deg, rgba(255,120,170,0.65), rgba(255,200,220,0.35))",
  teal: "linear-gradient(135deg, rgba(19,231,171,0.6), rgba(35,168,191,0.4))",
};

export default function InfoCard({ title, description, accent = "cyan" }: InfoCardProps) {
  const gradient = gradientByAccent[accent];

  return (
    <div className="relative">
      {/* Gradient outline that respects `accent` */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: gradient,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "3px",
          borderRadius: "1rem",
        }}
      />

      <GlassCard hover className="rounded-2xl p-6 sm:p-6 md:p-8 lg:p-10 min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
        <div className="h-full w-full">
          <Title as="h3" className="mb-2">
            {title}
          </Title>
          <Text as="p">{description}</Text>
        </div>
      </GlassCard>
    </div>
  );
}
