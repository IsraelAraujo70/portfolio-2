import InfoCard from "./InfoCard";

export default function CardsColumn() {
  return (
    <div className="flex flex-col gap-6 sm:gap-6 md:gap-8 lg:gap-10 justify-center h-full py-4 md:py-0">
      <InfoCard
        accent="cyan"
        title="Experiência"
        description="Desenvolvedor em constante evolução, construindo produtos e soluções."
      />
      <InfoCard
        accent="pink"
        title="Formação"
        description="Onde estudei e desenvolvi minha base sólida em tecnologia."
      />
      <InfoCard
        accent="teal"
        title="Tecnologias"
        description="Python, React, TypeScript, Tailwind, APIs e mais."
      />
    </div>
  );
}
