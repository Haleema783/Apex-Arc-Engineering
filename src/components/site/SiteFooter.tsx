import { Link } from "react-router-dom";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/partners", label: "Our Clients & Partners" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#contact", label: "Contact" },
];

const SiteFooter = () => (
  <footer className="border-t border-border/60 bg-gradient-surface">
    <div className="container py-10 md:py-12 grid gap-6 grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1.1fr]">
      <div className="min-w-0">
        <Link to="/" aria-label="Apex Arc Engineering — home" className="inline-block max-w-full">
          <BrandLogo className="h-12 w-auto max-w-[220px]" loading="lazy" />
        </Link>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
          Multi-disciplinary engineering enterprise — electrical, mechanical, civil,
          industrial, automation and energy solutions across Pakistan.
        </p>
      </div>

      <div className="min-w-0">
        <h4 className="font-semibold text-sm mb-3">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {footerNav.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="inline-flex items-center gap-1 hover:text-foreground break-words">
                {item.label}
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0">
        <h4 className="font-semibold text-sm mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2 min-w-0">
            <Phone className="h-4 w-4 text-primary shrink-0" />
            <a href="tel:+923009742946" className="hover:text-foreground break-all">
              0300 9742946
            </a>
          </li>
          <li className="flex items-center gap-2 min-w-0">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <a href="mailto:apexarcengineering@gmail.com" className="hover:text-foreground break-all">
              apexarcengineering@gmail.com
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          FBR-aligned tax engine, NTN-ready invoices, KAPRA &amp; PEPRA support.
        </p>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container py-4 text-xs text-muted-foreground flex flex-col sm:flex-row justify-center gap-2 text-center">
        <span>© {new Date().getFullYear()} Apex Arc Engineering. All rights reserved. | Made by Zintrex Studio | +923175612277</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
