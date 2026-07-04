import { createContext, type ReactNode } from "react";

interface LayoutContextType {
  // Header state
  header: ReactNode | null;
  headerOpenedHeight: number;
  headerClosedHeight: number;
  isHeaderOpen: boolean;
  setHeader: (header: ReactNode | null) => void;
  setHeaderOpenedHeight: (height: number) => void; 
  setHeaderClosedHeight: (height: number) => void; 
  setIsHeaderOpen: (open: boolean) => void;
  clearHeader: () => void;

  // Navbar state
  navbar: ReactNode | null;
  navbarOpenedWidth: number;
  navbarClosedWidth: number;
  isNavbarOpen: boolean;
  setNavbar: (navbar: ReactNode | null) => void;
  setNavbarOpenedWidth: (width: number) => void;
  setNavbarClosedWidth: (width: number) => void;
  setIsNavbarOpen: (open: boolean) => void;
  clearNavbar: () => void;

  // Aside state
  aside: ReactNode | null;
  asideOpenedWidth: number;
  asideClosedWidth: number;
  isAsideOpen: boolean;
  setAside: (aside: ReactNode | null) => void;
  setAsideOpenedWidth: (width: number) => void;
  setAsideClosedWidth: (width: number) => void;
  setIsAsideOpen: (open: boolean) => void;
  clearAside: () => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);