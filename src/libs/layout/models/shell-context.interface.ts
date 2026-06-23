import type { ReactNode } from "react";

export interface ShellLayoutContext {
  setChildHeaderContent?: (content: ReactNode) => void;
  setChildHeaderHeight?: (height: number) => void;
}