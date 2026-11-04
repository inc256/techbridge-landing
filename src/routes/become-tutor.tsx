import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import {
  GraduationCap,
  Users,
  Clock,
  Award,
  BookOpen,
  Video,
  MessageSquare,
  Star,
  ArrowRight,
} from "lucide-react";
import hero1 from "@/assets/optimized/hero-1.webp";

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
      <section className="bg-[#F8FAFC] pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2F7F43]">
                Teach with TechBridge
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#1E293B] sm:text-5xl lg:text-6xl">
                Turn your experience into someone else's opportunity.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#64748B] md:text-lg">
                Share what you know with future technologists. Teach practical skills, mentor
                learners, and help prepare the next generation for meaningful careers.
              </p>
              <a
                href="https://techbridge-tutor-sandy.vercel.app/"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#2F7F43] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5 hover:bg-[#256B37]"
              >
                Apply to teach
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <img
                src={hero1}
                alt="Technology instructor sharing practical skills with learners"
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[28px] object-cover"
              />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg sm:bottom-6 sm:left-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F5E9] text-[#2F7F43]">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">Teach what you know</p>
                  <p className="mt-1 text-xs text-[#64748B]">Inspire the next generation</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why tutors choose TechBridge */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2F7F43]">
                Why TechBridge
              </span>
              <h2 className="mb-9 mt-4 text-3xl font-bold leading-[1.1] text-[#1E293B] md:text-4xl">
                Why tutors choose TechBridge.
              </h2>
              <div className="flex flex-col gap-7">
                {benefits.map((b) => (
                  <div key={b.title} className="group flex items-start gap-5">
                    <span className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-2xl border border-gray-50 bg-white text-[#2F7F43] shadow-[0_10px_25px_rgba(47,127,67,0.15)] transition-all group-hover:-translate-y-1">
                      <b.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#1E293B]">{b.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[28px] border border-gray-100 bg-[#E6F7EC] p-8 text-center shadow-[0_15px_40px_rgba(47,127,67,0.08)] md:p-10">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#2F7F43] shadow-sm">
                <GraduationCap className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-[#1E293B]">Ready to teach?</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
                Sign up to join our tutor network. We'll review your application and get back to you
                within a few days.
              </p>
              <a
                href="https://techbridge-tutor-sandy.vercel.app/"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7F43] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#256B37]"
              >
                Start your application <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-[#F8FAFC] py-20 md:py-24">
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {expectations.map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="group h-full rounded-[20px] border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1.5 hover:border-green-500/20 hover:shadow-[0_20px_40px_rgba(76,175,80,0.12)]">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#E8F5E9] text-[#2F7F43]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-[#1E293B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor testimonials */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">Testimonials</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
                From our tutors.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name} delay={0.05}>
                <figure className="h-full rounded-[24px] border border-gray-100 bg-[#F8FAFC] p-7 md:p-8">
                  <div className="mb-5 flex gap-1 text-[#4CAF50]" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed text-[#334155]">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 border-t border-gray-200 pt-6">
                    <div className="font-semibold text-[#1E293B]">{t.name}</div>
                    <div className="text-sm text-[#64748B]">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8FAFC] py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
                Common questions.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 space-y-4 md:mt-16">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="text-base font-semibold text-[#1E293B]">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
