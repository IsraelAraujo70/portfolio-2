import { Title, Text } from "../../../components/typography";
import GlassCard from "../../../components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Calendar, ExternalLink } from "lucide-react";
import SkillsRadar from "./SkillsRadar";
import { useAge } from "../../../hooks/useAge";

export default function HeroAside() {
  const age = useAge("2004-02-11");
  
  return (
    <aside className="h-auto md:h-full flex items-center">
      <GlassCard
        hover={false}
        className="w-full h-auto md:h-full rounded-xl sm:rounded-2xl md:rounded-r-2xl md:rounded-l-none px-4 sm:px-6 md:pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8 flex items-start justify-center md:justify-center"
      >
        <div className="flex flex-col items-center md:items-center gap-3 sm:gap-4 md:gap-5 w-full text-center">
          <div className="flex flex-col md:flex-col items-center gap-2 sm:gap-3 md:gap-4">
            <img
              src="/profile-picture.png"
              alt="Foto de perfil"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full object-cover flex-shrink-0 ring-2 ring-accent-primary/20"
            />
            <div className="leading-snug text-center">
              <Title as="h2" className="leading-tight tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Israel Araújo de Oliveira
              </Title>
              <div className="flex flex-wrap gap-1 mt-1 sm:mt-2 md:mt-2 justify-center">
                <Badge variant="secondary" className="bg-accent-primary/10 text-accent-primary border-accent-primary/20 text-xs">
                  Desenvolvedor Pleno
                </Badge>
                <Badge variant="outline" className="text-foreground-secondary text-xs">
                  Fullstack
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2 w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-xs md:text-sm text-[#a7b8c6]">
              <MapPin className="h-3 w-3 text-accent-primary flex-shrink-0" />
              <Text>Santa Ângela – Poços de Caldas – MG</Text>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-xs md:text-sm text-[#a7b8c6]">
              <Calendar className="h-3 w-3 text-accent-primary flex-shrink-0" />
              <Text>{age} anos (11/02/2004)</Text>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-xs md:text-sm text-[#a7b8c6]">
              <Phone className="h-3 w-3 text-accent-primary flex-shrink-0" />
              <Text>+55 (35) 9 99742-1900</Text>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-xs md:text-sm text-[#a7b8c6]">
              <Mail className="h-3 w-3 text-accent-primary flex-shrink-0" />
              <Text>israelaraujodeoliveira@gmail.com</Text>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full justify-center">
            <Button size="sm" variant="outline" className="glass-button text-xs sm:text-sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button size="sm" variant="outline" className="glass-button text-xs sm:text-sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
          <div className="w-full pt-2 border-t border-foreground-tertiary/20 text-center mt-2">
            <SkillsRadar />
          </div>
        </div>
      </GlassCard>
    </aside>
  );
}
