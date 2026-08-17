import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver-based reveal hook.
 * Returns a ref + boolean. Once revealed, the element stays revealed
 * (great for mounted-once fade/slide animations).
 *
 * Respects prefers-reduced-motion: if the user prefers reduced motion,
 * the element is treated as already revealed (no animation).
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
) => {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(entry.target);
        }
      });
    }, options);

    obs.observe(node);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, revealed };
};
