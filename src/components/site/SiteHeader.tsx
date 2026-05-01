import { useEffect, useState, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/lib/auth-context";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav: { href: string; label: string; id: string }[] = [
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Domains", id: "services" },
  { href: "#domains", label: "Services", id: "domains" },
  { href: "#capabilities", label: "Capabilities", id: "capabilities" },
  { href: "#contact", label: "Contact", id: "contact" },
];

interface SiteHeaderProps {
  scrollerRef?: RefObject<HTMLDivElement>;
}

const SiteHeader = ({ scrollerRef }: SiteHeaderProps) => {
  const { user, isAdmin } = useAuth();
  const panelHref = isAdmin ? "/admin" : "/staff";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const root = scrollerRef?.current ?? null;
    const ids = ["home", ...nav.map((n) => n.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root, threshold: [0.4, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, scrollerRef]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 sm:h-20 items-center justify-between gap-3">
        <Link
          to="/"
          aria-label="Apex Arc Engineering — home"
          className="flex items-center min-w-0 shrink-0 transition-opacity hover:opacity-90"
        >
          <BrandLogo className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const isActive = isHome && active === n.id;
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {n.label}
                {isActive && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
              <Link to={panelHref}>{isAdmin ? "Admin panel" : "Staff panel"}</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Employee login</Link>
            </Button>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-md border bg-background hover:bg-muted transition-smooth"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-lg animate-fade-in">
          <nav className="container py-3 flex flex-col">
            {nav.map((n) => {
              const isActive = isHome && active === n.id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-2 py-3 text-sm font-medium border-b last:border-b-0 transition-smooth",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {n.label}
                </a>
              );
            })}
            <div className="pt-3">
              {user ? (
                <Button asChild variant="hero" size="sm" className="w-full" onClick={() => setOpen(false)}>
                  <Link to={panelHref}>{isAdmin ? "Admin panel" : "Staff panel"}</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm" className="w-full" onClick={() => setOpen(false)}>
                  <Link to="/login">Employee login</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
