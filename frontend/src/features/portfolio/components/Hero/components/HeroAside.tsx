import { useState } from "react";
import { Title, Text } from "@/shared/components/typography";
import GlassCard from "@/shared/components/GlassCard";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { MapPin, Phone, Mail, Calendar, ExternalLink } from "lucide-react";
import SkillsRadar from "./SkillsRadar";
import { useAge } from "@/features/portfolio/hooks/useAge";

export default function HeroAside() {
  const age = useAge("2004-02-11");
  const [copied, setCopied] = useState<{ phone: boolean; email: boolean }>({
    phone: false,
    email: false,
  });

  const handleCopy = (value: string, key: "phone" | "email") => {
    navigator.clipboard.writeText(value).catch(() => null);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1500);
  };

  return (
    <aside className="h-auto md:h-full flex items-center">
      <GlassCard
        hover={false}
        className="w-full h-auto md:h-full rounded-xl sm:rounded-2xl md:rounded-r-2xl md:rounded-l-none px-4 sm:px-6 md:pl-6 lg:pl-8 py-4 sm:py-6 md:py-7 lg:py-8 flex items-start justify-center md:justify-center bg-gradient-to-br from-background-secondary/85 via-background-secondary/75 to-background-tertiary/60 border border-foreground-tertiary/30 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.65)]"
      >
        <div className="flex flex-col items-center md:items-center gap-5 sm:gap-6 w-full text-center max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 md:gap-6 w-full">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 blur-2xl bg-accent-primary/20 rounded-full" />
              <img
                src="/profile-picture.png"
                alt="Foto de perfil"
                className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full object-cover ring-2 ring-accent-primary/30 shadow-lg shadow-accent-primary/15"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left w-full">
              <Title
                as="h2"
                className="leading-tight tracking-tight text-2xl sm:text-[26px] lg:text-[32px] text-foreground-primary"
              >
                Israel Araújo de Oliveira
              </Title>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant="secondary"
                  className="bg-accent-primary/15 text-accent-primary border-accent-primary/30 text-[11px] sm:text-xs"
                >
                  Desenvolvedor Pleno
                </Badge>
                <Badge
                  variant="outline"
                  className="text-foreground-primary border-foreground-tertiary/40 text-[11px] sm:text-xs"
                >
                  Fullstack
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full text-left">
                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-foreground-tertiary/20 bg-background-primary/40 px-3 py-2">
                  <MapPin className="h-4 w-4 text-accent-primary flex-shrink-0" />
                  <Text className="text-[12px] sm:text-sm text-foreground-secondary break-words leading-tight">
                    Poços de Caldas – MG
                  </Text>
                </div>
                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-foreground-tertiary/20 bg-background-primary/40 px-3 py-2">
                  <Calendar className="h-4 w-4 text-accent-primary flex-shrink-0" />
                  <Text className="text-[12px] sm:text-sm text-foreground-secondary break-words leading-tight">
                    {age} anos (11/02/2004)
                  </Text>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+55 (35) 9 99742-1900", "phone")}
                  className="group flex min-w-0 items-center gap-2 rounded-lg border border-foreground-tertiary/20 bg-background-primary/40 px-3 py-2 text-left transition hover:border-accent-primary/50 hover:shadow-[0_10px_30px_-20px_rgba(59,130,246,0.5)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-accent-primary/40"
                >
                  <Phone className="h-4 w-4 text-accent-primary flex-shrink-0" />
                  <div className="flex items-center gap-2 min-w-0">
                    <Text className="text-[12px] sm:text-sm text-foreground-secondary break-words leading-tight">
                      +55 (35) 9 99742-1900
                    </Text>
                    <span className="text-[10px] sm:text-xs text-accent-primary/80 opacity-0 group-hover:opacity-100 transition">
                      {copied.phone ? "Copiado!" : "Copiar"}
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy("israelaraujodeoliveira@gmail.com", "email")
                  }
                  className="group flex min-w-0 items-center gap-2 rounded-lg border border-foreground-tertiary/20 bg-background-primary/40 px-3 py-2 text-left transition hover:border-accent-primary/50 hover:shadow-[0_10px_30px_-20px_rgba(59,130,246,0.5)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-accent-primary/40"
                >
                  <Mail className="h-4 w-4 text-accent-primary flex-shrink-0" />
                  <div className="flex items-center gap-2 min-w-0">
                    <Text className="text-[12px] sm:text-sm text-foreground-secondary break-all leading-tight">
                      israelaraujodeoliveira@gmail.com
                    </Text>
                    <span className="text-[10px] sm:text-xs text-accent-primary/80 opacity-0 group-hover:opacity-100 transition">
                      {copied.email ? "Copiado!" : "Copiar"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full justify-center">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs sm:text-sm bg-background-primary/80 border border-foreground-tertiary/30 text-foreground-primary hover:bg-accent-primary/90 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="text-xs sm:text-sm bg-background-primary/80 border border-foreground-tertiary/30 text-foreground-primary hover:bg-accent-primary/90 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>

          <div className="w-full pt-2 border-t border-foreground-tertiary/20 text-center mt-2">
            <div className="flex items-center justify-between gap-2 mb-3">
              <Title
                as="h6"
                className="text-xs sm:text-sm font-semibold text-foreground-primary"
              >
                Radar de habilidades
              </Title>
              <Badge className="text-[10px] sm:text-xs bg-accent-primary/15 text-accent-primary border-accent-primary/30">
                Atualizado
              </Badge>
            </div>
            <div className="rounded-xl border border-foreground-tertiary/20 bg-background-primary/40 px-2 sm:px-3 py-2 overflow-x-auto">
              <div className="min-w-full flex justify-center">
                <SkillsRadar />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </aside>
  );
}
