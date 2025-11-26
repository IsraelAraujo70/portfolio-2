import { Title, Text } from "@/shared/components/typography";
import { ChevronRight } from "lucide-react";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  details: { heading: string; items: string[] }[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "garantia-br",
    role: "Dev Python Pleno",
    company: "Garantia BR",
    period: "06/2025 – Atual",
    details: [
      {
        heading: "Resumo",
        items: ["Produtos Core + IA, microserviços serverless"],
      },
    ],
  },
  {
    id: "freelancer",
    role: "Desenvolvedor Front-end",
    company: "Freelancer",
    period: "06/2023 – Atual",
    details: [{ heading: "Resumo", items: ["React + TypeScript, UX e SSR"] }],
  },
  {
    id: "adasistemas-junior",
    role: "Desenvolvedor Júnior",
    company: "AdaSistemas",
    period: "01/2025 – 05/2025",
    details: [{ heading: "Resumo", items: ["Entregas ponta a ponta e E2E"] }],
  },
  {
    id: "adasistemas-pleno",
    role: "Desenvolvedor Pleno",
    company: "AdaSistemas",
    period: "05/2025 – Atual",
    details: [
      {
        heading: "Resumo",
        items: ["Fullstack, E2E e liderança técnica"],
      },
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="w-full">
      {/* Linha com pontos (usar mesma grid da legenda para alinhar) */}
      <div className="mt-3 mb-5 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-1">
          <ChevronRight className="h-4 w-4 text-foreground-tertiary/80" />
        </div>
        <div className="relative flex-1 h-10 pr-6">
          <div className="absolute left-0 right-6 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-foreground-tertiary/25" />
          <div className="relative z-10 grid grid-cols-4 h-full items-center px-1">
            {EXPERIENCES.map((xp) => (
              <div
                key={xp.id}
                className="flex flex-col items-center select-none"
              >
                <span className="h-4 w-4 rounded-full bg-accent-primary shadow ring-4 ring-accent-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legenda abaixo da linha (rótulos completos) */}
      <div className="grid grid-cols-4 gap-2 items-start pr-6">
        {EXPERIENCES.map((xp) => (
          <div key={xp.id} className="text-center flex flex-col items-center">
            <Title
              as="h6"
              className="text-[11px] sm:text-xs font-medium text-foreground-primary"
            >
              {xp.role}
            </Title>
            <Text className="text-[10px] sm:text-xs text-foreground-secondary">
              {xp.company}
            </Text>
            <Text className="text-[10px] sm:text-xs text-foreground-tertiary">
              {xp.role.split(" ")[0]}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
