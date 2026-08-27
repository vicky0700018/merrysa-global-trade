import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { PortfolioSection } from "@/components/sections";

const title = "Trade Portfolio & Categories — Merrysa Exim LLP";
const description =
  "Browse demo trade categories from Merrysa Exim LLP including industrial components, commercial packaging, consumer goods and industrial raw materials.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Portfolio"
        title="Our trade portfolio"
        description="Filter demonstration trade categories by wholesale, industrial, commercial, consumer and institutional segments."
      />
      <PortfolioSection />
    </SiteLayout>
  );
}
