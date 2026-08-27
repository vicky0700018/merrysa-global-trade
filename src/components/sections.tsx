import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useContent } from "@/lib/content-store";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={light ? "eyebrow-gold" : "eyebrow"}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-rule mt-4 ${center ? "mx-auto" : ""}`} />
      {description ? (
        <p
          className={`mt-4 text-sm leading-relaxed sm:text-base ${
            light ? "text-white/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function IntroSection() {
  const { about } = useContent();
  return (
    <section className="section-pad bg-background">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title="Connecting Businesses Through Global Trade"
            description="Merrysa Exim LLP focuses on wholesale sourcing, B2B distribution and international trade operations. We help businesses procure commercial goods in bulk from manufacturers and industrial producers, supply retailers and institutional buyers, and coordinate cross-border movement of wholesale commodities."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/about" className="btn btn-primary">
              {about.cta}
            </Link>
            <Link to="/services" className="btn btn-outline">
              View Services
            </Link>
          </div>
        </div>
        <div className="card-base p-6 sm:p-8">
          <p className="eyebrow">Trade Focus</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[
              "Bulk sourcing from manufacturers and industrial producers",
              "B2B distribution to retailers and commercial clients",
              "Institutional and organisational bulk supply",
              "Cross-border logistics and customs coordination",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  const { stats } = useContent();
  return (
    <section className="bg-surface py-12">
      <div className="shell">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="card-base card-hover p-6">
              <p className="eyebrow">{stat.caption}</p>
              <p className="mt-3 font-display text-3xl font-bold text-corporate sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Figures shown are demo values for presentation purposes and are editable from the admin
          panel.
        </p>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { about } = useContent();
  return (
    <section className="section-pad bg-background">
      <div className="shell grid items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={about.image}
              alt="Merrysa Exim LLP team reviewing export trade documentation"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 rounded-2xl surface-navy p-5 sm:absolute sm:-right-4 sm:-bottom-8 sm:mt-0 sm:max-w-xs">
            <p className="eyebrow-gold">Business Focus</p>
            <p className="mt-2 text-sm text-white/80">
              Wholesale trade, export-import operations and B2B supply coordination from Pune,
              Maharashtra, India.
            </p>
          </div>
        </div>
        <div className="lg:pl-4">
          <SectionHeading eyebrow="About Us" title={about.heading} description={about.description} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-border bg-surface p-3 text-sm text-foreground"
              >
                <span aria-hidden="true" className="font-bold text-gold">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary mt-7">
            Talk To Our Trade Desk
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const { services } = useContent();
  const visible = useMemo(
    () => services.filter((s) => s.enabled).sort((a, b) => a.order - b.order),
    [services],
  );

  return (
    <section id="services" className="section-pad bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Services"
          title="Wholesale & Global Trade Services"
          description="End-to-end support across sourcing, distribution and cross-border trade coordination."
          center
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((service) => (
            <article key={service.id} className="card-base card-hover flex flex-col p-6">
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-xl surface-navy font-display text-xl text-gold-soft"
              >
                {service.glyph}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <Link
                to="/contact"
                className="mt-5 text-sm font-semibold text-royal transition-colors hover:text-corporate"
              >
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  const { capabilities, regions } = useContent();
  const visible = capabilities.filter((c) => c.enabled);

  const nodes = [
    { name: regions[0] ?? "India", x: 320, y: 150 },
    { name: regions[1] ?? "Middle East", x: 240, y: 130 },
    { name: regions[2] ?? "Southeast Asia", x: 400, y: 175 },
    { name: regions[3] ?? "Europe", x: 180, y: 75 },
    { name: regions[4] ?? "Africa", x: 190, y: 190 },
  ];

  return (
    <section id="global-reach" className="section-pad surface-navy">
      <div className="shell">
        <SectionHeading
          eyebrow="Global Reach"
          title="Our Global Trade Capabilities"
          description="Illustrative demo trade regions showing how Merrysa Exim LLP coordinates sourcing and distribution across markets."
          light
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-4 sm:p-6">
            <svg
              viewBox="0 0 500 260"
              role="img"
              aria-label="Stylised world map showing demo trade regions"
              className="h-auto w-full"
            >
              <defs>
                <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.09 250)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="oklch(0.4 0.09 253)" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <g fill="url(#landGrad)" stroke="oklch(0.86 0.09 94.4 / 0.25)" strokeWidth="0.8">
                <path d="M40 70 L95 45 L135 62 L120 100 L70 112 Z" />
                <path d="M95 130 L135 118 L150 165 L120 215 L92 180 Z" />
                <path d="M150 60 L215 40 L245 65 L225 95 L165 96 Z" />
                <path d="M160 105 L225 100 L240 160 L205 215 L168 165 Z" />
                <path d="M250 55 L340 35 L420 60 L430 110 L360 130 L280 115 Z" />
                <path d="M300 130 L360 140 L395 185 L350 200 L305 170 Z" />
                <path d="M400 190 L460 185 L470 225 L415 230 Z" />
              </g>
              {nodes.slice(1).map((node) => {
                const origin = nodes[0]!;
                return (
                  <path
                    key={`line-${node.name}`}
                    d={`M${origin.x} ${origin.y} Q ${(origin.x + node.x) / 2} ${
                      Math.min(origin.y, node.y) - 45
                    } ${node.x} ${node.y}`}
                    fill="none"
                    stroke="oklch(0.728 0.138 89.7)"
                    strokeWidth="1.4"
                    strokeDasharray="6 6"
                    style={{ animation: "trade-dash 2.4s linear infinite" }}
                  />
                );
              })}

              {nodes.map((node, i) => (
                <g key={node.name}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="6"
                    fill="oklch(0.864 0.094 94.4)"
                    style={{ animation: `pulse-node 2.6s ease-in-out ${i * 0.35}s infinite` }}
                  />
                  <text
                    x={node.x}
                    y={node.y - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill="oklch(0.99 0 0 / 0.85)"
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
            <div className="mt-4 flex flex-wrap gap-2">
              {regions.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold-soft"
                >
                  {region}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/55">
              Trade regions shown are demo data only and editable from the admin panel.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visible.map((cap) => (
              <article
                key={cap.id}
                className="rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:border-gold/50"
              >
                <h3 className="font-display text-base font-semibold text-white">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{cap.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  const { industries } = useContent();
  const visible = industries.filter((i) => i.enabled);

  return (
    <section className="section-pad bg-background">
      <div className="shell">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Sectors We Support With Bulk Supply"
          description="Demo industry categories reflecting the types of commercial buyers Merrysa Exim LLP works with."
          center
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((industry) => (
            <article key={industry.id} className="card-base card-hover overflow-hidden">
              <img
                src={industry.image}
                alt={`${industry.name} industry supply`}
                width={1024}
                height={768}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{industry.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  const { portfolio } = useContent();
  const visible = portfolio.filter((p) => p.enabled);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(visible.map((p) => p.category)))],
    [visible],
  );
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = filter === "All" ? visible : visible.filter((p) => p.category === filter);
  const active = visible.find((p) => p.id === openId) ?? null;

  return (
    <section className="section-pad bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Trade Categories"
          title="Our Trade Portfolio"
          description="Demonstration trade categories illustrating the breadth of wholesale goods we coordinate."
          center
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`btn ${filter === category ? "btn-primary" : "btn-outline"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="card-base card-hover flex flex-col overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                width={1024}
                height={768}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-navy px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-gold-soft uppercase">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
                    {item.tradeType}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="btn btn-outline mt-5 self-start"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No portfolio items in this category yet.
          </p>
        ) : null}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
          className="fixed inset-0 z-60 grid place-items-center bg-navy/70 p-4"
          onClick={() => setOpenId(null)}
        >
          <div
            className="card-base w-full max-w-lg overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.title}
              width={1024}
              height={768}
              loading="lazy"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <p className="eyebrow">
                {active.category} • {active.tradeType}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Enquire About This Category
                </Link>
                <button type="button" onClick={() => setOpenId(null)} className="btn btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function WhyChooseUsSection() {
  const { whyChooseUs } = useContent();
  const visible = whyChooseUs.filter((f) => f.enabled).sort((a, b) => a.order - b.order);

  return (
    <section className="section-pad surface-navy">
      <div className="shell">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Businesses Choose Merrysa Exim"
          description="A wholesale-first partner focused on dependable sourcing and clear commercial coordination."
          light
          center
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((feature, i) => (
            <article
              key={feature.id}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50"
            >
              <span className="font-display text-sm font-bold text-gold-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TradeProcessSection() {
  const { tradeProcess } = useContent();
  const steps = tradeProcess.filter((s) => s.enabled).sort((a, b) => a.order - b.order);

  return (
    <section id="trade-process" className="section-pad bg-background">
      <div className="shell">
        <SectionHeading
          eyebrow="Trade Process"
          title="From Sourcing to Delivery"
          description="A structured, transparent process from the first requirement to final distribution."
          center
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.id} className="card-base card-hover relative p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full surface-navy font-display text-sm font-bold text-gold-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ContactDetailsSection() {
  const { company, settings } = useContent();
  return (
    <section className="section-pad bg-surface">
      <div className="shell grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={company.name}
            description="Reach our trade desk for wholesale sourcing, export-import coordination and B2B distribution requirements."
          />
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="eyebrow">Registered Address</dt>
              <dd className="mt-1 max-w-md leading-relaxed text-foreground">{company.address}</dd>
            </div>
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:${settings.phone}`} className="text-royal hover:text-corporate">
                  {settings.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${settings.email}`}
                  className="break-all text-royal hover:text-corporate"
                >
                  {settings.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${settings.phone}`} className="btn btn-primary">
              Call Now
            </a>
            <a href={`mailto:${settings.email}`} className="btn btn-outline">
              Email Us
            </a>
            <a href="#inquiry" className="btn btn-gold">
              Send Inquiry
            </a>
          </div>
        </div>
        <div className="card-base p-6 sm:p-8">
          <p className="eyebrow">Business Hours & Coordination</p>
          <h3 className="mt-3 font-display text-xl font-semibold">
            Structured B2B communication
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Share your product requirement, target quantity and trade type. Our team reviews each
            requirement and responds with sourcing and coordination options.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {[
              "Requirement review and clarification",
              "Sourcing and commercial evaluation",
              "Logistics and documentation coordination",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
