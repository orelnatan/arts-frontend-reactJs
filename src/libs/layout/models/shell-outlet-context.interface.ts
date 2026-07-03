import type { ReactNode } from "react";

export interface ShellOutletContext {
  setChildHeaderContent?: (content: ReactNode) => void;
  setChildHeaderHeight?: (height: number) => void;
}