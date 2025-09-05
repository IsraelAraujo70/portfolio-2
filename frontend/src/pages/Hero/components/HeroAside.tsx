import { Title, Text, Inline } from "../../../components/typography";
import GlassCard from "../../../components/GlassCard";

export default function HeroAside() {
  return (
    <aside className="h-auto md:h-full flex items-center">
      <GlassCard
        hover={false}
        className="w-full h-auto md:h-full rounded-xl sm:rounded-2xl md:rounded-r-2xl md:rounded-l-none px-6 sm:px-8 md:pl-0 md:pr-8 lg:pr-10 py-8 sm:py-10 md:py-16 lg:py-20 flex md:items-start md:justify-start items-center"
      >
        <div className="flex items-start gap-6 sm:gap-6 md:gap-8 md:mt-8 lg:mt-12">
          <img
            src="/profile-picture.png"
            alt="Foto de perfil"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36 rounded-full object-cover flex-shrink-0"
          />
          <div className="leading-snug">
            <Title as="h2" className="leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Israel Araújo de Oliveira
            </Title>
            <Text className="mt-2 sm:mt-2 md:mt-3 text-[#c9d6e1] text-sm md:text-lg">Developer FullStack Python</Text>
            <Inline as="span" className="text-[#a7b8c6] text-xs sm:text-sm md:text-base">
              20 years old | Brazilian
            </Inline>
          </div>
        </div>
      </GlassCard>
    </aside>
  );
}
