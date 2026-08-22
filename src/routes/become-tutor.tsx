import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Clock,
  Award,
  BookOpen,
  Video,
  MessageSquare,
  Star,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/become-tutor")({
  head: () => ({
    meta: [
      { title: "Teach at TechBridge — Become a Tutor" },
      {
        name: "description",
        content:
          "Join our network of industry practitioners. Flexible schedules, meaningful impact, and competitive compensation.",
      },
      { property: "og:title", content: "Teach at TechBridge" },
      {
        property: "og:description",
        content: "Share your expertise with the next generation of technologists.",
      },
      { property: "og:url", content: "/become-tutor" },
    ],
    links: [{ rel: "canonical", href: "/become-tutor" }],
  }),
  component: TutorPage,
});

function TutorPage() {
  const benefits = [
    {
      icon: Clock,
      title: "Flexible schedule",
      body: "Teach part-time or full-time, in-person or remote. You choose what fits your life.",
    },
    {
      icon: Award,
      title: "Competitive pay",
      body: "Top-of-market rates based on expertise and experience.",
    },
    {
      icon: Users,
      title: "Small classes",
      body: "Average 18 students per cohort so you can actually mentor.",
    },
    {
      icon: GraduationCap,
      title: "Grow your brand",
      body: "Build authority through curriculum design and workshops.",
    },
  ];

  const expectations = [
    {
      icon: BookOpen,
      title: "Curriculum design",
      body: "Work with our team to design practical, project-based curricula.",
    },
    {
      icon: Video,
      title: "Deliver sessions",
      body: "Lead live sessions, labs, and code reviews with hands-on feedback.",
    },
    {
      icon: MessageSquare,
      title: "Mentorship",
      body: "Hold office hours and support students between sessions.",
    },
    {
      icon: Star,
      title: "Continuous improvement",
      body: "Iterate on content based on student outcomes and feedback.",
    },
  ];

  const testimonials = [
    {
      name: "Grace M.",
      role: "Senior Engineer, ex-Google",
      quote:
        "Teaching at TechBridge keeps my skills sharp and gives me a chance to lift others up. The students are hungry and the team is supportive.",
    },
    {
      name: "Daniel K.",
      role: "Product Designer, freelance",
      quote:
        "I love that I can teach remotely around my client work. The curriculum is well-structured, so I can focus on mentoring rather than admin.",
    },
  ];

  const faqs = [
    {
      q: "What is the time commitment?",
      a: "Most tutors teach 4–12 hours per week, depending on the program and format.",
    },
    {
      q: "Do I need teaching experience?",
      a: "Not necessarily. We value real-world expertise and provide onboarding and coaching for new tutors.",
    },
    {
      q: "How are tutors paid?",
      a: "Tutors are paid per session or per cohort, with rates aligned to experience and market benchmarks.",
    },
    {
      q: "Can I teach remotely?",
      a: "Yes. We offer in-person and remote options depending on the program and your location.",
    },
  ];

  return (
    <SiteLayout solidNav>
      <PageHeader
        eyebrow="Join us"
        title="Teach the next generation."
        subtitle="We're looking for engineers, designers, and researchers who love sharing what they've learned."
      />

      {/* Why tutors choose TechBridge */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary leading-tight">
                Why tutors choose TechBridge.
              </h3>
              <div className="space-y-6">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-accent/10 text-accent">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-primary font-medium">{b.title}</div>
                      <p className="text-sm text-muted-foreground mt-1">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[color:var(--surface)] p-6 md:p-8 rounded-sm space-y-5 text-center">
              <h4 className="text-lg font-semibold text-primary">Ready to teach?</h4>
              <p className="text-sm text-muted-foreground">
                Sign up to join our tutor network. We'll review your application and get back to you
                within a few days.
              </p>
              <a
                href="https://techbridge-tutor-sandy.vercel.app/"
                className="btn-primary inline-flex items-center justify-center w-full"
              >
                Sign up
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 md:py-32 bg-[color:var(--surface)]">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">The role</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
                What to expect as a tutor.
              </h2>
              <p className="mt-4 text-foreground">
                We keep the admin light so you can focus on what matters: teaching, mentoring, and
                shaping how technology is learned.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {expectations.map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="bg-white p-6 rounded-sm border border-border h-full">
                  <span className="h-11 w-11 grid place-items-center rounded-sm bg-accent/10 text-accent mb-4">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor testimonials */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">Testimonials</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
                From our tutors.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name} delay={0.05}>
                <figure className="bg-[color:var(--surface)] p-8 rounded-sm border border-border h-full">
                  <blockquote className="text-lg leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-border">
                    <div className="text-primary font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-[color:var(--surface)]">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
                Common questions.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 space-y-6">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="bg-white p-6 rounded-sm border border-border">
                  <h3 className="text-base font-semibold text-primary">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
