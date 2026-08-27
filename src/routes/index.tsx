import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import {
  AboutSection,
  CapabilitiesSection,
  ContactDetailsSection,
  IndustriesSection,
  IntroSection,
  PortfolioSection,
  ServicesSection,
  StatsSection,
  TradeProcessSection,
  WhyChooseUsSection,
} from "@/components/sections";
import { InquirySection } from "@/components/InquiryForm";

const title = "Merrysa Exim LLP — Global Sourcing, Wholesale & Export Import";
const description =
  "Merrysa Exim LLP is a Pune-based wholesale trade and export-import venture for bulk sourcing, B2B distribution and cross-border supply chain coordination.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <IntroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <PortfolioSection />
      <WhyChooseUsSection />
      <TradeProcessSection />
      <InquirySection />
      <ContactDetailsSection />
    </SiteLayout>
  );
}
