import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ContactDetailsSection } from "@/components/sections";
import { InquirySection } from "@/components/InquiryForm";

const title = "Contact & Business Inquiry — Merrysa Exim LLP, Pune";
const description =
  "Send a wholesale, export or import inquiry to Merrysa Exim LLP in Warje, Pune, Maharashtra. Share your product requirement, quantity and trade type.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Send a business inquiry"
        description="Share your sourcing or trade requirement and our team will review and respond with coordination options."
      />
      <InquirySection />
      <ContactDetailsSection />
    </SiteLayout>
  );
}
