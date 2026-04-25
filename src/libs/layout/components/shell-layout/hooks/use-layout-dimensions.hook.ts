import { useState, useLayoutEffect, type RefObject } from 'react';

export function useLayoutDimensions(refs: RefObject<HTMLElement | null>[]) {
  const [dims, setDims] = useState({
    headerHeight: 0,
    subheaderHeight: 0,
    footerHeight: 0,
    sidebarWidth: 0,
  });

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        setDims({
          headerHeight: refs[0].current?.offsetHeight || 0,
          subheaderHeight: refs[1].current?.offsetHeight || 0,
          footerHeight: refs[2].current?.offsetHeight || 0,
          sidebarWidth: refs[3].current?.offsetWidth || 0,
        });
      });
    });

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs]);

  return dims;
}