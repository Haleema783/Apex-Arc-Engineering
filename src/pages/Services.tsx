import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/data/services";

const Services = () => (
  <>
    <Seo
      title="Services — Apex Arc Engineering"
      description="Explore Apex Arc Engineering's engineering, solar, electrical, automation, installation and maintenance services."
    />
    <section className="container py-12 md:py-20">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our services</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Practical engineering solutions, organized around your requirements.
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          Explore our service categories to find the engineering support and industrial solutions you need.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category) => (
          <article key={category.slug} className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <ImageWithFallback src={category.image} alt={`${category.title} — Apex Arc Engineering`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" width={1024} height={768} />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <span className="absolute top-3 left-3 inline-grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground shadow-glow">
                <category.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-display text-xl font-semibold leading-tight">{category.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{category.desc}</p>
              <Button asChild variant="outline" className="mt-5">
                <Link to={`/services/${category.slug}`}>Explore Services <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default Services;
