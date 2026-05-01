import { useState } from "react";
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
import heroImg from "@/assets/hero-industrial.jpg";
import aboutTeamImg from "@/assets/about-team.jpg";
import serviceAutomationImg from "@/assets/service-automation.jpg";
import serviceWeldingImg from "@/assets/service-welding.jpg";
import serviceElectricalImg from "@/assets/service-electrical.jpg";
import capabilityMonitoringImg from "@/assets/capability-monitoring.jpg";
import capCivilImg from "@/assets/cap-civil.jpg";
import capAutomationImg from "@/assets/cap-automation.jpg";
import capEnergyImg from "@/assets/cap-energy.jpg";
import {
  ArrowRight,
  Bolt,
  Wrench,
  Building2,
  Cpu,
  Cog,
  Activity,
  HardHat,
  Boxes,
  Database,
  CircuitBoard,
  PanelsTopLeft,
  Flame,
  LifeBuoy,
  PencilRuler,
  Layers,
  Mail,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";

/* ---------- Engineering Domains (9) ---------- */
const domains = [
  { icon: Bolt, title: "Electrical & Power Systems", desc: "LT/HT panels, distribution, protection." },
  { icon: Cog, title: "Mechanical Systems Engineering", desc: "Heavy fabrication, HVAC, fluid systems." },
  { icon: Building2, title: "Structural & Civil Engineering", desc: "Industrial sheds, foundations, MEP civil." },
  { icon: Cpu, title: "Industrial Automation", desc: "PLC, SCADA, HMI, process control." },
  { icon: CircuitBoard, title: "Electronics & Embedded Systems", desc: "Sensors, controllers, IoT devices." },
  { icon: Activity, title: "Digital Operations & Monitoring", desc: "Real-time analytics & dashboards." },
  { icon: LifeBuoy, title: "Industrial Maintenance Services", desc: "Preventive, predictive, breakdown care." },
  { icon: Database, title: "Electrical Asset Management", desc: "Asset tagging, audits, AMC contracts." },
  { icon: Boxes, title: "Parts & Supply Chain Management", desc: "OEM parts, spares, vendor logistics." },
];

/* ---------- Key Services (6) ---------- */
const services = [
  { icon: PanelsTopLeft, title: "PLC / HMI Automation", desc: "Sensors, actuators & control logic.", image: serviceAutomationImg },
  { icon: Bolt, title: "Power & Control Panels", desc: "Design, build & site installation.", image: serviceElectricalImg },
  { icon: Flame, title: "Welding & Cutting", desc: "Multi-process facilities on site.", image: serviceWeldingImg },
  { icon: Wrench, title: "Maintenance & Recovery", desc: "Breakdown response & uptime care.", image: capAutomationImg },
  { icon: PencilRuler, title: "Design & Consultancy", desc: "Engineering drafting & advisory.", image: capCivilImg },
  { icon: Layers, title: "Structural Fabrication", desc: "Pathways, frames & support works.", image: capEnergyImg },
];

const stats = [
  { value: "12+", label: "Years" },
  { value: "200+", label: "Projects" },
  { value: "60+", label: "Clients" },
  { value: "30+", label: "Engineers" },
];

const why = [
  { icon: Layers, title: "Multi-domain expertise" },
  { icon: HardHat, title: "Safety-first culture" },
  { icon: CheckCircle2, title: "BOQ-driven delivery" },
  { icon: Activity, title: "Smart monitoring built-in" },
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
    email: "arcengineering86@gmail.com",
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
          <ImageWithFallback
            src={heroImg}
            alt="Industrial power plant at blue hour"
            className="h-full w-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
            fallbackClassName="bg-gradient-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
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

      {/* ABOUT */}
      <Section id="about" ariaLabelledBy="about-heading" className="bg-background">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
          <Reveal className="order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              About
            </span>
            <h2
              id="about-heading"
              className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
            >
              A multi-disciplinary engineering partner for industry.
            </h2>
            <div className="mt-5 space-y-4 text-base md:text-lg text-muted-foreground">
              <p>
                Apex Arc Engineering delivers integrated{" "}
                <strong className="text-foreground">
                  electrical, civil, mechanical, automation and energy
                </strong>{" "}
                solutions to factories, mills and large commercial clients across Pakistan.
              </p>
              <p>
                Design, fabrication, installation and long-term maintenance — under one
                accountable team with documented BOQ-driven workflow.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border shadow-elegant">
              <ImageWithFallback
                src={aboutTeamImg}
                alt="Apex Arc engineers reviewing schematics in a control room"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                width={1280}
                height={896}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/10 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SERVICES (Engineering Domains) */}
      <Section
        id="services"
        ariaLabelledBy="services-heading"
        className="bg-muted/40 border-y"
      >
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Engineering domains
          </span>
          <h2
            id="services-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Nine engineering domains, one accountable team.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
          {domains.map((d, i) => (
            <Reveal key={d.title} delay={i * 40}>
              <article className="group h-full rounded-xl border bg-card p-3 sm:p-4 md:p-5 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30">
                <span className="inline-grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <d.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="mt-2 sm:mt-3 font-display text-sm sm:text-base font-semibold text-foreground leading-tight">
                  {d.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug hidden sm:block">
                  {d.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DOMAINS (Key Services) */}
      <Section id="domains" ariaLabelledBy="domains-heading" className="bg-background">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Key services
          </span>
          <h2
            id="domains-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Engineering services we deliver on site.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <article className="group h-full rounded-xl border bg-gradient-to-br from-card to-muted/40 p-4 sm:p-5 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-accent/40 hover:scale-[1.02]">
                <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-sm sm:text-base font-semibold text-foreground leading-tight">
                  {s.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                  {s.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CAPABILITIES (Why choose us, condensed) */}
      <Section
        id="capabilities"
        ariaLabelledBy="capabilities-heading"
        className="bg-primary text-primary-foreground"
      >
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Capabilities
          </span>
          <h2
            id="capabilities-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
          >
            Built for industrial-grade execution.
          </h2>
        </Reveal>

        <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="group h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 ease-smooth hover:bg-white/10 hover:-translate-y-1 hover:border-accent/40">
                <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-accent/20 text-accent transition-transform group-hover:scale-110">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-sm sm:text-base font-semibold leading-tight">
                  {w.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

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
                href="mailto:arcengineering86@gmail.com"
                className="flex items-center gap-3 rounded-lg border bg-card p-3 hover:border-primary/30 transition-colors"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="text-xs font-medium text-foreground truncate">
                    arcengineering86@gmail.com
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
                  <div className="text-xs font-medium text-foreground">Pakistan · nationwide</div>
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
