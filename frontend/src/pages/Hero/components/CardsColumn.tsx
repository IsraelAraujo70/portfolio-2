import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Title, Text } from "../../../components/typography";
import { Briefcase, GraduationCap, Code, Star, Calendar, Award } from "lucide-react";

export default function CardsColumn() {
  const technologies = [
    { name: "TypeScript", level: "Avançado", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { name: "React", level: "Avançado", color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
    { name: "Next.js", level: "Avançado", color: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    { name: "Python", level: "Avançado", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    { name: "PHP", level: "Avançado", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { name: "PostgreSQL", level: "Avançado", color: "bg-blue-600/10 text-blue-400 border-blue-600/20" },
    { name: "Angular", level: "Intermediário", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    { name: "Tailwind CSS", level: "Avançado", color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
  ];

  const experiences = [
    {
      company: "AdaSistemas",
      role: "Desenvolvedor Pleno",
      period: "05/2025 - Atualmente",
      type: "Coordenador de projeto",
      highlights: ["APIs seguras para sistemas bancários", "Testes E2E com Cypress", "Migração React", "Gestão de equipes"]
    },
    {
      company: "AdaSistemas",
      role: "Desenvolvedor Júnior",
      period: "01/2025 - 05/2025",
      type: "Desenvolvimento fullstack",
      highlights: ["AngularJS + PHP + PostgreSQL", "Implementação de testes E2E", "Metodologia ágil"]
    },
    {
      company: "Freelancer",
      role: "Desenvolvedor Front-end",
      period: "06/2023 - Atualmente",
      type: "Projetos autorais",
      highlights: ["React + TypeScript", "Integração APIs", "Testes unitários", "SSR/Next.js"]
    }
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-4 lg:gap-5 justify-center h-full py-2 md:py-0">
      {/* Experiência Profissional */}
      <Card className="glass bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Briefcase className="h-4 w-4 text-cyan-500" />
            Experiência Profissional
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-500/10 text-cyan-500 border-cyan-500/30">
              3+ anos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-cyan-500/30 pl-3 pb-2 last:pb-0">
              <div className="flex items-start justify-between mb-1">
                <Title as="h4" className="text-sm font-medium text-foreground-primary">
                  {exp.role} • {exp.company}
                </Title>
                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                  {exp.period.split(' - ')[1]}
                </Badge>
              </div>
              <Text className="text-xs text-foreground-secondary mb-1">
                {exp.type} • {exp.period}
              </Text>
              <div className="flex flex-wrap gap-1">
                {exp.highlights.map((highlight, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-cyan-500/5 text-cyan-400 border-cyan-500/20">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tecnologias */}
      <Card className="glass bg-gradient-to-br from-teal-500/5 to-green-500/5 border-teal-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Code className="h-4 w-4 text-teal-500" />
            Stack Tecnológico
            <Badge variant="outline" className="ml-auto text-xs bg-teal-500/10 text-teal-500 border-teal-500/30">
              <Star className="h-3 w-3 mr-1" />
              Fullstack
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-background/50 border border-foreground-tertiary/10">
                <Badge className={tech.color + " mb-1 text-xs"}>
                  {tech.name}
                </Badge>
                <Text className="text-xs text-foreground-tertiary">{tech.level}</Text>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formação */}
      <Card className="glass bg-gradient-to-br from-pink-500/5 to-purple-500/5 border-pink-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <GraduationCap className="h-4 w-4 text-pink-500" />
            Formação & Certificações
            <Badge variant="outline" className="ml-auto text-xs bg-pink-500/10 text-pink-500 border-pink-500/30">
              <Award className="h-3 w-3 mr-1" />
              3 cursos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-background/30 border border-foreground-tertiary/10">
            <Calendar className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
            <div>
              <Title as="h4" className="text-sm font-medium">Bacharelado Interdisciplinar em C&T</Title>
              <Text className="text-xs text-foreground-secondary">UNIFAL • 01/2022 – 12/2025</Text>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-background/30 border border-foreground-tertiary/10">
            <Calendar className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
            <div>
              <Title as="h4" className="text-sm font-medium">Desenvolvimento Full Stack Python</Title>
              <Text className="text-xs text-foreground-secondary">EBAC • 06/2024 – 02/2025</Text>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-background/30 border border-foreground-tertiary/10">
            <Calendar className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
            <div>
              <Title as="h4" className="text-sm font-medium">Engenharia de Software</Title>
              <Text className="text-xs text-foreground-secondary">UNINTER • Conclusão 01/2029</Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
