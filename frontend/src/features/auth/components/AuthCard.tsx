import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Title from "@/shared/components/typography/Title";
import Text from "@/shared/components/typography/Text";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#08090F]">
      <Card className="w-full max-w-md border-white/10 bg-white/10 backdrop-blur-lg">
        <CardHeader className="space-y-2">
          <CardTitle>
            <Title as="h3" className="text-center">
              {title}
            </Title>
          </CardTitle>
          <CardDescription>
            <Text as="div" className="text-center text-sm text-white/60">
              {subtitle}
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
        <CardFooter className="flex justify-center">{footer}</CardFooter>
      </Card>
    </div>
  );
}
