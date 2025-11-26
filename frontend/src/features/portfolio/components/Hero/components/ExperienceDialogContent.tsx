import { Title, Text, List, ListItem } from "@/shared/components/typography";
import GlassCard from "@/shared/components/GlassCard";
import { Badge } from "@/shared/components/ui/badge";

const CARD_CLASS =
  "rounded-xl p-4 sm:p-5 glass-hover bg-gradient-to-br from-background-secondary/90 via-background-secondary/80 to-background-tertiary/60 border border-foreground-tertiary/25 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)]";

export default function ExperienceDialogContent() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Garantia BR - Python Pleno */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start gap-3 sm:gap-4 justify-between">
            <div className="space-y-1">
              <Title
                as="h4"
                className="text-base sm:text-lg text-foreground-primary font-semibold"
              >
                Garantia BR (Remoto)
              </Title>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs bg-emerald-500/15 text-emerald-200 border-emerald-200/40"
              >
                Produtos Core + IA
              </Badge>
            </div>
            <Text className="text-[11px] sm:text-xs text-foreground-secondary font-medium">
              06/2025 - Atual
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text className="text-sm sm:text-base text-foreground-primary font-semibold">
              Desenvolvedor Python Pleno
            </Text>
            <Text className="text-[11px] sm:text-xs text-foreground-tertiary uppercase tracking-wide">
              Serverless Framework • AWS Lambda/SQS/Events • Hexagonal
            </Text>
          </div>
          <List
            as="ul"
            size="sm"
            className="mt-1 [&>*]:text-foreground-secondary"
          >
            <ListItem>
              Agente no time de Produtos Core + IA, entregando microserviços
              serverless em AWS.
            </ListItem>
            <ListItem>
              Arquitetura hexagonal com testes unitários cobrindo camadas de
              domínio e adapters.
            </ListItem>
            <ListItem>
              Integrações assíncronas com SQS, CloudWatch Events e pipelines de
              observabilidade.
            </ListItem>
            <ListItem>
              Colaboração com um time maior (code review, pareamento e
              documentação contínua).
            </ListItem>
          </List>
        </div>
      </GlassCard>

      {/* AdaSistemas - Pleno */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start gap-3 sm:gap-4 justify-between">
            <div className="space-y-1">
              <Title
                as="h4"
                className="text-base sm:text-lg text-foreground-primary font-semibold"
              >
                AdaSistemas (Poços de Caldas/MG)
              </Title>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs bg-cyan-500/15 text-cyan-300 border-cyan-300/40"
              >
                Empresa
              </Badge>
            </div>
            <Text className="text-[11px] sm:text-xs text-foreground-secondary font-medium">
              05/2025 - Atualmente
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text className="text-sm sm:text-base text-foreground-primary font-semibold">
              Desenvolvedor Pleno (coord. de projeto)
            </Text>
            <Text className="text-[11px] sm:text-xs text-foreground-tertiary uppercase tracking-wide">
              AngularJS • PHP • PostgreSQL • Liderança técnica
            </Text>
          </div>
          <List
            as="ul"
            size="sm"
            className="mt-1 [&>*]:text-foreground-secondary"
          >
            <ListItem>
              Fullstack com foco em performance, integração e automação.
            </ListItem>
            <ListItem>
              Testes E2E com Cypress e APIs seguras (compliance, dados
              sensíveis).
            </ListItem>
            <ListItem>
              Automação com MCP + IA e liderança técnica na migração para React.
            </ListItem>
          </List>
        </div>
      </GlassCard>

      {/* AdaSistemas - Júnior */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start gap-3 sm:gap-4 justify-between">
            <div className="space-y-1">
              <Title
                as="h4"
                className="text-base sm:text-lg text-foreground-primary font-semibold"
              >
                AdaSistemas (Poços de Caldas/MG)
              </Title>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs bg-cyan-500/15 text-cyan-300 border-cyan-300/40"
              >
                Empresa
              </Badge>
            </div>
            <Text className="text-[11px] sm:text-xs text-foreground-secondary font-medium">
              01/2025 - 05/2025
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text className="text-sm sm:text-base text-foreground-primary font-semibold">
              Desenvolvedor Júnior
            </Text>
            <Text className="text-[11px] sm:text-xs text-foreground-tertiary uppercase tracking-wide">
              AngularJS • PHP • PostgreSQL • Cypress
            </Text>
          </div>
          <List
            as="ul"
            size="sm"
            className="mt-1 [&>*]:text-foreground-secondary"
          >
            <ListItem>Entregas ponta a ponta e evolução do produto.</ListItem>
            <ListItem>Implantação de E2E com Cypress.</ListItem>
            <ListItem>
              Rotina ágil: sprints, revisão e ajustes contínuos.
            </ListItem>
          </List>
        </div>
      </GlassCard>

      {/* Freelancer Front-end */}
      <GlassCard className={CARD_CLASS}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start gap-3 sm:gap-4 justify-between">
            <div className="space-y-1">
              <Title
                as="h4"
                className="text-base sm:text-lg text-foreground-primary font-semibold"
              >
                Freelancer front-end (Poços de Caldas/MG)
              </Title>
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs bg-amber-400/15 text-amber-200 border-amber-200/40"
              >
                Autônomo
              </Badge>
            </div>
            <Text className="text-[11px] sm:text-xs text-foreground-secondary font-medium text-right">
              06/2023 - Atualmente
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text className="text-sm sm:text-base text-foreground-primary font-semibold">
              Desenvolvedor Front end
            </Text>
            <Text className="text-[11px] sm:text-xs text-foreground-tertiary uppercase tracking-wide">
              React • TypeScript • UX • SSR
            </Text>
          </div>
          <List
            as="ul"
            size="sm"
            className="mt-1 [&>*]:text-foreground-secondary"
          >
            <ListItem>
              Projetos React + TypeScript com foco em UX e arquitetura.
            </ListItem>
            <ListItem>Integrações com APIs e testes (Jest/RTL).</ListItem>
            <ListItem>Estudos contínuos: Next.js, SSR e performance.</ListItem>
          </List>
        </div>
      </GlassCard>
    </div>
  );
}
