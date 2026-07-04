import { type ReactNode, useEffect } from "react";

import { useLayoutContext } from "../../hooks";

interface ShellNavbarProps {
  children: ReactNode;
  openedWidth?: number; 
  closedWidth?: number;
  isOpen?: boolean;
}

export default function ShellNavbar({ 
  children, 
  openedWidth = 0, 
  closedWidth = 0, 
  isOpen = false 
}: ShellNavbarProps) {
  const { 
    setNavbar, 
    setNavbarOpenedWidth, 
    setNavbarClosedWidth, 
    setIsNavbarOpen, 
    clearNavbar 
  } = useLayoutContext();

  useEffect(() => {
    setNavbar(children);
    setNavbarOpenedWidth(openedWidth);
    setNavbarClosedWidth(closedWidth);
    setIsNavbarOpen(isOpen);
    
    return () => {
      clearNavbar();
    };
  }, [
    children, 
    openedWidth, 
    closedWidth, 
    isOpen, 
    setNavbar, 
    setIsNavbarOpen, 
    setNavbarOpenedWidth, 
    setNavbarClosedWidth, 
    clearNavbar
  ]);

  return null; 
}