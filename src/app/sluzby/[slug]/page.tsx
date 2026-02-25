import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { ServicePageClient } from "@/components/sections/service/ServicePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — JUDr. Michaela Švecová | Advokátní kancelář Brno`,
    description: service.heroDescription,
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} — Advokátní kancelář Švecová`,
      description: service.heroDescription,
      locale: "cs_CZ",
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${service.title} — JUDr. Michaela Švecová`,
    description: service.heroDescription,
    provider: {
      "@type": "Attorney",
      name: "JUDr. Michaela Švecová",
      jobTitle: "Advokátka",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Martina Ševčíka 4",
        addressLocality: "Brno",
        postalCode: "625 00",
        addressCountry: "CZ",
      },
      telephone: "+420 777 126 700",
      email: "svecova@aksvecova.cz",
    },
    areaServed: {
      "@type": "City",
      name: "Brno",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Domů",
        item: "https://aksvecova.mujagent.cz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Právní služby",
        item: "https://aksvecova.mujagent.cz/#sluzby",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://aksvecova.mujagent.cz/sluzby/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePageClient slug={service.slug} />
    </>
  );
}
