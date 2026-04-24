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
 * Use inside a sized container — image scales via object-contain to keep aspect ratio.
 */
const BrandLogo = ({ className, alt = "Apex Arc Engineering", loading = "eager" }: BrandLogoProps) => (
  <img
    src={logoSrc}
    alt={alt}
    loading={loading}
    decoding="async"
    width={1536}
    height={1024}
    className={cn("h-full w-full object-contain", className)}
  />
);

export default BrandLogo;
