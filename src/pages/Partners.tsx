import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const partners = [
  { name: "Nishat", href: "https://nishatmillsltd.com/?utm_source=chatgpt.com", logo: "/partners/nishat.png" },
  { name: "Sufi Group", href: "https://sufigroup.biz/?utm_source=chatgpt.com", logo: "/partners/hteh.png" },
  { name: "Habib Trust Eye Hospital", href: "https://upmed.net/", logo: "/partners/hteh.png" },
  { name: "Gohar Textile", href: "https://gohartextile.com/", logo: "/partners/frozen-hub.png" },
  { name: "Masood Textile", href: "https://masoodtextile.com/?utm_source=chatgpt.com", logo: "/partners/masood-textile.png" },
  { name: "Frozen Hub", href: "https://frozenhub.com.pk/?utm_source=chatgpt.com", logo: "/partners/sadaqat-group.png" },
  { name: "Murree Brewery", href: "https://murreebrewery.com/?utm_source=chatgpt.com", logo: "/partners/murree-brewery.png" },
  { name: "Sadaqat Group", href: "https://sadaqatgroup.com/?utm_source=chatgpt.com", logo: "/partners/sufi-group.png" },
];

const Partners = () => {
  return (
    <>
      <Seo
        title="Our Clients & Partners | Apex Arc Engineering"
        description="Apex Arc Engineering — Our clients and partners"
      />

      <section className="container py-14 md:py-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            OUR CLIENTS & PARTNERS
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Apex Arc Engineering takes pride in serving esteemed corporations, utility operators, and industrial leaders. Our reliable delivery model fosters enduring client collaborations.
          </p>
        </div>

        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          {partners.map((p) => (
            <article key={p.name} className="rounded-xl border p-4 flex flex-col items-center text-center">
              <div className="h-24 w-full flex items-center justify-center bg-white rounded-md mb-3">
                <ImageWithFallback
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 max-w-full object-contain"
                  fallbackContent={<span className="text-sm font-semibold text-foreground">{p.name}</span>}
                />
              </div>
              <div className="font-medium text-sm text-foreground mb-3">{p.name}</div>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                <Button className="w-full" style={{ backgroundColor: "#122749", color: "#ffffff", borderColor: "#122749" }}>
                  Visit Website
                </Button>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Partners;
