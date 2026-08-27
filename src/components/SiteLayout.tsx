import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useContent } from "@/lib/content-store";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
] as const;

function Header() {
  const { settings } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full surface-navy border-b border-white/10 backdrop-blur transition-all duration-300 ${
        scrolled ? "py-1 shadow-lift" : "py-3"
      }`}
    >
      <div className="shell flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/60 font-display text-sm font-bold text-gold-soft">
            ME
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-wide sm:text-base">
              MERRYSA EXIM LLP
            </span>
            <span className="hidden text-[0.65rem] tracking-[0.16em] text-gold-soft/90 uppercase sm:block">
              Global Sourcing • Wholesale • Export • Import
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "bg-white/10 text-white" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-gold hidden sm:inline-flex">
            {settings.ctaText}
          </Link>
          <button
            type="button"
            className="btn btn-ghost-light px-3 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 pt-3 pb-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
              activeProps={{ className: "bg-white/10 text-white" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-gold mt-2">
            {settings.ctaText}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const { company, settings } = useContent();

  return (
    <footer className="surface-navy">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-lg font-bold">{company.name}</h2>
          <div className="gold-rule mt-3" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {company.footerText}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-soft uppercase">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link to="/about" className="hover:text-gold-soft">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gold-soft">
                Services
              </Link>
            </li>
            <li>
              <Link to="/capabilities" className="hover:text-gold-soft">
                Capabilities
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-gold-soft">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-soft uppercase">
            Business
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link to="/industries" className="hover:text-gold-soft">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/services" hash="trade-process" className="hover:text-gold-soft">
                Trade Process
              </Link>
            </li>
            <li>
              <Link to="/capabilities" hash="global-reach" className="hover:text-gold-soft">
                Global Reach
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-soft">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-soft uppercase">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={`tel:${settings.phone}`} className="hover:text-gold-soft">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="break-all hover:text-gold-soft">
                {settings.email}
              </a>
            </li>
            <li>Pune, Maharashtra, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>{settings.copyright}</p>
          <Link
            to="/admin"
            className="rounded-full border border-white/20 px-3 py-1.5 text-white/70 transition-colors hover:border-gold/60 hover:text-gold-soft"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="surface-navy">
      <div className="shell py-16 sm:py-20">
        <p className="eyebrow-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <div className="gold-rule mt-5" />
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
