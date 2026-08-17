import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Tailwind classes for the fallback gradient (used when image fails or is loading). */
  fallbackClassName?: string;
  /** Optional inline SVG/icon rendered inside the gradient when the image fails. */
  fallbackContent?: React.ReactNode;
}

/**
 * ImageWithFallback — renders an <img> with a graceful gradient fallback.
 * - Shows the gradient (and optional content) while loading.
 * - If the image fails to load, the gradient stays visible permanently.
 * - Maintains layout with the parent's aspect ratio.
 */
const ImageWithFallback = ({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackContent,
  loading = "lazy",
  ...rest
}: ImageWithFallbackProps) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showImage = !!src && !failed;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Fallback / loading layer */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/30 via-primary/15 to-accent/20 transition-opacity duration-500",
          loaded && showImage ? "opacity-0" : "opacity-100",
          fallbackClassName,
        )}
      >
        {fallbackContent ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="h-10 w-10 text-primary/50"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        )}
      </div>

      {showImage && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          {...rest}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
