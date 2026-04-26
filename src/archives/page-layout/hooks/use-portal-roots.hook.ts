import { useLayoutEffect, useState } from 'react';

export function usePortalRoots(ids: string[]) {
  const [roots, setRoots] = useState<Record<string, HTMLElement | null>>({});

  useLayoutEffect(() => {
    const foundRoots: Record<string, HTMLElement | null> = {};
    console.log("hii")
    ids.forEach((id) => {
      foundRoots[id] = document.getElementById(id);
    });

    const frame = requestAnimationFrame(() => {
      setRoots(foundRoots);
    });

    return () => cancelAnimationFrame(frame);
  }, [ids]);

  return roots;
}