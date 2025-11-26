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
      <div className="mt-3 mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-foreground-tertiary/25" />
          <div className="relative z-10 grid grid-cols-3 items-center px-1 h-10">
            {FORMATIONS.map((f) => (
              <div
                key={f.id}
                className="flex flex-col items-center select-none"
              >
                <span className="h-4 w-4 rounded-full bg-accent-primary shadow ring-4 ring-accent-primary/30" />
              </div>
            ))}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-foreground-tertiary/80" />
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
            <Text className="text-[10px] sm:text-xs text-foreground-tertiary">
              {f.period}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
