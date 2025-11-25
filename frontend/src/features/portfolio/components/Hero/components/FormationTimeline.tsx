import { Title, Text } from "@/shared/components/typography";
import { ChevronRight } from "lucide-react";

type Formation = {
  id: string;
  title: string;
  org: string;
  period: string;
};

// Ordem cronológica: mais antiga à esquerda, mais recente à direita
const FORMATIONS: Formation[] = [
  {
    id: "unifal-bict",
    title: "Bacharelado em C&T",
    org: "UNIFAL",
    period: "2022 – 2025",
  },
  {
    id: "ebac-fs-python",
    title: "Full Stack Python",
    org: "EBAC",
    period: "2024 – 2025",
  },
  {
    id: "uninter-es",
    title: "Engenharia de Software",
    org: "UNINTER",
    period: "06/2025 – 01/2029",
  },
];

export default function FormationTimeline() {
  return (
    <div className="w-full">
      {/* Linha com pontos (mesma grid da legenda para alinhar) */}
      <div className="relative mt-3 mb-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-foreground-tertiary/20" />
        <ChevronRight className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-tertiary/80" />
        <div className="relative z-10 grid grid-cols-3">
          {FORMATIONS.map((f) => (
            <div key={f.id} className="flex flex-col items-center select-none">
              <span className="h-4 w-4 rounded-full bg-accent-primary shadow ring-4 ring-accent-primary/30" />
              <span className="mt-2 text-[10px] sm:text-xs text-foreground-tertiary whitespace-nowrap">
                {f.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="grid grid-cols-3 gap-2">
        {FORMATIONS.map((f) => (
          <div key={f.id} className="text-center">
            <Title
              as="h6"
              className="text-[11px] sm:text-xs font-medium text-foreground-primary"
            >
              {f.title}
            </Title>
            <Text className="text-[10px] sm:text-xs text-foreground-secondary">
              {f.org}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
