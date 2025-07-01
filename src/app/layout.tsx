import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './registry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Portfólio - Desenvolvedor Full Stack",
  description: "Portfólio interativo com full page scroll showcasing projetos e habilidades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
