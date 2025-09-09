import { Title, Text, List, ListItem } from "@/components/typography";
import GlassCard from "../../../components/GlassCard";
import { Badge } from "@/components/ui/badge";

export default function ExperienceDialogContent() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* AdaSistemas - Pleno */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <div>
            <Title as="h4" className="text-sm sm:text-base text-foreground-primary font-semibold">
              AdaSistemas (Poços de Caldas/MG)
            </Title>
            <div className="mt-1">
              <Badge variant="outline" className="text-[10px] sm:text-xs bg-accent-primary/10 text-accent-primary border-accent-primary/30">Empresa</Badge>
            </div>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">05/2025 - Atualmente</Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">
          Desenvolvedor Pleno (coord. de projeto)
        </Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>
            Fullstack: AngularJS • PHP • PostgreSQL, com foco em performance e integração.
          </ListItem>
          <ListItem>
            Testes E2E com Cypress e APIs seguras (compliance, dados sensíveis).
          </ListItem>
          <ListItem>
            Automação com MCP + IA e liderança técnica na migração para React.
          </ListItem>
        </List>
      </GlassCard>

      {/* AdaSistemas - Júnior */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <div>
            <Title as="h4" className="text-sm sm:text-base text-foreground-primary font-semibold">
              AdaSistemas (Poços de Caldas/MG)
            </Title>
            <div className="mt-1">
              <Badge variant="outline" className="text-[10px] sm:text-xs bg-accent-primary/10 text-accent-primary border-accent-primary/30">Empresa</Badge>
            </div>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">01/2025 - 05/2025</Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">Desenvolvedor Júnior</Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>AngularJS • PHP • PostgreSQL, entregas ponta a ponta.</ListItem>
          <ListItem>Implantação de E2E com Cypress.</ListItem>
          <ListItem>Rotina ágil: sprints, revisão e ajustes contínuos.</ListItem>
        </List>
      </GlassCard>

      {/* Freelancer Front-end */}
      <GlassCard className="rounded-lg p-4 sm:p-5 glass-hover">
        <div className="flex items-start justify-between">
          <div>
            <Title as="h4" className="text-sm sm:text-base text-foreground-primary font-semibold">
              Freelancer front-end (Poços de Caldas/MG)
            </Title>
            <div className="mt-1">
              <Badge variant="outline" className="text-[10px] sm:text-xs bg-accent-primary/10 text-accent-primary border-accent-primary/30">Autônomo</Badge>
            </div>
          </div>
          <Text className="text-[11px] sm:text-xs text-foreground-secondary">06/2023 - Atualmente</Text>
        </div>
        <Text className="mt-2 text-xs sm:text-sm text-foreground-primary font-medium">Desenvolvedor Front end</Text>
        <List as="ul" size="sm" className="mt-2">
          <ListItem>Projetos React + TypeScript com foco em UX e arquitetura.</ListItem>
          <ListItem>Integrações com APIs e testes (Jest/RTL).</ListItem>
          <ListItem>Estudos contínuos: Next.js, SSR e performance.</ListItem>
        </List>
      </GlassCard>
    </div>
  );
}
