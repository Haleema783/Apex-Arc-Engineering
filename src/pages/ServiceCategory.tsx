import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getServiceCategory } from "@/data/services";

const ServiceCategory = () => {
  const { slug = "" } = useParams();
  const category = getServiceCategory(slug);

  if (!category) return <Navigate to="/services" replace />;

  return (
    <>
      <Seo title={`${category.title} — Apex Arc Engineering`} description={category.desc} />
      <section className="container py-10 md:py-16">
        <Button asChild variant="ghost" className="mb-8 -ml-3">
          <Link to="/services"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Services</Link>
        </Button>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service category</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{category.title}</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{category.desc}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted shadow-elegant">
            <ImageWithFallback src={category.image} alt={`${category.title} — Apex Arc Engineering`} className="h-full w-full object-cover" width={1440} height={810} />
          </div>
        </div>
        <div className="mt-14 md:mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">CORE SERVICES</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {category.coreServices.map((service) => (
              <article key={service.title} className="flex h-full flex-col rounded-xl border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant sm:p-6">
                <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground shadow-glow">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-sm font-semibold leading-tight sm:text-lg">{service.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceCategory;
