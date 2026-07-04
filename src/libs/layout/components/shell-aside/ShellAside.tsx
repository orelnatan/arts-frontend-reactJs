import { type ReactNode, useEffect } from 'react'

import { useLayoutContext } from '../../hooks'

interface LayoutAsideProps {
  children: ReactNode
  openedWidth?: number
  closedWidth?: number
  isOpen?: boolean
}

export default function LayoutAside({
  children,
  openedWidth = 0,
  closedWidth = 0,
  isOpen = false,
}: LayoutAsideProps) {
  const {
    setAside,
    setAsideOpenedWidth,
    setAsideClosedWidth,
    setIsAsideOpen,
    clearAside,
  } = useLayoutContext()

  useEffect(() => {
    setAside(children)
    setAsideOpenedWidth(openedWidth)
    setAsideClosedWidth(closedWidth)
    setIsAsideOpen(isOpen)

    return () => {
      clearAside()
    }
  }, [
    children,
    openedWidth,
    closedWidth,
    isOpen,
    setAside,
    setIsAsideOpen,
    setAsideOpenedWidth,
    setAsideClosedWidth,
    clearAside,
  ])

  return null
}
