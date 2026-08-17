import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const SiteFooter = () => (
  <footer className="border-t border-border/60 bg-gradient-surface">
    <div className="container py-12 grid gap-8 md:grid-cols-3">
      <div>
        <Link to="/" aria-label="Apex Arc Engineering — home" className="inline-block">
          <BrandLogo className="h-12 w-auto max-w-[220px]" loading="lazy" />
        </Link>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs">
          Multi-disciplinary engineering enterprise — electrical, mechanical, civil,
          industrial, automation and energy solutions across Pakistan.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Product</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/login" className="hover:text-foreground">Employee login</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary shrink-0" />
            <a href="tel:+923009742946" className="hover:text-foreground">
              0300 9742946
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <a href="mailto:arcengineering86@gmail.com" className="hover:text-foreground break-all">
              arcengineering86@gmail.com
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
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
