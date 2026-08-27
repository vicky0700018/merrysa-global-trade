import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  INQUIRY_STATUSES,
  TRADE_TYPES,
  type Capability,
  type Feature,
  type HeroBanner,
  type Industry,
  type Inquiry,
  type PortfolioItem,
  type ProcessStep,
  type Service,
} from "@/data/mockData";
import { logout, makeId, resetContent, updateContent, useContent, useIsAdmin } from "@/lib/content-store";
import { AdminPanelShell, CollectionEditor } from "@/components/admin/CollectionEditor";

const NAV = [
  { key: "dashboard", label: "Dashboard" },
  { key: "banners", label: "Hero Banners" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "capabilities", label: "Capabilities" },
  { key: "industries", label: "Industries" },
  { key: "portfolio", label: "Portfolio" },
  { key: "why", label: "Why Choose Us" },
  { key: "process", label: "Trade Process" },
  { key: "inquiries", label: "Inquiries" },
  { key: "contact", label: "Contact Details" },
  { key: "settings", label: "Website Settings" },
] as const;

type PanelKey = (typeof NAV)[number]["key"];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Merrysa Exim LLP Demo Panel" },
      {
        name: "description",
        content: "Demo dashboard to manage banners, services, portfolio, industries and inquiries.",
      },
      { property: "og:title", content: "Admin Dashboard — Merrysa Exim LLP" },
      {
        property: "og:description",
        content: "Demo content management dashboard for the Merrysa Exim LLP website.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const content = useContent();
  const [panel, setPanel] = useState<PanelKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !isAdmin) navigate({ to: "/admin" });
  }, [checked, isAdmin, navigate]);

  if (!checked || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-4">
        <p className="text-sm text-muted-foreground">Checking demo admin session…</p>
      </div>
    );
  }

  const newInquiries = content.inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="min-h-screen bg-surface">
      <header className="surface-navy sticky top-0 z-40">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-ghost-light px-3 py-1.5 lg:hidden"
              aria-expanded={sidebarOpen}
              aria-label="Toggle admin menu"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <span aria-hidden="true">{sidebarOpen ? "✕" : "☰"}</span>
            </button>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold">MERRYSA EXIM — ADMIN</p>
              <p className="text-[0.65rem] tracking-[0.14em] text-gold-soft uppercase">
                Demo Content Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-ghost-light hidden sm:inline-flex">
              View Website
            </Link>
            <button
              type="button"
              className="btn btn-gold"
              onClick={() => {
                logout();
                navigate({ to: "/admin" });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } fixed inset-x-4 top-20 z-30 max-h-[70vh] overflow-auto rounded-2xl border border-border bg-card p-3 shadow-lift lg:sticky lg:top-24 lg:block lg:h-fit lg:w-60 lg:shrink-0 lg:overflow-visible`}
        >
          <nav aria-label="Admin sections" className="flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setPanel(item.key);
                  setSidebarOpen(false);
                }}
                aria-current={panel === item.key}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  panel === item.key
                    ? "bg-corporate text-primary-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                {item.label}
                {item.key === "inquiries" && newInquiries > 0 ? (
                  <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[0.65rem] font-bold text-navy">
                    {newInquiries}
                  </span>
                ) : null}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: "/admin" });
              }}
              className="mt-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              Logout
            </button>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          {panel === "dashboard" ? <DashboardHome onOpen={setPanel} /> : null}
          {panel === "banners" ? <BannersPanel /> : null}
          {panel === "about" ? <AboutPanel /> : null}
          {panel === "services" ? <ServicesPanel /> : null}
          {panel === "capabilities" ? <CapabilitiesPanel /> : null}
          {panel === "industries" ? <IndustriesPanel /> : null}
          {panel === "portfolio" ? <PortfolioPanel /> : null}
          {panel === "why" ? <WhyPanel /> : null}
          {panel === "process" ? <ProcessPanel /> : null}
          {panel === "inquiries" ? <InquiriesPanel /> : null}
          {panel === "contact" ? <ContactPanel /> : null}
          {panel === "settings" ? <SettingsPanel /> : null}
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ onOpen }: { onOpen: (panel: PanelKey) => void }) {
  const content = useContent();
  const cards = [
    { label: "Total Services", value: content.services.length, panel: "services" as PanelKey },
    { label: "Portfolio Items", value: content.portfolio.length, panel: "portfolio" as PanelKey },
    { label: "Industries", value: content.industries.length, panel: "industries" as PanelKey },
    { label: "Hero Banners", value: content.heroBanners.length, panel: "banners" as PanelKey },
    {
      label: "New Inquiries",
      value: content.inquiries.filter((i) => i.status === "New").length,
      panel: "inquiries" as PanelKey,
    },
  ];
  const recent = content.inquiries.slice(0, 5);

  return (
    <AdminPanelShell
      title="Dashboard"
      description="Demo overview of website content and inquiries stored in localStorage."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => onOpen(card.panel)}
            className="card-base card-hover p-5 text-left"
          >
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {card.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-corporate">{card.value}</p>
          </button>
        ))}
      </div>

      <div className="card-base overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-base font-semibold">Recent Inquiries</h2>
        </div>
        <InquiryTable inquiries={recent} compact />
      </div>
    </AdminPanelShell>
  );
}

function InquiryTable({
  inquiries,
  compact = false,
  onStatusChange,
  onDelete,
  onView,
}: {
  inquiries: Inquiry[];
  compact?: boolean;
  onStatusChange?: (id: string, status: Inquiry["status"]) => void;
  onDelete?: (id: string) => void;
  onView?: (inquiry: Inquiry) => void;
}) {
  if (inquiries.length === 0) {
    return <p className="p-5 text-sm text-muted-foreground">No inquiries yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-surface text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Requirement</th>
            <th className="px-4 py-3">Trade Type</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            {compact ? null : <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="border-t border-border align-top">
              <td className="px-4 py-3 font-medium">{inquiry.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{inquiry.company}</td>
              <td className="px-4 py-3 text-muted-foreground">{inquiry.requirement}</td>
              <td className="px-4 py-3 text-muted-foreground">{inquiry.tradeType}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(inquiry.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {onStatusChange ? (
                  <select
                    aria-label={`Status for ${inquiry.name}`}
                    className="field py-1.5 text-xs"
                    value={inquiry.status}
                    onChange={(event) =>
                      onStatusChange(inquiry.id, event.target.value as Inquiry["status"])
                    }
                  >
                    {INQUIRY_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold">
                    {inquiry.status}
                  </span>
                )}
              </td>
              {compact ? null : (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline px-3 py-1.5 text-xs"
                      onClick={() => onView?.(inquiry)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline px-3 py-1.5 text-xs text-destructive"
                      onClick={() => onDelete?.(inquiry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BannersPanel() {
  const { heroBanners } = useContent();
  return (
    <CollectionEditor<HeroBanner>
      title="Hero Banners"
      description="Slides shown in the homepage carousel. Changes appear immediately on the website."
      items={heroBanners}
      labelKey="title"
      reorderable
      onChange={(next) => updateContent({ heroBanners: next })}
      createItem={() => ({
        id: makeId("hb"),
        title: "New banner title",
        subtitle: "Supporting text for this banner slide.",
        cta: "Send an Inquiry",
        image: "",
        enabled: true,
      })}
      fields={[
        { key: "title", label: "Title" },
        { key: "cta", label: "CTA Text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
        { key: "image", label: "Image URL", type: "image" },
      ]}
    />
  );
}

function AboutPanel() {
  const { about } = useContent();
  return (
    <AdminPanelShell title="About Section" description="Edit the About content shown site-wide.">
      <div className="card-base grid gap-4 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="about-heading" className="text-xs font-semibold text-muted-foreground">
            Heading
          </label>
          <input
            id="about-heading"
            className="field mt-1"
            value={about.heading}
            onChange={(event) => updateContent({ about: { ...about, heading: event.target.value } })}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="about-desc" className="text-xs font-semibold text-muted-foreground">
            Description
          </label>
          <textarea
            id="about-desc"
            rows={5}
            className="field mt-1"
            value={about.description}
            onChange={(event) =>
              updateContent({ about: { ...about, description: event.target.value } })
            }
          />
        </div>
        <div>
          <label htmlFor="about-cta" className="text-xs font-semibold text-muted-foreground">
            CTA Text
          </label>
          <input
            id="about-cta"
            className="field mt-1"
            value={about.cta}
            onChange={(event) => updateContent({ about: { ...about, cta: event.target.value } })}
          />
        </div>
        <div>
          <label htmlFor="about-image" className="text-xs font-semibold text-muted-foreground">
            Image URL
          </label>
          <input
            id="about-image"
            className="field mt-1"
            value={about.image}
            onChange={(event) => updateContent({ about: { ...about, image: event.target.value } })}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="about-points" className="text-xs font-semibold text-muted-foreground">
            Highlight Points (one per line)
          </label>
          <textarea
            id="about-points"
            rows={7}
            className="field mt-1"
            value={about.highlights.join("\n")}
            onChange={(event) =>
              updateContent({
                about: {
                  ...about,
                  highlights: event.target.value.split("\n").filter((line) => line.trim() !== ""),
                },
              })
            }
          />
        </div>
      </div>
    </AdminPanelShell>
  );
}

function ServicesPanel() {
  const { services } = useContent();
  return (
    <CollectionEditor<Service>
      title="Services"
      description="Manage the services grid, ordering and visibility."
      items={services}
      labelKey="title"
      reorderable
      onChange={(next) => updateContent({ services: next })}
      createItem={() => ({
        id: makeId("sv"),
        title: "New service",
        description: "Describe this service.",
        glyph: "◆",
        order: services.length + 1,
        enabled: true,
      })}
      fields={[
        { key: "title", label: "Title" },
        { key: "glyph", label: "Visual Symbol" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

function CapabilitiesPanel() {
  const { capabilities, regions } = useContent();
  return (
    <div className="space-y-6">
      <CollectionEditor<Capability>
        title="Capabilities"
        description="Manage the global trade capability cards."
        items={capabilities}
        labelKey="title"
        onChange={(next) => updateContent({ capabilities: next })}
        createItem={() => ({
          id: makeId("cp"),
          title: "New capability",
          description: "Describe this capability.",
          enabled: true,
        })}
        fields={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
      />
      <AdminPanelShell title="Trade Regions (Demo)" description="One region per line.">
        <div className="card-base p-5">
          <label htmlFor="regions" className="text-xs font-semibold text-muted-foreground">
            Regions
          </label>
          <textarea
            id="regions"
            rows={5}
            className="field mt-1"
            value={regions.join("\n")}
            onChange={(event) =>
              updateContent({
                regions: event.target.value.split("\n").filter((line) => line.trim() !== ""),
              })
            }
          />
        </div>
      </AdminPanelShell>
    </div>
  );
}

function IndustriesPanel() {
  const { industries } = useContent();
  return (
    <CollectionEditor<Industry>
      title="Industries"
      description="Manage industry cards, images and visibility."
      items={industries}
      labelKey="name"
      reorderable
      onChange={(next) => updateContent({ industries: next })}
      createItem={() => ({
        id: makeId("in"),
        name: "New industry",
        description: "Describe this industry segment.",
        image: "",
        enabled: true,
      })}
      fields={[
        { key: "name", label: "Name" },
        { key: "image", label: "Image URL", type: "image" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}

function PortfolioPanel() {
  const { portfolio } = useContent();
  return (
    <CollectionEditor<PortfolioItem>
      title="Portfolio"
      description="Manage trade categories. Public filters are generated from these categories."
      items={portfolio}
      labelKey="title"
      reorderable
      onChange={(next) => updateContent({ portfolio: next })}
      createItem={() => ({
        id: makeId("pf"),
        title: "New trade category",
        category: "Wholesale",
        tradeType: TRADE_TYPES[0],
        description: "Describe this demo trade category.",
        image: "",
        enabled: true,
      })}
      fields={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "tradeType", label: "Trade Type" },
        { key: "image", label: "Image URL", type: "image" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}

function WhyPanel() {
  const { whyChooseUs } = useContent();
  return (
    <CollectionEditor<Feature>
      title="Why Choose Us"
      description="Manage and reorder the trust features."
      items={whyChooseUs}
      labelKey="title"
      reorderable
      onChange={(next) => updateContent({ whyChooseUs: next })}
      createItem={() => ({
        id: makeId("wc"),
        title: "New feature",
        description: "Describe this differentiator.",
        order: whyChooseUs.length + 1,
        enabled: true,
      })}
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

function ProcessPanel() {
  const { tradeProcess } = useContent();
  return (
    <CollectionEditor<ProcessStep>
      title="Trade Process"
      description="Manage the sourcing-to-delivery process steps."
      items={tradeProcess}
      labelKey="title"
      reorderable
      onChange={(next) => updateContent({ tradeProcess: next })}
      createItem={() => ({
        id: makeId("tp"),
        title: "New step",
        description: "Describe this process step.",
        order: tradeProcess.length + 1,
        enabled: true,
      })}
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

function InquiriesPanel() {
  const { inquiries } = useContent();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      const matchesStatus = status === "All" || inquiry.status === status;
      const matchesTerm =
        term === "" ||
        [inquiry.name, inquiry.company, inquiry.email, inquiry.requirement, inquiry.country]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [inquiries, search, status]);

  return (
    <AdminPanelShell
      title="Inquiries"
      description="Inquiries submitted through the public website, stored in localStorage for this demo."
    >
      <div className="card-base flex flex-wrap gap-3 p-4">
        <div className="min-w-[12rem] flex-1">
          <label htmlFor="inq-search" className="text-xs font-semibold text-muted-foreground">
            Search
          </label>
          <input
            id="inq-search"
            className="field mt-1"
            placeholder="Name, company, email, requirement"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="inq-status" className="text-xs font-semibold text-muted-foreground">
            Filter by status
          </label>
          <select
            id="inq-status"
            className="field mt-1"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {["All", ...INQUIRY_STATUSES].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <InquiryTable
          inquiries={filtered}
          onStatusChange={(id, next) =>
            updateContent({
              inquiries: inquiries.map((inquiry) =>
                inquiry.id === id ? { ...inquiry, status: next } : inquiry,
              ),
            })
          }
          onDelete={(id) => {
            if (typeof window !== "undefined" && !window.confirm("Delete this inquiry?")) return;
            updateContent({ inquiries: inquiries.filter((inquiry) => inquiry.id !== id) });
          }}
          onView={(inquiry) => setSelected(inquiry)}
        />
      </div>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Inquiry details"
          className="fixed inset-0 z-50 grid place-items-center bg-navy/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="card-base w-full max-w-lg p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="font-display text-lg font-bold">{selected.name}</h2>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {[
                ["Company", selected.company],
                ["Email", selected.email],
                ["Phone", selected.phone],
                ["Country", selected.country],
                ["Requirement", selected.requirement],
                ["Quantity", selected.quantity || "—"],
                ["Trade Type", selected.tradeType],
                ["Status", selected.status],
                ["Date", new Date(selected.date).toLocaleString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold text-muted-foreground uppercase">{label}</dt>
                  <dd className="break-words">{value}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">Message</dt>
                <dd className="whitespace-pre-line">{selected.message || "—"}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="btn btn-primary mt-6"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </AdminPanelShell>
  );
}

function ContactPanel() {
  const { company } = useContent();
  const fields: Array<{ key: keyof typeof company; label: string; textarea?: boolean }> = [
    { key: "name", label: "Business Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address", textarea: true },
    { key: "footerText", label: "Footer Text", textarea: true },
  ];
  return (
    <AdminPanelShell
      title="Contact Details"
      description="These values are used across the website header, contact section and footer."
    >
      <div className="card-base grid gap-4 p-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.textarea ? "sm:col-span-2" : ""}>
            <label htmlFor={`co-${field.key}`} className="text-xs font-semibold text-muted-foreground">
              {field.label}
            </label>
            {field.textarea ? (
              <textarea
                id={`co-${field.key}`}
                rows={3}
                className="field mt-1"
                value={company[field.key]}
                onChange={(event) =>
                  updateContent({ company: { ...company, [field.key]: event.target.value } })
                }
              />
            ) : (
              <input
                id={`co-${field.key}`}
                className="field mt-1"
                value={company[field.key]}
                onChange={(event) =>
                  updateContent({ company: { ...company, [field.key]: event.target.value } })
                }
              />
            )}
          </div>
        ))}
      </div>
    </AdminPanelShell>
  );
}

function SettingsPanel() {
  const { settings, stats } = useContent();
  return (
    <div className="space-y-6">
      <AdminPanelShell title="Website Settings" description="Global website options for the demo.">
        <div className="card-base grid gap-4 p-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="s-title" className="text-xs font-semibold text-muted-foreground">
              Website Title
            </label>
            <input
              id="s-title"
              className="field mt-1"
              value={settings.siteTitle}
              onChange={(event) =>
                updateContent({ settings: { ...settings, siteTitle: event.target.value } })
              }
            />
          </div>
          <div>
            <label htmlFor="s-cta" className="text-xs font-semibold text-muted-foreground">
              Header CTA Text
            </label>
            <input
              id="s-cta"
              className="field mt-1"
              value={settings.ctaText}
              onChange={(event) =>
                updateContent({ settings: { ...settings, ctaText: event.target.value } })
              }
            />
          </div>
          <div>
            <label htmlFor="s-copy" className="text-xs font-semibold text-muted-foreground">
              Footer Copyright
            </label>
            <input
              id="s-copy"
              className="field mt-1"
              value={settings.copyright}
              onChange={(event) =>
                updateContent({ settings: { ...settings, copyright: event.target.value } })
              }
            />
          </div>
          <div>
            <label htmlFor="s-phone" className="text-xs font-semibold text-muted-foreground">
              Primary Phone
            </label>
            <input
              id="s-phone"
              className="field mt-1"
              value={settings.phone}
              onChange={(event) =>
                updateContent({ settings: { ...settings, phone: event.target.value } })
              }
            />
          </div>
          <div>
            <label htmlFor="s-email" className="text-xs font-semibold text-muted-foreground">
              Primary Email
            </label>
            <input
              id="s-email"
              className="field mt-1"
              value={settings.email}
              onChange={(event) =>
                updateContent({ settings: { ...settings, email: event.target.value } })
              }
            />
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={settings.heroAutoplay}
              onChange={(event) =>
                updateContent({ settings: { ...settings, heroAutoplay: event.target.checked } })
              }
            />
            Hero carousel autoplay
          </label>
        </div>
      </AdminPanelShell>

      <AdminPanelShell
        title="Business Highlights (Demo Statistics)"
        description="Mock statistic cards displayed on the website."
      >
        <div className="card-base grid gap-4 p-5 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.id} className="rounded-xl border border-border p-4">
              <label className="text-xs font-semibold text-muted-foreground">Caption</label>
              <input
                className="field mt-1"
                value={stat.caption}
                onChange={(event) =>
                  updateContent({
                    stats: stats.map((s) =>
                      s.id === stat.id ? { ...s, caption: event.target.value } : s,
                    ),
                  })
                }
              />
              <label className="mt-3 block text-xs font-semibold text-muted-foreground">Value</label>
              <input
                className="field mt-1"
                value={stat.value}
                onChange={(event) =>
                  updateContent({
                    stats: stats.map((s) =>
                      s.id === stat.id ? { ...s, value: event.target.value } : s,
                    ),
                  })
                }
              />
              <label className="mt-3 block text-xs font-semibold text-muted-foreground">Label</label>
              <input
                className="field mt-1"
                value={stat.label}
                onChange={(event) =>
                  updateContent({
                    stats: stats.map((s) =>
                      s.id === stat.id ? { ...s, label: event.target.value } : s,
                    ),
                  })
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            if (typeof window !== "undefined" && !window.confirm("Reset all demo content?")) return;
            resetContent();
          }}
        >
          Reset all demo content
        </button>
      </AdminPanelShell>
    </div>
  );
}
