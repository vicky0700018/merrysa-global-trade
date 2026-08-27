import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { AboutSection, StatsSection, WhyChooseUsSection } from "@/components/sections";

const title = "About Merrysa Exim LLP — Wholesale & Export Import Company";
const description =
  "Learn how Merrysa Exim LLP supports bulk sourcing, manufacturer relationships, B2B distribution and international trade coordination from Pune, India.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="A wholesale trade partner built for global business"
        description="Merrysa Exim LLP procures commercial goods directly from manufacturers and industrial producers, supplies bulk quantities to commercial and institutional buyers, and coordinates cross-border trade operations."
      />
      <AboutSection />
      <StatsSection />
      <WhyChooseUsSection />
    </SiteLayout>
  );
}
