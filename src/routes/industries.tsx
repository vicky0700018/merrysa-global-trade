import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { IndustriesSection } from "@/components/sections";

const title = "Industries We Serve — Retail, Manufacturing & Institutional";
const description =
  "Merrysa Exim LLP supports retail, manufacturing, hospitality, institutional procurement, construction, distribution and wholesale businesses with bulk supply.";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Industries"
        title="Sectors served with bulk commercial supply"
        description="Demo industry categories reflecting the commercial and institutional buyers Merrysa Exim LLP works with."
      />
      <IndustriesSection />
    </SiteLayout>
  );
}
