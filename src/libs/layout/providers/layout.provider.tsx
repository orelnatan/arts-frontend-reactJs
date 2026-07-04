import { useState, type ReactNode } from 'react'

import { LayoutContext } from '../contexts'

export function LayoutProvider({ children }: { children: ReactNode }) {
  // Header State
  const [header, setHeader] = useState<ReactNode | null>(null)
  const [headerOpenedHeight, setHeaderOpenedHeight] = useState<number>(0)
  const [headerClosedHeight, setHeaderClosedHeight] = useState<number>(0)
  const [isHeaderOpen, setIsHeaderOpen] = useState<boolean>(false)

  // Navbar State
  const [navbar, setNavbar] = useState<ReactNode | null>(null)
  const [navbarOpenedWidth, setNavbarOpenedWidth] = useState<number>(0)
  const [navbarClosedWidth, setNavbarClosedWidth] = useState<number>(0)
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

  // Aside State
  const [aside, setAside] = useState<ReactNode | null>(null)
  const [asideOpenedWidth, setAsideOpenedWidth] = useState<number>(0)
  const [asideClosedWidth, setAsideClosedWidth] = useState<number>(0)
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)

  const clearHeader = () => {
    setHeader(null)
    setHeaderOpenedHeight(0)
    setHeaderClosedHeight(0)
    setIsHeaderOpen(false)
  }

  const clearNavbar = () => {
    setNavbar(null)
    setNavbarOpenedWidth(0)
    setNavbarClosedWidth(0)
    setIsNavbarOpen(false)
  }

  const clearAside = () => {
    setAside(null)
    setAsideOpenedWidth(0)
    setAsideClosedWidth(0)
    setIsAsideOpen(false)
  }

  return (
    <LayoutContext.Provider
      value={{
        // header
        header,
        headerOpenedHeight,
        headerClosedHeight,
        isHeaderOpen,
        setHeader,
        setHeaderOpenedHeight,
        setHeaderClosedHeight,
        setIsHeaderOpen,
        clearHeader,
        // navbar
        navbar,
        navbarOpenedWidth,
        navbarClosedWidth,
        isNavbarOpen,
        setNavbar,
        setNavbarOpenedWidth,
        setNavbarClosedWidth,
        setIsNavbarOpen,
        clearNavbar,
        // aside
        aside,
        asideOpenedWidth,
        asideClosedWidth,
        isAsideOpen,
        setAside,
        setAsideOpenedWidth,
        setAsideClosedWidth,
        setIsAsideOpen,
        clearAside,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
