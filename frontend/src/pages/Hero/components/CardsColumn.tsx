import { CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Title} from "../../../components/typography";
import ExperienceTimeline from "./ExperienceTimeline";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import TechCarousel from "./TechCarousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ExperienceDialogContent from "./ExperienceDialogContent";
import { useExperience } from "../../../hooks/useExperience";
import FormationTimeline from "./FormationTimeline";
import FormationDialogContent from "./FormationDialogContent";
import AccentCard from "@/components/AccentCard";

export default function CardsColumn() {
  const experience = useExperience("2023-06-01");
  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center h-full py-2 md:py-0 w-full max-w-3xl mx-auto">
      {/* Experiência Profissional */}
      <Dialog>
        <DialogTrigger asChild>
          <AccentCard accent="cyan" className="relative overflow-hidden cursor-pointer">
            <CardHeader className="pb-3">
              <Title as="h3" className="flex items-center gap-2 text-sm md:text-base text-foreground-primary font-medium">
                <Briefcase className="h-4 w-4 text-cyan-400" />
                Experiência
                <Badge variant="outline" className="ml-auto text-xs bg-accent-primary/10 text-accent-primary border-accent-primary/30">
                  {experience.label}
                </Badge>
              </Title>
            </CardHeader>
            <CardContent className="pt-0">
              <ExperienceTimeline />
            </CardContent>
          </AccentCard>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0 glass rounded-2xl bg-background/70 border-foreground-tertiary/20">
          <DialogHeader className="sticky top-0 z-10 backdrop-blur-md bg-background/80 px-6 sm:px-8 py-5 border-b border-foreground-tertiary/10">
            <DialogTitle>
              <Title as="h3" className="text-base sm:text-lg text-foreground-primary">Experiências</Title>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 sm:px-8 py-6">
            <ExperienceDialogContent />
          </div>
        </DialogContent>
      </Dialog>

      {/* Stack Tecnológico */}
      <AccentCard accent="teal">
        <CardHeader className="pb-3">
          <Title as="h3" className="flex items-center gap-2 text-sm md:text-base text-foreground-primary font-medium">
            <Code className="h-4 w-4 text-teal-400" />
            Tecnologias
          </Title>
        </CardHeader>
        <CardContent className="pt-0">
          <TechCarousel />
        </CardContent>
      </AccentCard>

      {/* Formação (com Dialog + Timeline) */}
      <Dialog>
        <DialogTrigger asChild>
          <AccentCard accent="pink" className="relative overflow-hidden cursor-pointer">
            <CardHeader className="pb-3">
              <Title as="h3" className="flex items-center gap-2 text-sm md:text-base text-foreground-primary font-medium">
                <GraduationCap className="h-4 w-4 text-pink-400" />
                Formação
              </Title>
            </CardHeader>
            <CardContent className="pt-0">
              <FormationTimeline />
            </CardContent>
          </AccentCard>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0 glass rounded-2xl bg-background/70 border-foreground-tertiary/20">
          <DialogHeader className="sticky top-0 z-10 backdrop-blur-md bg-background/80 px-6 sm:px-8 py-5 border-b border-foreground-tertiary/10">
            <DialogTitle>
              <Title as="h3" className="text-base sm:text-lg text-foreground-primary">Formação</Title>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 sm:px-8 py-6">
            <FormationDialogContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
