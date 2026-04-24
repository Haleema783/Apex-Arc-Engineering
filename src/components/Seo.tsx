import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  /** Optional JSON-LD structured data object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Lightweight SEO helper for public pages — sets <title>, meta description,
 * canonical URL, OpenGraph / Twitter card tags and optional JSON-LD.
 */
const Seo = ({
  title,
  description,
  canonical,
  image = "/placeholder.svg",
  type = "website",
  jsonLd,
}: SeoProps) => {
  const url =
    canonical ??
    (typeof window !== "undefined" ? window.location.href : undefined);

  const absoluteImage =
    image.startsWith("http") || typeof window === "undefined"
      ? image
      : `${window.location.origin}${image}`;

  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="Apex Arc Engineering" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;

