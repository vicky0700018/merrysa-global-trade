import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ServicesSection, TradeProcessSection } from "@/components/sections";

const title = "Services — Bulk Sourcing, B2B Distribution & Trade Support";
const description =
  "Explore Merrysa Exim LLP services: bulk sourcing, B2B distribution, export and import solutions, supply chain coordination, logistics and customs support.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="Wholesale and export-import services"
        description="Sourcing, distribution and trade coordination services designed around bulk commercial requirements."
      />
      <ServicesSection />
      <TradeProcessSection />
    </SiteLayout>
  );
}
