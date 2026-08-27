import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { CapabilitiesSection, StatsSection } from "@/components/sections";

const title = "Global Trade Capabilities & Global Reach — Merrysa Exim LLP";
const description =
  "Global sourcing, vendor coordination, bulk procurement, documentation support, freight coordination and cross-border distribution capabilities.";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CapabilitiesPage,
});

function CapabilitiesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Capabilities"
        title="Global trade capabilities and reach"
        description="How Merrysa Exim LLP coordinates sourcing, procurement and cross-border distribution across demo trade regions."
      />
      <CapabilitiesSection />
      <StatsSection />
    </SiteLayout>
  );
}
