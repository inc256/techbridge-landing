import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import {
  AboutPreview,
  Stats,
  FeaturedPrograms,
  WhyChoose,
  Admissions,
  Testimonials,
  Gallery,
  LatestNews,
  ContactCTA,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechBridge Skills Hub — Future-ready Technology Education" },
      {
        name: "description",
        content:
          "Programs in software engineering, data science, cybersecurity, design and cloud — taught by industry practitioners.",
      },
      { property: "og:title", content: "TechBridge Skills Hub" },
      {
        property: "og:description",
        content:
          "Empowering future innovators through technology, practical skills, and industry-focused education.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <FeaturedPrograms />
      {/* <Gallery /> */}
      <ContactCTA />
    </SiteLayout>
  );
}
