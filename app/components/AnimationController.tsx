"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export function AnimationController() {
  const pathname = usePathname();

  const setupObserver = useCallback(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-down").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-down").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    const elements = document.querySelectorAll(
      ".reveal:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed), .reveal-zoom:not(.is-revealed), .reveal-down:not(.is-revealed)",
    );

    elements.forEach((el) => observer.observe(el));

    return observer;
  }, []);

  useEffect(() => {
    document.body.classList.add("js-loaded");

    const observer = setupObserver();

    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, setupObserver]);

  return null;
}
