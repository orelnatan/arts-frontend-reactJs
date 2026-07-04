import { type ReactNode, useEffect } from "react";

import { useLayoutContext } from "../../hooks";

interface ShellHeaderProps {
  children: ReactNode;
  openedHeight?: number; 
  closedHeight?: number;
  isOpen?: boolean;
}

export default function ShellHeader({ children, openedHeight = 0, closedHeight = 0, isOpen = false }: ShellHeaderProps) {
  const { setHeader, setHeaderOpenedHeight, setHeaderClosedHeight, setIsHeaderOpen, clearHeader } = useLayoutContext();

  useEffect(() => {
    setHeader(children);
    setHeaderOpenedHeight(openedHeight);
    setHeaderClosedHeight(closedHeight);
    setIsHeaderOpen(isOpen);

    return () => {
      clearHeader();
    };
  }, [children, openedHeight, closedHeight, isOpen, setHeader, setIsHeaderOpen, setHeaderOpenedHeight, setHeaderClosedHeight, clearHeader]);

  return null; 
}