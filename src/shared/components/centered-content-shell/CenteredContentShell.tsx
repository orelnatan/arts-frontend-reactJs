import React, { useState, useEffect, useRef, useMemo } from 'react';

import './CenteredContentShell.scss';

export interface CenteredContentShellProps {
  elementsWidthPx: number;
  maxElementsPerRow?: number;
  gap?: number;
  children: React.ReactNode;
}

export default function CenteredContentShell({
  elementsWidthPx,
  maxElementsPerRow = Infinity,
  gap = 8,
  children,
}: CenteredContentShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [shellWidth, setShellWidth] = useState<number>(0);

  // 1. Observe changes to container width
  useEffect(() => {
    const currentShell = shellRef.current;
    if (!currentShell) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        const width = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        setShellWidth(width);
      }
    });

    resizeObserver.observe(currentShell);
    return () => resizeObserver.disconnect();
  }, []);

  // 2. Layout Math
  const { innerLayerMaxWidth, rowCapacity } = useMemo(() => {
    const slotSize = elementsWidthPx + gap;
    const computedCapacity = Math.min(Math.floor(shellWidth / slotSize), maxElementsPerRow);
    
    const capacity = Math.max(0, computedCapacity);
    const maxWidth = Math.max(0, capacity * slotSize - gap);

    return { innerLayerMaxWidth: maxWidth, rowCapacity: capacity };
  }, [shellWidth, elementsWidthPx, gap, maxElementsPerRow]);

  // 3. Dynamic layout alignment based on item count vs capacity & limits
  const totalItems = React.Children.count(children);
  
  // Align left if items fill the current row capacity OR if total items are fewer than the max allowance.
  const justifyContent = (totalItems >= rowCapacity || totalItems < maxElementsPerRow) 
    ? 'flex-start' 
    : 'center';

  return (
    <div className='centered-content-shell-main' ref={shellRef}>
      <div className='content-shell-inner-layer'
        style={{
          gap: `${gap}px`,
          maxWidth: innerLayerMaxWidth > 0 ? `${innerLayerMaxWidth}px` : '100%',
          justifyContent,
        }}
      >
        {children}
      </div>
    </div>
  );
}