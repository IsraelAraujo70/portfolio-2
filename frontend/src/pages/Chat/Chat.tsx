import { useNavigate } from "react-router-dom";
import GlassCard from "@/components/GlassCard";
import Title from "@/components/typography/Title";
import Text from "@/components/typography/Text";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="relative z-10 rounded-2xl p-12 max-w-2xl text-center space-y-6">
        <Title as="h3">Chat em construção</Title>
        <Text as="div">
          {user
            ? `Olá, ${user.name}! Em breve você poderá conversar comigo por aqui e receber respostas em tempo real.`
            : "Faça login ou crie sua conta para liberar o chat assim que estiver disponível."}
        </Text>
        {user ? (
          <Button type="button" disabled variant="secondary" className="justify-center">
            Em breve disponível
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button type="button" variant="secondary" onClick={() => navigate("/login")}>
              Já tenho conta
            </Button>
            <Button type="button" onClick={() => navigate("/signup")}>Quero me cadastrar</Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
