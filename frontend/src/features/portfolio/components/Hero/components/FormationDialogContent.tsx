import { Title, Text, List, ListItem } from "@/shared/components/typography";
import GlassCard from "@/shared/components/GlassCard";

export default function FormationDialogContent() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* UNINTER */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <Title
            as="h4"
            className="text-sm sm:text-base text-foreground-primary font-semibold"
          >
            Engenharia de Software
          </Title>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">
            06/2025 – 01/2029
          </Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">
          UNINTER
        </Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>Formação de longa duração com foco em engenharia.</ListItem>
          <ListItem>
            Arquitetura de software, padrões e práticas modernas.
          </ListItem>
        </List>
      </GlassCard>

      {/* UNIFAL */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <Title
            as="h4"
            className="text-sm sm:text-base text-foreground-primary font-semibold"
          >
            Bacharelado em Ciências e Tecnologia
          </Title>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">
            2022 – 2025
          </Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">
          UNIFAL
        </Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>
            Base sólida em fundamentos de computação e engenharia.
          </ListItem>
          <ListItem>
            Projetos acadêmicos com foco em resolução de problemas.
          </ListItem>
        </List>
      </GlassCard>

      {/* EBAC */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <Title
            as="h4"
            className="text-sm sm:text-base text-foreground-primary font-semibold"
          >
            Full Stack Python
          </Title>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">
            2024 – 2025
          </Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">
          EBAC
        </Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>APIs, testes e boas práticas em Python.</ListItem>
          <ListItem>Integração com front-end e deploy.</ListItem>
        </List>
      </GlassCard>
    </div>
  );
}
