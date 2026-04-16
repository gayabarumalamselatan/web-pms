"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
