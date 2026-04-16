"use client";

import { useEffect } from "react";

export function ScrollSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            // Update URL without jumping
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return null;
}
