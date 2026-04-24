import { useState } from "react";
import logoSrc from "@/assets/apex-arc-logo.jpg";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  alt?: string;
  /** Set to "eager" for above-the-fold logo (header). Defaults to "eager" since logo is critical. */
  loading?: "eager" | "lazy";
}

/**
 * Apex Arc Engineering full logo (icon + wordmark).
 * - Renders the brand image inside a sized container (object-contain preserves aspect ratio).
 * - If the image fails to load or is blocked by caching/CDN, falls back to a styled
 *   text wordmark so the brand never disappears.
 */
const BrandLogo = ({ className, alt = "Apex Arc Engineering", loading = "eager" }: BrandLogoProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "inline-flex items-center font-display font-bold leading-none tracking-tight text-primary",
          // Default to a height that matches the image variant so layout doesn't shift
          "h-full text-base sm:text-lg md:text-xl",
          className,
        )}
      >
        <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-md bg-primary text-primary-foreground mr-2 shrink-0">
          A
        </span>
        <span className="whitespace-nowrap">
          APEX ARC <span className="text-primary-glow">ENGINEERING</span>
        </span>
      </span>
    );
  }

  return (
    <img
      src={logoSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      width={1536}
      height={1024}
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-contain", className)}
    />
  );
};

export default BrandLogo;
