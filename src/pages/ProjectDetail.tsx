import { ArrowLeft, Factory, Info, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ImageWithFallback from "@/components/ImageWithFallback";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { projectLookup } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projectLookup[slug] : undefined;

  if (!project) {
    return (
      <main className="container py-16">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="font-display text-3xl font-bold text-foreground">Project not found</h1>
          <p className="mt-3 text-muted-foreground">The requested project is unavailable.</p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Back to home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Seo
        title={`${project.title} | Apex Arc Engineering`}
        description={project.description}
        image={project.image}
      />

      <main className="container py-8 md:py-12">
        <div className="mb-6">
          <Link to="/#projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Featured Project</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                <Factory className="mr-2 h-4 w-4" />
                {project.relatedService}
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border bg-card shadow-elegant">
            <ImageWithFallback
              src={project.image}
              alt={`${project.title} project`}
              className="h-full w-full object-cover"
              width={1200}
              height={900}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Info className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Project overview</h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">{project.overview}</p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Wrench className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Manufacturing details</h2>
            </div>
            <ul className="space-y-3 text-base text-muted-foreground">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border bg-muted/30 p-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Technical information</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This project profile supports Apex Arc Engineering's technical capability in industrial manufacturing,
            design, automation and service execution. The work highlights the team's approach to quality compliance,
            operational reliability and fit-for-purpose engineering solutions.
          </p>
        </div>
      </main>
    </>
  );
};

export default ProjectDetail;
