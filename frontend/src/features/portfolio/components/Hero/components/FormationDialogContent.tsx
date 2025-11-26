import { Title, Text, List, ListItem } from "@/shared/components/typography";
import GlassCard from "@/shared/components/GlassCard";

const CARD_CLASS =
  "rounded-xl p-4 sm:p-5 glass-hover bg-gradient-to-br from-background-secondary/90 via-background-secondary/80 to-background-tertiary/60 border border-foreground-tertiary/25 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)]";

export default function FormationDialogContent() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* UNINTER */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Title
              as="h4"
              className="text-base sm:text-lg text-foreground-primary font-semibold"
            >
              Engenharia de Software
            </Title>
            <Text className="text-xs text-foreground-secondary font-medium">
              UNINTER
            </Text>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-tertiary font-medium">
            06/2025 – 01/2029
          </Text>
        </div>
        <List
          as="ul"
          size="sm"
          className="mt-2 [&>*]:text-foreground-secondary"
        >
          <ListItem>Formação de longa duração com foco em engenharia.</ListItem>
          <ListItem>
            Arquitetura de software, padrões e práticas modernas.
          </ListItem>
        </List>
      </GlassCard>

      {/* UNIFAL */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Title
              as="h4"
              className="text-base sm:text-lg text-foreground-primary font-semibold"
            >
              Bacharelado em Ciências e Tecnologia
            </Title>
            <Text className="text-xs text-foreground-secondary font-medium">
              UNIFAL
            </Text>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-tertiary font-medium">
            2022 – 2025
          </Text>
        </div>
        <List
          as="ul"
          size="sm"
          className="mt-2 [&>*]:text-foreground-secondary"
        >
          <ListItem>
            Base sólida em fundamentos de computação e engenharia.
          </ListItem>
          <ListItem>
            Projetos acadêmicos com foco em resolução de problemas.
          </ListItem>
        </List>
      </GlassCard>

      {/* EBAC */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Title
              as="h4"
              className="text-base sm:text-lg text-foreground-primary font-semibold"
            >
              Full Stack Python
            </Title>
            <Text className="text-xs text-foreground-secondary font-medium">
              EBAC
            </Text>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-tertiary font-medium">
            2024 – 2025
          </Text>
        </div>
        <List
          as="ul"
          size="sm"
          className="mt-2 [&>*]:text-foreground-secondary"
        >
          <ListItem>APIs, testes e boas práticas em Python.</ListItem>
          <ListItem>Integração com front-end e deploy.</ListItem>
        </List>
      </GlassCard>
    </div>
  );
}
