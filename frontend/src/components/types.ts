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
