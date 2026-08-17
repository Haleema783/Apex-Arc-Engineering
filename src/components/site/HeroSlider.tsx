import { useEffect, useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
  label: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  /** Milliseconds between automatic transitions. */
  interval?: number;
}

/**
 * HeroSlider — automatic cross-fading background slider for the hero section.
 * Respects reduced-motion by holding on the first slide.
 */
const HeroSlider = ({ slides, interval = 6000 }: HeroSliderProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="absolute inset-0">
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-smooth",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <ImageWithFallback
            src={s.src}
            alt={s.alt}
            className="h-full w-full object-cover scale-105"
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
            fallbackClassName="bg-gradient-hero"
          />
        </div>
      ))}

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-0 right-0 z-10">
        <div className="container flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.label}`}
              aria-current={i === index}
              className={cn(
                "group flex items-center gap-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-smooth",
                i === index
                  ? "text-accent"
                  : "text-primary-foreground/60 hover:text-primary-foreground",
              )}
            >
              <span
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === index ? "w-8 bg-accent" : "w-4 bg-primary-foreground/40",
                )}
              />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
