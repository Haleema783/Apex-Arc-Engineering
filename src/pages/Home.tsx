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
import capElectrical from "@/assets/cap-electrical.jpg";
import capCivil from "@/assets/cap-civil.jpg";
import capAutomation from "@/assets/cap-automation.jpg";
import capEnergy from "@/assets/cap-energy.jpg";
import {
  ArrowRight,
  Bolt,
  HardHat,
  Wrench,
  Building2,
  Cpu,
  Factory,
  Zap,
  ShieldCheck,
  Layers,
  Globe2,
  Gauge,
  Award,
  Mail,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Bolt,
    title: "Electrical Engineering",
    desc: "LT/HT panels, substations, distribution systems, control & instrumentation, factory electrification and protective relay coordination.",
  },
  {
    icon: Building2,
    title: "Civil & Infrastructure",
    desc: "Industrial sheds, foundations, machine pedestals, substation civil works and turnkey civil packages for greenfield plants.",
  },
  {
    icon: Factory,
    title: "Industrial Engineering",
    desc: "Plant layout, process piping, utilities, structural fabrication and full mechanical-electrical-plumbing (MEP) integration.",
  },
  {
    icon: Wrench,
    title: "Mechanical Engineering",
    desc: "Heavy fabrication, HVAC, compressed air, fluid systems, on-site welding, erection and commissioning of process equipment.",
  },
  {
    icon: Cpu,
    title: "Automation & Smart Systems",
    desc: "PLC / SCADA programming, HMI panels, industrial IoT, energy monitoring and intelligent control upgrades for legacy plants.",
  },
  {
    icon: Zap,
    title: "Energy & Power Solutions",
    desc: "Solar PV systems, captive power, transformers, capacitor banks, power-quality audits and energy-efficiency retrofits.",
  },
];

const domains = [
  { icon: Bolt, label: "Electrical" },
  { icon: Building2, label: "Civil" },
  { icon: Wrench, label: "Mechanical" },
  { icon: Factory, label: "Industrial" },
  { icon: Zap, label: "Energy" },
  { icon: Cpu, label: "Automation" },
];

const capabilities = [
  {
    img: capElectrical,
    title: "Power & Control Systems",
    desc: "Complete switchgear rooms, MCC panels, busways and SCADA-integrated control systems for process industries.",
  },
  {
    img: capCivil,
    title: "Industrial Infrastructure",
    desc: "Greenfield factory shells, structural steel buildings, heavy foundations and turnkey civil packages.",
  },
  {
    img: capAutomation,
    title: "Smart Manufacturing",
    desc: "Robotics integration, PLC retrofits, MES connectivity and Industry 4.0 upgrades for existing production lines.",
  },
  {
    img: capEnergy,
    title: "Energy Infrastructure",
    desc: "Solar plants, grid-tie systems, transformer yards and end-to-end EPC for medium and high-voltage assets.",
  },
];

const stats = [
  { value: "12+", label: "Years of operations" },
  { value: "200+", label: "Projects delivered" },
  { value: "60+", label: "Active enterprise clients" },
  { value: "30+", label: "Engineers & technicians" },
];

const why = [
  {
    icon: Layers,
    title: "Multi-domain expertise",
    desc: "Electrical, civil, mechanical, automation and energy — engineered under one accountable team.",
  },
  {
    icon: Gauge,
    title: "Scalable execution",
    desc: "From single-line panel jobs to full-plant EPC contracts, with transparent BOQ-based pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Industrial-grade reliability",
    desc: "Compliant designs, certified materials and audited rate history on every line item.",
  },
  {
    icon: Globe2,
    title: "Technology integration",
    desc: "PLC/SCADA, IoT and energy analytics built into every install — your plant talks back to you.",
  },
  {
    icon: Award,
    title: "Professional standards",
    desc: "Documented quotations, milestone-based delivery, after-sales AMC contracts and FBR-aligned billing.",
  },
  {
    icon: HardHat,
    title: "Safety-first culture",
    desc: "Trained crews, PPE-mandatory sites and method statements for every critical activity.",
  },
];

/* ---- Validation ---- */
const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be 100 characters or less" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be 255 characters or less" }),
  company: z
    .string()
    .trim()
    .max(200, { message: "Company name must be 200 characters or less" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, { message: "Please share a few details (min 5 characters)" })
    .max(4000, { message: "Message must be 4000 characters or less" }),
});

/* ---- Reveal wrapper ---- */
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

const Home = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "Please review your details",
        description: first?.message ?? "Some fields need attention.",
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
        description:
          "Thanks — your message has reached our engineering team. We typically respond within 1–2 working days.",
      });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not submit your inquiry.";
      toast({
        title: "Submission failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  /* ---- JSON-LD structured data ---- */
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Apex Arc Engineering",
    url: typeof window !== "undefined" ? window.location.origin : undefined,
    email: "arcengineering86@gmail.com",
    description:
      "Multi-disciplinary engineering enterprise delivering electrical, civil, mechanical, industrial, automation and energy solutions across Pakistan.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    areaServed: "PK",
    sameAs: [],
  };

  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.desc,
      provider: { "@type": "Organization", name: "Apex Arc Engineering" },
    })),
  };

  return (
    <>
      <Seo
        title="Apex Arc Engineering — Integrated Engineering Solutions for Industry"
        description="Apex Arc Engineering is a multi-disciplinary engineering enterprise delivering electrical, civil, mechanical, industrial, automation and energy solutions at scale across Pakistan."
        image={heroImg}
        jsonLd={[orgLd, servicesLd]}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-primary-foreground"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Industrial power plant and electrical grid at blue hour"
            className="h-full w-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
            fallbackClassName="bg-gradient-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, hsl(38 92% 60% / 0.35), transparent 45%), radial-gradient(circle at 85% 75%, hsl(200 90% 60% / 0.3), transparent 45%)",
            }}
          />
        </div>

        <div className="container relative py-24 md:py-36 lg:py-44 animate-fade-in">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Multi-disciplinary engineering enterprise · Pakistan
            </span>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
            >
              Integrated Engineering Solutions <span className="text-accent">Across Industries</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              Delivering Industrial, Electrical, Civil, Mechanical & Smart Engineering
              services at enterprise scale — from greenfield plants to large-scale modernisation.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg" className="text-base">
                <a href="#services">
                  Explore services <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground text-base"
              >
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="relative border-t border-white/10 bg-primary/40 backdrop-blur-md">
          <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-4 text-center md:text-left">
                <div className="font-display text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/75 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container py-20 md:py-28" aria-labelledby="about-heading">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          <Reveal className="md:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About the enterprise</span>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
            >
              A multi-disciplinary engineering partner for industry.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Apex Arc Engineering is a Pakistan-based engineering enterprise delivering
              integrated <strong className="text-foreground">electrical, civil, mechanical, industrial, automation and energy</strong> solutions
              to factories, mills, infrastructure projects and large commercial clients.
            </p>
            <p>
              We bring design, fabrication, installation and long-term maintenance under one
              accountable team — combining seasoned engineers, certified electricians and
              fabricators with a documented BOQ-driven workflow and FBR-aligned billing.
            </p>
            <p>
              From a single LT panel to a turnkey factory, our delivery model scales with the
              project — built on innovation, reliability and industrial excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-muted/40 border-y" aria-labelledby="services-heading">
        <div className="container py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Core services</span>
            <h2
              id="services-heading"
              className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
            >
              Enterprise engineering services, end-to-end.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Six core practices, fully integrated — so your project doesn't get handed off
              between disconnected vendors.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="group h-full rounded-xl border bg-card p-7 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1.5 hover:border-primary/30">
                  <span className="inline-grid h-12 w-12 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center text-sm font-medium text-primary gap-1 transition-all duration-300 group-hover:gap-2 group-hover:text-primary-glow">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section id="domains" className="container py-20 md:py-28" aria-labelledby="domains-heading">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Engineering domains</span>
          <h2
            id="domains-heading"
            className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
          >
            Six engineering domains, one accountable team.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {domains.map((d, i) => (
            <Reveal key={d.label} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-xl border bg-gradient-to-br from-card to-muted/40 p-6 text-center shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-accent/40">
                <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="inline-grid h-14 w-14 place-items-center rounded-full bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <d.icon className="h-6 w-6" />
                </span>
                <div className="mt-4 font-display font-semibold text-foreground">{d.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAPABILITIES / PROJECTS */}
      <section id="capabilities" className="bg-primary text-primary-foreground" aria-labelledby="capabilities-heading">
        <div className="container py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projects & capabilities</span>
            <h2
              id="capabilities-heading"
              className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            >
              Enterprise-scale engineering capabilities.
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              From substation construction to smart-factory upgrades, we engineer industrial
              systems that operate at scale — and stay running.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-elegant">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={c.img}
                      alt={c.title}
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                      fallbackClassName="bg-gradient-to-br from-primary-glow/30 via-primary/40 to-accent/20"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">{c.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="container py-20 md:py-28" aria-labelledby="why-heading">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why choose us</span>
          <h2
            id="why-heading"
            className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
          >
            Built for industrial-grade execution.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="group h-full rounded-xl border bg-card p-7 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-accent/30">
                <span className="inline-grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-muted/40 border-y" aria-labelledby="contact-heading">
        <div className="container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</span>
              <h2
                id="contact-heading"
                className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
              >
                Tell us about your project.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Share your drawing, BOQ or scope. Our engineering team will respond with a
                site visit or itemised proposal — usually within 1–2 working days.
              </p>

              <div className="mt-10 space-y-5">
                <a href="mailto:arcengineering86@gmail.com" className="flex items-start gap-4 group">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Official email</h3>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors break-all">
                      arcengineering86@gmail.com
                    </div>
                  </div>
                </a>
                <a href="tel:+923009742946" className="flex items-start gap-4 group">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Phone</h3>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      0300 9742946
                    </div>
                    <div className="text-xs text-muted-foreground">Tap to call · Mon – Sat</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Location</h3>
                    <div className="font-medium text-foreground">Pakistan</div>
                    <div className="text-xs text-muted-foreground">Serving enterprise clients nationwide</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Working hours</h3>
                    <div className="font-medium text-foreground">Mon – Sat · 9:00 AM – 7:00 PM</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Inquiry form */}
            <Reveal delay={120}>
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border bg-card p-6 sm:p-8 shadow-elegant space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
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
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Organisation (optional)"
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project details *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the scope, location and timeline."
                    rows={5}
                    maxLength={4000}
                    required
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                  {sending ? "Sending…" : "Send enquiry"} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                  Your inquiry is delivered securely to our engineering team — no email client required.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
