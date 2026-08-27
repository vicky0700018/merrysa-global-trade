/**
 * Centralized DEMO / MOCK content for the Merrysa Exim LLP portfolio website.
 * Every value here is editable through the demo admin panel and persisted in
 * localStorage. Statistics, trade regions and portfolio items are mock data.
 */

import heroPort from "@/assets/hero-port.jpg";
import heroShip from "@/assets/hero-cargo-ship.jpg";
import heroWarehouse from "@/assets/hero-warehouse.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import industryRetail from "@/assets/industry-retail.jpg";
import industryManufacturing from "@/assets/industry-manufacturing.jpg";
import industryHospitality from "@/assets/industry-hospitality.jpg";
import industryInstitutional from "@/assets/industry-institutional.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryDistribution from "@/assets/industry-distribution.jpg";
import industryWholesale from "@/assets/industry-wholesale.jpg";
import portfolioComponents from "@/assets/portfolio-components.jpg";
import portfolioPackaging from "@/assets/portfolio-packaging.jpg";
import portfolioConsumer from "@/assets/portfolio-consumer.jpg";
import portfolioHospitality from "@/assets/portfolio-hospitality.jpg";
import portfolioRawMaterials from "@/assets/portfolio-raw-materials.jpg";
import portfolioMerchandise from "@/assets/portfolio-merchandise.jpg";

export type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  enabled: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  glyph: string;
  order: number;
  enabled: boolean;
};

export type Capability = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export type Industry = {
  id: string;
  name: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  tradeType: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  order: number;
  enabled: boolean;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  order: number;
  enabled: boolean;
};

export type Stat = { id: string; label: string; value: string; caption: string };

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  requirement: string;
  quantity: string;
  tradeType: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "In Progress" | "Completed";
};

export type SiteContent = {
  heroBanners: HeroBanner[];
  stats: Stat[];
  about: {
    heading: string;
    description: string;
    highlights: string[];
    image: string;
    cta: string;
  };
  services: Service[];
  capabilities: Capability[];
  regions: string[];
  industries: Industry[];
  portfolio: PortfolioItem[];
  whyChooseUs: Feature[];
  tradeProcess: ProcessStep[];
  inquiries: Inquiry[];
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    footerText: string;
  };
  settings: {
    siteTitle: string;
    heroAutoplay: boolean;
    ctaText: string;
    copyright: string;
    phone: string;
    email: string;
  };
};

export const INQUIRY_STATUSES: Inquiry["status"][] = [
  "New",
  "Contacted",
  "In Progress",
  "Completed",
];

export const TRADE_TYPES = [
  "Import",
  "Export",
  "Wholesale Supply",
  "Bulk Sourcing",
  "B2B Distribution",
  "Other",
];

export const ADMIN_CREDENTIALS = {
  username: "admin@merrysaexim.com",
  password: "admin123",
};

export const defaultContent: SiteContent = {
  heroBanners: [
    {
      id: "hb-1",
      title: "Global Trade. Reliable Partnerships.",
      subtitle:
        "Merrysa Exim LLP connects manufacturers, retailers and institutional buyers through reliable wholesale sourcing and global trade solutions.",
      cta: "Explore Our Capabilities",
      image: heroPort,
      enabled: true,
    },
    {
      id: "hb-2",
      title: "Bulk Sourcing Made Reliable",
      subtitle:
        "Source commercial goods directly from manufacturers and industrial producers with a B2B-first approach.",
      cta: "Our Services",
      image: heroShip,
      enabled: true,
    },
    {
      id: "hb-3",
      title: "Connecting Businesses Across Borders",
      subtitle:
        "Supporting cross-border wholesale trade, logistics coordination and supply chain operations.",
      cta: "Send an Inquiry",
      image: heroWarehouse,
      enabled: true,
    },
  ],
  stats: [
    { id: "st-1", value: "25+", label: "Trade Categories", caption: "Global Sourcing" },
    { id: "st-2", value: "100+", label: "Business Connections", caption: "B2B Distribution" },
    { id: "st-3", value: "15+", label: "Sourcing Markets", caption: "Bulk Trade" },
    { id: "st-4", value: "10+", label: "Logistics Partners", caption: "Supply Chain Support" },
  ],
  about: {
    heading: "Built for Wholesale. Designed for Global Trade.",
    description:
      "Merrysa Exim LLP operates in the wholesale trade and export-import sector, helping businesses source commercial goods in bulk and connect with dependable supply channels. We procure directly from manufacturers and industrial producers, supply retailers, commercial clients and institutional buyers in bulk quantities, and coordinate cross-border supply chain operations including shipping logistics and customs handling for wholesale commodities.",
    highlights: [
      "Bulk sourcing across commercial product categories",
      "Direct manufacturer and industrial producer relationships",
      "B2B distribution for retailers and commercial buyers",
      "Institutional supply coordination",
      "International trade coordination across markets",
      "Logistics support for freight and delivery movement",
      "Customs coordination and trade documentation support",
    ],
    image: aboutTeam,
    cta: "Discover Merrysa Exim",
  },
  services: [
    {
      id: "sv-1",
      title: "Bulk Sourcing",
      description:
        "Procurement of commercial goods directly from manufacturers and industrial producers.",
      glyph: "◈",
      order: 1,
      enabled: true,
    },
    {
      id: "sv-2",
      title: "B2B Distribution",
      description: "Bulk supply for retailers, commercial buyers and institutional clients.",
      glyph: "◇",
      order: 2,
      enabled: true,
    },
    {
      id: "sv-3",
      title: "Export Solutions",
      description: "Support for businesses looking to move products into international markets.",
      glyph: "▲",
      order: 3,
      enabled: true,
    },
    {
      id: "sv-4",
      title: "Import Solutions",
      description: "Sourcing and coordination for products entering domestic markets.",
      glyph: "▼",
      order: 4,
      enabled: true,
    },
    {
      id: "sv-5",
      title: "Supply Chain Coordination",
      description: "Coordination of shipment movement and supply chain requirements.",
      glyph: "⬡",
      order: 5,
      enabled: true,
    },
    {
      id: "sv-6",
      title: "Logistics Support",
      description: "Support with freight, shipping and delivery coordination.",
      glyph: "⬢",
      order: 6,
      enabled: true,
    },
    {
      id: "sv-7",
      title: "Customs Coordination",
      description:
        "Assistance in coordinating documentation and customs-related trade processes.",
      glyph: "❖",
      order: 7,
      enabled: true,
    },
    {
      id: "sv-8",
      title: "Wholesale Trade",
      description: "Large-volume commercial procurement and distribution.",
      glyph: "▣",
      order: 8,
      enabled: true,
    },
  ],
  capabilities: [
    {
      id: "cp-1",
      title: "Global Sourcing",
      description: "Identifying dependable supply options across multiple sourcing markets.",
      enabled: true,
    },
    {
      id: "cp-2",
      title: "Vendor Coordination",
      description: "Structured communication with manufacturers, producers and suppliers.",
      enabled: true,
    },
    {
      id: "cp-3",
      title: "Bulk Procurement",
      description: "Large-volume purchase coordination built around commercial requirements.",
      enabled: true,
    },
    {
      id: "cp-4",
      title: "Documentation Support",
      description: "Assistance with the paperwork that accompanies wholesale trade movement.",
      enabled: true,
    },
    {
      id: "cp-5",
      title: "Freight Coordination",
      description: "Coordination with logistics partners for shipment planning and movement.",
      enabled: true,
    },
    {
      id: "cp-6",
      title: "Cross-Border Distribution",
      description: "Supporting distribution of wholesale commodities across borders.",
      enabled: true,
    },
  ],
  regions: ["India", "Middle East", "Southeast Asia", "Europe", "Africa"],
  industries: [
    {
      id: "in-1",
      name: "Retail",
      description: "Bulk merchandise and packaged goods supply for retail businesses.",
      image: industryRetail,
      enabled: true,
    },
    {
      id: "in-2",
      name: "Manufacturing",
      description: "Sourcing of components and raw material inputs for production lines.",
      image: industryManufacturing,
      enabled: true,
    },
    {
      id: "in-3",
      name: "Hospitality",
      description: "Consumables, linen and operational supplies in commercial volumes.",
      image: industryHospitality,
      enabled: true,
    },
    {
      id: "in-4",
      name: "Institutional Procurement",
      description: "Structured bulk supply for institutional and organisational buyers.",
      image: industryInstitutional,
      enabled: true,
    },
    {
      id: "in-5",
      name: "Construction",
      description: "Coordination of building materials and site consumables in bulk.",
      image: industryConstruction,
      enabled: true,
    },
    {
      id: "in-6",
      name: "Distribution",
      description: "Supply support for distributors moving goods across regional networks.",
      image: industryDistribution,
      enabled: true,
    },
    {
      id: "in-7",
      name: "Wholesale Businesses",
      description: "Commercial trading and wholesale resale partners across categories.",
      image: industryWholesale,
      enabled: true,
    },
  ],
  portfolio: [
    {
      id: "pf-1",
      title: "Industrial Components",
      category: "Industrial",
      tradeType: "Import",
      description:
        "Demo category covering fasteners, bearings and machined parts sourced for production requirements.",
      image: portfolioComponents,
      enabled: true,
    },
    {
      id: "pf-2",
      title: "Commercial Packaging",
      category: "Commercial",
      tradeType: "Wholesale Supply",
      description:
        "Demo category covering cartons, wrap and protective packaging supplied in bulk volumes.",
      image: portfolioPackaging,
      enabled: true,
    },
    {
      id: "pf-3",
      title: "Wholesale Consumer Goods",
      category: "Consumer",
      tradeType: "B2B Distribution",
      description:
        "Demo category covering packaged household and daily-use goods for wholesale distribution.",
      image: portfolioConsumer,
      enabled: true,
    },
    {
      id: "pf-4",
      title: "Hospitality Supplies",
      category: "Institutional",
      tradeType: "Bulk Sourcing",
      description:
        "Demo category covering linen, amenities and operational consumables for hospitality buyers.",
      image: portfolioHospitality,
      enabled: true,
    },
    {
      id: "pf-5",
      title: "Industrial Raw Materials",
      category: "Industrial",
      tradeType: "Export",
      description:
        "Demo category covering metal coils, polymer granules and semi-finished material inputs.",
      image: portfolioRawMaterials,
      enabled: true,
    },
    {
      id: "pf-6",
      title: "Retail Merchandise",
      category: "Wholesale",
      tradeType: "Wholesale Supply",
      description:
        "Demo category covering assorted retail-ready merchandise for bulk resale channels.",
      image: portfolioMerchandise,
      enabled: true,
    },
  ],
  whyChooseUs: [
    {
      id: "wc-1",
      title: "Reliable Sourcing",
      description: "Focused on dependable manufacturer and supplier relationships.",
      order: 1,
      enabled: true,
    },
    {
      id: "wc-2",
      title: "B2B First Approach",
      description: "Designed around bulk commercial requirements.",
      order: 2,
      enabled: true,
    },
    {
      id: "wc-3",
      title: "Global Perspective",
      description: "Supporting cross-border trade opportunities.",
      order: 3,
      enabled: true,
    },
    {
      id: "wc-4",
      title: "Supply Chain Focus",
      description: "Coordination across sourcing, logistics and distribution.",
      order: 4,
      enabled: true,
    },
    {
      id: "wc-5",
      title: "Professional Communication",
      description: "Clear inquiry and business coordination process.",
      order: 5,
      enabled: true,
    },
    {
      id: "wc-6",
      title: "Flexible Trade Solutions",
      description: "Solutions adaptable to different wholesale requirements.",
      order: 6,
      enabled: true,
    },
  ],
  tradeProcess: [
    {
      id: "tp-1",
      title: "Requirement Received",
      description: "Business inquiry reviewed with product, volume and destination details.",
      order: 1,
      enabled: true,
    },
    {
      id: "tp-2",
      title: "Supplier & Product Sourcing",
      description: "Suitable manufacturers and producers identified for the requirement.",
      order: 2,
      enabled: true,
    },
    {
      id: "tp-3",
      title: "Commercial Evaluation",
      description: "Commercial terms, volumes and feasibility evaluated together.",
      order: 3,
      enabled: true,
    },
    {
      id: "tp-4",
      title: "Order Coordination",
      description: "Order confirmation and production or dispatch scheduling coordinated.",
      order: 4,
      enabled: true,
    },
    {
      id: "tp-5",
      title: "Logistics Planning",
      description: "Freight mode, routing and shipment timelines planned with partners.",
      order: 5,
      enabled: true,
    },
    {
      id: "tp-6",
      title: "Documentation & Customs Coordination",
      description: "Trade documentation and customs processes coordinated.",
      order: 6,
      enabled: true,
    },
    {
      id: "tp-7",
      title: "Delivery / Distribution",
      description: "Goods delivered or distributed to the receiving business channel.",
      order: 7,
      enabled: true,
    },
  ],
  inquiries: [
    {
      id: "iq-demo-1",
      name: "Demo Buyer",
      company: "Demo Trading Co.",
      email: "buyer@example.com",
      phone: "9000000000",
      country: "United Arab Emirates",
      requirement: "Commercial packaging cartons",
      quantity: "2 containers",
      tradeType: "Export",
      message: "Sample demo inquiry included with the demo data set.",
      date: new Date("2026-01-12T10:30:00Z").toISOString(),
      status: "New",
    },
    {
      id: "iq-demo-2",
      name: "Demo Procurement Lead",
      company: "Demo Institutional Supplies",
      email: "procurement@example.com",
      phone: "9111111111",
      country: "India",
      requirement: "Hospitality linen and amenities",
      quantity: "5,000 units",
      tradeType: "Bulk Sourcing",
      message: "Second sample demo inquiry for dashboard demonstration.",
      date: new Date("2026-02-03T08:15:00Z").toISOString(),
      status: "Contacted",
    },
  ],
  company: {
    name: "Merrysa Exim LLP",
    address:
      "Flat No. 406, Building D7, Rahul Park, S.No. 79/B, 116/6/1, Warje, Pune City, Maharashtra, India - 411058",
    phone: "2153453533",
    email: "yachakurkar1960@gmail.com",
    footerText:
      "Wholesale trade and export-import venture focused on bulk sourcing, B2B distribution and global trade operations.",
  },
  settings: {
    siteTitle: "Merrysa Exim LLP — Global Sourcing & Wholesale Trade",
    heroAutoplay: true,
    ctaText: "Send Inquiry",
    copyright: "© 2026 Merrysa Exim LLP. All Rights Reserved.",
    phone: "2153453533",
    email: "yachakurkar1960@gmail.com",
  },
};
