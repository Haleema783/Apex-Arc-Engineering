import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import {
  ArrowRight,
  Bolt,
  HardHat,
  Wrench,
  Building2,
  FileText,
  Package,
  Calculator,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Award,
  Factory,
} from "lucide-react";

const features = [
  { icon: FileText, title: "Quote → Invoice flow", desc: "One-click conversion from quotation to bill, invoice and delivery challan." },
  { icon: Package, title: "Inventory + rate history", desc: "Last 3 client rates suggested on every line item." },
  { icon: Calculator, title: "FBR-ready tax engine", desc: "FST 17%, IT 3%, KAPRA 1%, PEPRA 4%, inclusive or exclusive." },
  { icon: ShieldCheck, title: "Audit trail", desc: "Every rate change, document and approval is tracked." },
];

const disciplines = [
  { icon: Bolt, label: "Electrical" },
  { icon: Wrench, label: "Mechanical" },
  { icon: Building2, label: "Civil" },
  { icon: HardHat, label: "Industrial" },
];

const services = [
  {
    icon: Bolt,
    title: "Electrical Engineering",
    desc: "LT/HT panel manufacturing, distribution boards, control systems, factory wiring, lighting design and power distribution for industrial and commercial sites.",
  },
  {
    icon: Wrench,
    title: "Mechanical Engineering",
    desc: "Fabrication, structural steel, piping, HVAC ducting, on-site welding and installation services for plants and process facilities.",
  },
  {
    icon: Building2,
    title: "Civil & Structural",
    desc: "Foundations, sheds, machine pedestals, civil works for substations and turnkey works for new and expanding factories.",
  },
  {
    icon: Factory,
    title: "Industrial Maintenance",
    desc: "Annual maintenance contracts, breakdown support, panel retrofits, preventive maintenance and shutdown jobs across mills and factories.",
  },
];

const stats = [
  { value: "12+", label: "Years in business" },
  { value: "200+", label: "Projects delivered" },
  { value: "60+", label: "Active clients" },
  { value: "30+", label: "Engineers & technicians" },
];

const why = [
  "Licensed contractors with experienced engineers and certified electricians",
  "FBR-aligned invoicing with NTN, sales tax, IT, KAPRA & PEPRA support",
  "On-site survey, transparent BOQ-based quotations and clear delivery timelines",
  "After-sales support and AMC contracts for installed systems",
];

const Home = () => (
  <>
    <Seo
      title="Apex Arc Engineering — Electrical, Mechanical & Civil Contractors in Pakistan"
      description="Apex Arc Engineering designs, fabricates, installs and maintains electrical, mechanical and civil systems for factories, mills and commercial projects across Pakistan."
    />
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(38 92% 60% / 0.4), transparent 40%), radial-gradient(circle at 80% 60%, hsl(200 90% 60% / 0.3), transparent 40%)",
        }}
      />
      <div className="container relative py-20 md:py-32 grid gap-10 md:grid-cols-2 items-center animate-fade-in">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Engineering contractors · Pakistan · FBR-registered
          </span>
          <h1 className="mt-6 font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Apex Arc Engineering
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-primary-foreground/90 font-medium">
            End-to-end electrical, mechanical & civil engineering solutions.
          </p>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-xl">
            We design, fabricate, install and maintain industrial systems for factories,
            mills, commercial buildings and infrastructure projects across Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/login">
                Employee login <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
              <a href="#contact">Request a quote</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {disciplines.map((d) => (
              <div key={d.label} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <d.icon className="h-4 w-4 text-accent" /> {d.label}
              </div>
            ))}
          </div>
        </div>

        {/* Stat card */}
        <div className="relative animate-fade-in-slow">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-elegant">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/70">
              <Award className="h-4 w-4 text-accent" /> A trusted engineering partner
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-white/5 p-4">
                  <div className="font-display text-2xl font-bold text-accent">{s.value}</div>
                  <div className="text-xs text-primary-foreground/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              {why.slice(0, 2).map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary-foreground/85">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* About */}
    <section id="about" className="container py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">About us</span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Trusted electrical, mechanical & civil engineering contractor in Pakistan.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Apex Arc Engineering is a Pakistan-based engineering contractor specialising in
            electrical, mechanical and civil works for industrial and commercial clients. From
            LT/HT panel manufacturing to complete factory electrification, structural fabrication
            and ongoing maintenance — we run every job on documented quotations, BOQs and FBR-aligned
            invoicing so our clients always know what they're paying for.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our in-house team of engineers, electricians and fabricators handles design, supply,
            installation and after-sales support, backed by an audited inventory and rate history
            for every line item.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" /> Why clients choose us
          </h3>
          <ul className="mt-4 space-y-3">
            {why.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Services */}
    <section id="services" className="bg-muted/30 border-y">
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our services</span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Turnkey engineering services — electrical, mechanical, civil & maintenance.
          </h2>
          <p className="mt-3 text-muted-foreground">
            We cover four core disciplines under one roof, so your project doesn't get
            handed off across multiple vendors.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-6 shadow-card hover:shadow-elegant transition-smooth">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Internal platform */}
    <section className="container py-16 md:py-20">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Inside the workshop</span>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          A back office built for engineering work.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every job is tracked end-to-end on our internal ERP — quotations, inventory, rate
          history, taxes, payments and delivery challans — so finance and the field stay in sync.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6 shadow-card hover:shadow-elegant transition-smooth">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="bg-muted/30 border-y">
      <div className="container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get in touch</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Tell us about your project.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send a drawing, a BOQ, or just describe what you need. Our team will get back to
              you with a site visit or an itemised quotation, usually within 1–2 working days.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
            <a href="mailto:arcengineering86@gmail.com" className="flex items-start gap-3 group">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-medium text-foreground group-hover:text-primary transition-smooth break-all">
                  arcengineering86@gmail.com
                </div>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                <div className="font-medium text-foreground">Available on request</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                <div className="font-medium text-foreground">Pakistan</div>
                <div className="text-xs text-muted-foreground">Serving clients nationwide</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Working hours</div>
                <div className="font-medium text-foreground">Mon – Sat · 9:00 AM – 7:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
);

export default Home;
