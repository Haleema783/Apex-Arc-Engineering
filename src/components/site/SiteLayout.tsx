import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const SiteLayout = () => {
  const { pathname, hash } = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Enable snap scrolling only on the homepage
  const snap = pathname === "/";

  // Intercept in-page hash links so they scroll the inner snap container,
  // not the document body (otherwise the snap container ignores them).
  useEffect(() => {
    if (!snap) return;
    const scrollToHash = (targetHash: string) => {
      const id = targetHash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el && scrollerRef.current?.contains(el)) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (hash) {
      scrollToHash(hash);
    }

    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname !== pathname || !url.hash) return;
      const id = url.hash.slice(1);
      const el = document.getElementById(id);
      if (!el || !scrollerRef.current?.contains(el)) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `${url.pathname}${url.hash}`);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [hash, pathname, snap]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader scrollerRef={scrollerRef} />
      {snap ? (
        <main
          ref={scrollerRef}
          className="flex-1 h-[calc(100svh-4rem)] sm:h-[calc(100svh-5rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth"
        >
          <Outlet />
          <SiteFooter />
        </main>
      ) : (
        <>
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </>
      )}
    </div>
  );
};

export default SiteLayout;
