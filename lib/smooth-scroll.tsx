// hooks/useSmoothScroll.ts
"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

export const useSmoothScroll = () => {
  const lenis = useLenis();

  const scrollTo = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      target: string,
      options?: {
        offset?: number;
        duration?: number;
      },
    ) => {
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback native smooth scroll
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  return { scrollTo };
};
