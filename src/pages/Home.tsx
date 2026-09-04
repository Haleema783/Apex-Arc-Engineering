import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useReveal } from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";
import HeroSlider from "@/components/site/HeroSlider";
import heroImg from "@/assets/hero-industrial.jpg";
import heroIndustrialImg from "@/assets/hero-industrial.jpg";
import heroSlidePower from "@/assets/hero-slide-power.jpg";
import heroSlideAutomation from "@/assets/hero-slide-automation.jpg";
import heroSlideSolar from "@/assets/hero-slide-solar.jpg";
import aboutTeamImg from "@/assets/about-team.jpg";
import aboutElectricalImg from "@/assets/cap-electrical.jpg";
import aboutAutomationImg from "@/assets/cap-automation.jpg";
import ceoPortrait from "@/assets/ceo-potrait.jpeg";
import { featuredProjects } from "@/data/projects";
import { serviceCategories } from "@/data/services";
import {
  ArrowRight,
  Building2,
  Cpu,
  Activity,
  Boxes,
  Layers,
  Mail,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Gauge,
  Sun,
  Lightbulb,
  Users,
  Headphones,
  Factory,
} from "lucide-react";

/* ---------- Hero background slider ---------- */
const heroSlides = [
  {
    src: heroSlidePower,
    alt: "High-voltage electrical substation and transmission network at blue hour",
    label: "Electrical",
  },
  {
    src: heroSlideAutomation,
    alt: "Industrial automation and SCADA control room",
    label: "Automation",
  },
  {
    src: heroSlideSolar,
    alt: "Utility-scale solar photovoltaic power plant",
    label: "Solar energy",
  },
];

/* ---------- Corporate metrics & capabilities (4) ---------- */
const metrics = [
  {
    icon: Zap,
    title: "High-Voltage Power Systems",
    desc: "Expert substation engineering, protection relay coordination, power grid load flow calculations, transformer retrofitting, and dynamic cable routing.",
  },
  {
    icon: Gauge,
    title: "Industrial Automation & SCADA",
    desc: "Custom PLC control loop integration, human-machine interface (HMI) design, safety interlocking grids, and enterprise SCADA dashboards.",
  },
  {
    icon: Activity,
    title: "Sustainable Energy Auditing",
    desc: "Comprehensive power factor optimization, active harmonic filtering, thermal insulation audits, and demand-side management configurations.",
  },
  {
    icon: Sun,
    title: "Clean Energy Microgrids",
    desc: "Grid-tied solar photovoltaic farm design, wind turbine micro-controllers, advanced battery energy storage system (BESS) integration.",
  },
];


/* ---------- Engineering standards & compliance ---------- */
const standards = [
  { code: "IEEE", desc: "Power system design and testing practices." },
  { code: "IEC", desc: "International electrotechnical equipment standards." },
  { code: "NEC", desc: "Electrical installation and wiring safety code." },
  { code: "ISO 9001:2015", desc: "Quality management aligned processes." },
];

const stats = [
  { value: "12+", label: "Years" },
  { value: "200+", label: "Projects" },
  { value: "60+", label: "Clients" },
  { value: "30+", label: "Engineers" },
];

const why = [
  {
    icon: Layers,
    title: "Technical Expertise",
    desc: "Qualified engineers across electrical, mechanical, civil and automation disciplines.",
  },
  {
    icon: Factory,
    title: "Industry-Focused Solutions",
    desc: "Designs shaped by real plant conditions, load profiles and production priorities.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Technology",
    desc: "Modern tools, smart monitoring and energy-efficient engineering practices.",
  },
  {
    icon: CheckCircle2,
    title: "Reliable Execution",
    desc: "BOQ-driven delivery with documented milestones and on-time completion.",
  },
  {
    icon: Users,
    title: "Client Commitment",
    desc: "Transparent communication and a single accountable team from start to finish.",
  },
  {
    icon: Headphones,
    title: "After-Sales Support",
    desc: "Preventive maintenance, spares supply and rapid breakdown response.",
  },
];

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(4000),
});

const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={revealed ? { animationDelay: `${delay}ms` } : undefined}
      className={`${className} ${revealed ? "animate-reveal-up" : "opacity-0"}`}
    >
      {children}
    </div>
  );
};

const Section = ({
  id,
  className = "",
  children,
  ariaLabelledBy,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  ariaLabelledBy?: string;
}) => (
  <section
    id={id}
    aria-labelledby={ariaLabelledBy}
    className={`snap-start min-h-[100svh] flex items-center relative overflow-hidden ${className}`}
  >
    <div className="container w-full py-10 md:py-14">{children}</div>
  </section>
);

const Home = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please review your details",
        description: parsed.error.errors[0]?.message ?? "Some fields need attention.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        message: parsed.data.message,
        source: "home_contact",
      });
      if (error) throw error;
      toast({
        title: "Inquiry sent",
        description: "Thanks — our engineering team will respond within 1–2 working days.",
      });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: unknown) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Could not submit your inquiry.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Apex Arc Engineering",
    url: typeof window !== "undefined" ? window.location.origin : undefined,
    email: "apexarcengineering@gmail.com",
    telephone: "+923009742946",
    description:
      "Multi-disciplinary engineering enterprise delivering electrical, civil, mechanical, industrial, automation and energy solutions across Pakistan.",
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    areaServed: "PK",
  };

  return (
    <>
      <Seo
        title="Apex Arc Engineering — Integrated Engineering Solutions"
        description="Multi-disciplinary engineering enterprise: electrical, mechanical, civil, automation, embedded and industrial maintenance services across Pakistan."
        image={heroImg}
        jsonLd={[orgLd]}
      />

      {/* HERO */}
      <Section
        id="home"
        ariaLabelledBy="hero-heading"
        className="text-primary-foreground"
      >
        <div className="absolute inset-0 -z-10">
          <HeroSlider slides={heroSlides} />
        </div>

        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Multi-disciplinary engineering enterprise · Pakistan
          </span>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
          >
            Integrated Engineering <span className="text-accent">Across Industries</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-primary-foreground/85 max-w-2xl">
            Industrial, electrical, civil, mechanical & smart engineering — delivered at
            enterprise scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <a href="#services">
                Explore services <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
            >
              <a href="#contact">Get in touch</a>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6 max-w-xl">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-accent">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs text-primary-foreground/75 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

    {/* CAPABILITIES */}
<section
  id="capabilities"
  aria-label="Capabilities"
className="hidden md:block snap-start relative z-10 -mt-12 md:-mt-18 lg:-mt-22">
  <div className="container">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
      {metrics.map((m, i) => (
        <Reveal key={m.title} delay={i * 70}>
          <article
            className="
              group
              flex
              min-h-[400px]
              h-full
              flex-col
              items-center
              rounded-none
              border-2
              border-[#F59F0A]
              bg-primary
              px-6
              py-10
              text-center
              shadow-card
              transition-all
              duration-300
              ease-smooth
              hover:-translate-y-2
              hover:z-20
              hover:bg-white
              hover:text-primary
              hover:shadow-elegant
            "
          >
            {/* ICON BOX */}
            <span
              className="
                inline-grid
                h-24
                w-24
                place-items-center
                rounded-xl
                #F59F0A
                text-[#F59F0A]
                shadow-sm
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:bg-primary/5
                group-hover:text-[#F59F0A]
              "
            >
              <m.icon
                className="h-10 w-10"
                strokeWidth={1.6}
              />
            </span>

            {/* TITLE */}
            <h3
              className="
                mt-5
                min-h-[72px]
                flex
                items-center
                justify-center
                font-display
                text-xl
                md:text-2xl
                font-semibold
                leading-tight
                text-white
                transition-colors
                duration-300
                group-hover:text-primary
              "
            >
              {m.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mt-5
                max-w-[360px]
                text-sm
                md:text-base
                leading-relaxed
                text-white/90
                transition-colors
                duration-300
                group-hover:text-primary/80
              "
            >
              {m.desc}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {/* ABOUT */}
      <section aria-labelledby="about-heading" className="bg-background border-b">
        <div className="container py-14 md:py-20">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <Reveal className="order-2 md:order-1">
              <h2
                id="about-heading"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
              >
                MESSAGE FROM THE CHIEF EXECUTIVE
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground">
                <div className="border-l-2 border-accent pl-4">
                  <div className="font-display text-lg font-semibold text-foreground">
                    Engr. Khizar Naqvi
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Chief Executive Officer
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Apex Arc Engineering
                  </div>
                </div>
                <p>
                  As an engineering professional with experience in academia and
                  industry, I have contributed to projects involving power systems,
                  industrial automation, energy management, and advanced
                  electromechanical technologies. My focus is on transforming complex
                  engineering challenges into practical, efficient, and sustainable
                  solutions.
                </p>
                <p>
                  At Apex Arc Engineering, I strive to foster technical excellence,
                  innovation, and continuous improvement while delivering reliable
                  engineering solutions that bridge the gap between theoretical
                  knowledge and real-world industrial applications.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-primary opacity-20 blur-2xl" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border shadow-elegant">
                  <ImageWithFallback
                    src={ceoPortrait}
                    alt="Engr. Khizar Naqvi, Chief Executive Officer of Apex Arc Engineering"
                    className="h-full w-full object-cover"
                    width={1024}
                    height={1280}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 md:gap-14 lg:grid-cols-[0.96fr_1.04fr] items-center">
            <Reveal className="order-1">
              <div className="relative mx-auto max-w-[560px] pb-10 sm:pb-16">
                <div className="relative aspect-[16/11] w-[90%] overflow-hidden rounded-[28px] shadow-elegant animate-fade-in">
                  <ImageWithFallback
                    src={aboutElectricalImg}
                    alt="Electrical engineering capability at Apex Arc Engineering"
                    className="h-full w-full object-cover"
                    width={1024}
                    height={768}
                  />
                </div>
                <div
                  className="absolute -bottom-3 right-0 w-[58%] overflow-hidden rounded-[24px] shadow-card sm:block"
                  style={{ animation: "floatUpDown 5s ease-in-out infinite" }}
                >
                  <ImageWithFallback
                    src={aboutAutomationImg}
                    alt="Automation engineering capability at Apex Arc Engineering"
                    className="h-full w-full object-cover"
                    width={512}
                    height={512}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="order-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Who We Are
              </h3>
              <h4 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                About Apex Arc Engineering
              </h4>
              <div className="mt-5 space-y-4 text-base md:text-lg text-muted-foreground">
                <p>
                  Apex Arc Engineering is a forward-thinking engineering company
                  established by a team of highly motivated professionals.
                </p>
                <p>
                  We specialize in delivering advanced automation, control, energy, and
                  power solutions to a wide range of industries. Our focus is not only
                  on providing high-quality products but also ensuring exceptional
                  after-sales services that build long-term client trust and
                  satisfaction.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" size="lg" className="border-primary bg-primary text-white transition-colors duration-300 hover:bg-[#F59F0A] hover:border-[#F59F0A] hover:text-white">
                  <Link to="/about">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`
          @keyframes floatUpDown {
            0% { transform: translateY(16px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(16px); }
          }
        `}</style>
      </section>

      {/* SERVICES */}
      <Section
        id="services"
        ariaLabelledBy="services-heading"
        className="bg-muted/40 border-y"
      >
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our services
          </span>
          <h2
            id="services-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Industrial solutions built around your engineering requirements.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {serviceCategories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 50}>
              <article className="group h-full overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-accent/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={category.image}
                    alt={`${category.title} — Apex Arc Engineering`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={1024}
                    height={768}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span className="absolute top-3 left-3 inline-grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <category.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-tight">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug">
                    {category.desc}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link to={`/services/${category.slug}`}>
                      Explore Services <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <section id="projects" aria-labelledby="projects-heading" className="container py-12 md:py-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Featured projects
          </span>
          <h2
            id="projects-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Engineering work designed for performance, compliance and reliability.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 40}>
              <article className="group h-full overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30">
                <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={960}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <Link to={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <Section id="why-us" ariaLabelledBy="why-heading" className="bg-background">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why choose us
          </span>
          <h2
            id="why-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Why industries choose Apex Arc Engineering.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 50}>
              <article className="group h-full rounded-xl border bg-card p-3 sm:p-5 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30">
                <span className="inline-grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                  <w.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="mt-2 sm:mt-3 font-display text-sm sm:text-base font-semibold text-foreground leading-tight">
                  {w.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                  {w.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ENGINEERING STANDARDS & SAFETY COMPLIANCE */}
      <Section
        id="standards"
        ariaLabelledBy="standards-heading"
        className="bg-muted/40 border-y"
      >
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Standards &amp; safety
            </span>
            <h2
              id="standards-heading"
              className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
            >
              Engineering standards &amp; safety compliance.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Every design, installation and commissioning activity is executed in
              accordance with recognised international engineering codes and strict
              on-site HSE procedures — protecting our people, our clients and their
              assets.
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Our quality framework follows documented inspection and test plans,
              method statements and job safety analysis for all critical works.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2">
              {standards.map((s) => (
                <div
                  key={s.code}
                  className="rounded-xl border bg-card p-4 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                    <span className="font-display text-sm sm:text-base font-bold text-foreground">
                      {s.code}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* OUR CLIENTS & PARTNERS PREVIEW */}
      <section aria-labelledby="partners-preview-heading" className="container py-10 md:py-14">
        <div className="max-w-2xl">
          <h2 id="partners-preview-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            OUR CLIENTS & PARTNERS
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Apex Arc Engineering takes pride in serving esteemed corporations, utility operators, and industrial leaders.
          </p>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            { name: "Nishat", logo: "/partners/nishat.png" },
            { name: "Sufi Group", logo: "/partners/sufi-group.png" },
            { name: "Habib Trust Eye Hospital", logo: "/partners/hteh.png" },
            { name: "Gohar Textile", logo: "/partners/gohar-textile.png" },
            { name: "Masood Textile", logo: "/partners/hteh.jpg" },
            { name: "Frozen Hub", logo: "/partners/frozen-hub.png" },
            { name: "Murree Brewery", logo: "/partners/murree-brewery.png" },
            { name: "Sadaqat Group", logo: "/partners/sadaqat-group.png" },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-center p-3">
              <div className="h-20 w-full flex items-center justify-center bg-white rounded-md">
                <ImageWithFallback
                  src={p.logo}
                  alt={p.name}
                  className="max-h-16 max-w-full object-contain"
                  fallbackContent={<span className="text-sm font-semibold text-foreground">{p.name}</span>}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 max-w-xs mx-auto">
          <Link to="/partners">
            <Button className="w-full">VIEW ALL PARTNERS</Button>
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <Section
        id="contact"
        ariaLabelledBy="contact-heading"
        className="bg-muted/40 border-t"
      >
        <div className="grid gap-6 md:gap-10 lg:grid-cols-2 items-start">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contact
            </span>
            <h2
              id="contact-heading"
              className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
            >
              Tell us about your project.
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Share your scope. We respond within 1–2 working days.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:apexarcengineering@gmail.com"
                className="flex items-center gap-3 rounded-lg border bg-card p-3 hover:border-primary/30 transition-colors"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="text-xs font-medium text-foreground truncate">
                    apexarcengineering@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="tel:+923009742946"
                className="flex items-center gap-3 rounded-lg border bg-card p-3 hover:border-primary/30 transition-colors"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</div>
                  <div className="text-xs font-medium text-foreground">0300 9742946</div>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Location</div>
                  <div className="text-xs font-medium text-foreground">Sector I-9/3, Industrial Area, Islamabad, Pakistan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hours</div>
                  <div className="text-xs font-medium text-foreground">Mon – Sat · 9 – 7</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border bg-card p-4 sm:p-6 shadow-elegant space-y-3"
              noValidate
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    maxLength={255}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Organisation (optional)"
                  maxLength={200}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Project details *</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Scope, location, timeline."
                  rows={3}
                  maxLength={4000}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                {sending ? "Sending…" : "Send enquiry"}{" "}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default Home;
