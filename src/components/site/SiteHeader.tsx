import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/lib/auth-context";
import { Menu, X } from "lucide-react";

const nav: { href: string; label: string }[] = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#domains", label: "Domains" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

const SiteHeader = () => {
  const { user, isAdmin } = useAuth();
  const panelHref = isAdmin ? "/admin" : "/staff";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 sm:h-20 items-center justify-between gap-3">
        <Link
          to="/"
          aria-label="Apex Arc Engineering — home"
          className="flex items-center min-w-0 shrink-0 transition-opacity hover:opacity-90"
        >
          <BrandLogo
            className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
            >
              {n.label}
            </a>
          ))}
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
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary border-b last:border-b-0"
              >
                {n.label}
              </a>
            ))}
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
