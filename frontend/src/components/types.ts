import type { ReactNode } from "react";

export type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

// Narrow interface for the subset we use from @fullpage/react-fullpage
export interface FullpageApi {
  moveSectionDown: () => void;
  moveSectionUp?: () => void;
  moveTo?: (section: number, slide?: number) => void;
}

export interface LoadingScreenProps {
  fullpageApi: FullpageApi | null | undefined;
}

// Typography
export type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleProps = {
  as?: TitleTag;
  className?: string;
  children: ReactNode;
};

export type TextTag = "p" | "div";
export type TextProps = {
  as?: TextTag;
  className?: string;
  children: ReactNode;
};

export type InlineTag = "span" | "strong" | "em";
export type InlineProps = {
  as?: InlineTag;
  className?: string;
  children: ReactNode;
};

// Social / Media Buttons
export type SocialButtonProps = {
  href: string;
  icon: ReactNode;
  label?: string; // acessibilidade
  newTab?: boolean;
  className?: string;
};
