import Seo from "@/components/Seo";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useReveal } from "@/hooks/useReveal";
import ceoPortrait from "@/assets/ceo-potrait.jpeg";
import capElectricalImg from "@/assets/cap-electrical.jpg";
import capAutomationImg from "@/assets/cap-automation.jpg";
import { Eye, Target } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const About = () => (
  <>
    <Seo
      title="About Us | Apex Arc Engineering"
      description="Apex Arc Engineering — a multi-disciplinary engineering enterprise delivering electrical, automation, mechanical and energy solutions. Message from our CEO, our vision and mission."
      image={ceoPortrait}
    />

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
                  src={capElectricalImg}
                  alt="Electrical switchgear installation by Apex Arc Engineering"
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
                  src={capAutomationImg}
                  alt="Industrial automation control panel"
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

    {/* SECTION 3 — VISION & MISSION */}
    <section aria-labelledby="vm-heading" className="bg-background">
      <div className="container py-14 md:py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Direction
          </span>
          <h2
            id="vm-heading"
            className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
          >
            Vision &amp; Mission
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 md:gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border bg-card p-6 sm:p-8 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30">
              <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-foreground">
                Vision
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                To become a leading provider of electrical, electronic and solar
                solutions by building a strong technical team and delivering
                innovative and reliable engineering solutions.
              </p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="h-full rounded-2xl border bg-card p-6 sm:p-8 shadow-card transition-all duration-300 ease-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-accent/40">
              <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground shadow-glow">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-foreground">
                Mission
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                Our mission is to provide trustworthy, high-quality solutions with
                strong client commitment, innovation, and professionalism while
                becoming a leading turnkey solutions provider.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    {/* PROFESSIONAL CERTIFICATIONS */}
    <section aria-labelledby="certs-heading" className="bg-muted/40 border-t">
      <div className="container py-14 md:py-20">
        <Reveal className="max-w-2xl">
          <h2 id="certs-heading" className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            PROFESSIONAL CERTIFICATIONS
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Our team members hold professional certifications and practical training credentials in electrical technology, PLC systems, electronics, circuit design, and computer hardware.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Electrical Technology (PLC Electrician)", issuer: "NAVTTC", period: "March 2022 – September 2022" },
            { title: "Advanced Electronics (PCB Design & Fabrication)", issuer: "NAVTTC", period: "March 2022 – September 2022" },
            { title: "Industrial Electricity", issuer: "NAVTTC", period: "November 2017 – April 2018" },
            { title: "Electronics Circuit Designing & Implementation", issuer: "NIE", period: "March 2013 – May 2013" },
            { title: "Computer Hardware", issuer: "NIE", period: "March 2013 – May 2013" },
          ].map((c) => (
            <Reveal key={c.title}>
              <article className="rounded-xl border bg-card p-4 shadow-card">
                <div className="h-40 w-full bg-muted flex items-center justify-center rounded-md">
                  <div className="text-sm text-muted-foreground text-center">
                    <div className="font-semibold">CERTIFICATE IMAGE</div>
                    <div className="mt-1">TEMPORARY PLACEHOLDER</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-display font-semibold text-foreground">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.issuer} · {c.period}</div>
                  <div className="mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">VIEW CERTIFICATE</Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{c.title}</DialogTitle>
                          <DialogDescription>{c.issuer} · {c.period}</DialogDescription>
                        </DialogHeader>

                        <div className="mt-4">
                          <div className="h-72 w-full bg-muted flex items-center justify-center rounded-md">
                            <div className="text-sm text-muted-foreground text-center">
                              <div className="font-semibold">CERTIFICATE IMAGE</div>
                              <div className="mt-1">TEMPORARY PLACEHOLDER</div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
