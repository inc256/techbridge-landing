import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { ContactCTA } from "@/components/site/sections";
import aboutImg from "@/assets/optimized/hero-4.webp";
import hero1 from "@/assets/optimized/hero-1.webp";
import hero2 from "@/assets/optimized/hero-2.webp";
import hero3 from "@/assets/optimized/hero-3.webp";
import hero4 from "@/assets/optimized/hero-4.webp";
import {
  Award,
  Trophy,
  Clock,
  GraduationCap,
  Users,
  Globe,
  Sparkles,
  CheckCircle,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TechBridge Skills Hub" },
      {
        name: "description",
        content:
          "Our history, mission, vision, values and the leadership team behind TechBridge Skills Hub.",
      },
      { property: "og:title", content: "About TechBridge Skills Hub" },
      {
        property: "og:description",
        content: "The story, mission and people behind TechBridge Skills Hub.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

// Helper functions for handling clicks
const handleStudentClick = () => {
  window.location.href = "https://techbridge-student.vercel.app/";
};

const handleTutorClick = () => {
  window.location.href = "https://techbridge-tutor-sandy.vercel.app/";
};

const handleExploreClick = () => {
  window.location.href = "https://techbridge-student.vercel.app/";
};

function AboutPage() {
  return (
    <SiteLayout solidNav>

      {/* Welcome / Introduction */}
      <section className="bg-white pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2F7F43]">
                  Welcome to TechBridge
                </p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#1E293B] sm:text-5xl lg:text-[3.5rem]">
                  Opening doors to digital opportunity.
                </h1>
                <p className="mt-6 text-base leading-relaxed text-[#64748B] md:text-lg">
                  We help learners build the knowledge and confidence they need to succeed in
                  school, work, business, and the digital world.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button onClick={handleExploreClick} className="btn-primary">
                    Explore Programs <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={handleStudentClick} className="btn-secondary">
                    Get Started
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="TechBridge learners building practical skills"
                  width={1200}
                  height={800}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[28px] object-cover"
                />
                <div className="absolute -bottom-5 left-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg sm:bottom-6 sm:left-6">
                  <p className="text-sm font-bold text-[#1E293B]">Learn by doing</p>
                  <p className="mt-1 text-xs text-[#64748B]">Skills for a changing world</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-[#F8FAFC] py-16 md:py-24 lg:py-28">
        <div className="container-x">
          <div className="grid gap-10 md:gap-16 lg:grid-cols-2 items-center px-4 sm:px-6">
            <Reveal>
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="TechBridge mission"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover rounded-[28px] shadow-xl"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">Our Mission</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                Making quality digital education accessible to everyone.
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-foreground">
                TechBridge Skills Hub provides practical, easy-to-understand learning resources that help students and aspiring professionals develop skills they can actually use. We bridge the gap between traditional education and the skills the modern world demands.
              </p>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-foreground">Practical, hands-on learning that builds real skills</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-foreground">Accessible education for learners everywhere</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-foreground">Industry-relevant content designed for tomorrow's careers</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why TechBridge */}
      <section className="bg-[#E6F7EC] py-16 md:py-24 lg:py-28">
        <div className="container-x px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">Why TechBridge</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                What makes us different.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Clock, title: "Learn at Your Own Pace", desc: "Study whenever and wherever it suits you. No rigid schedules, just flexible learning." },
              { icon: Trophy, title: "Practical Learning", desc: "Focus on skills and projects rather than just theory. Build what you learn." },
              { icon: Sparkles, title: "Beginner-Friendly", desc: "Courses designed to be understandable even if you're starting from scratch." },
              { icon: Globe, title: "Affordable & Accessible", desc: "Make learning available to more students regardless of location or budget." },
              { icon: Users, title: "Community Driven", desc: "Learn with peers, get feedback, and grow together in a supportive environment." },
              { icon: Award, title: "Build Real Skills", desc: "Develop skills you can use in employment, freelancing, or entrepreneurship." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div 
                  onClick={handleStudentClick}
                  className="group h-full rounded-[20px] border border-transparent bg-white p-6 transition-all hover:-translate-y-1.5 hover:border-green-500/20 hover:shadow-[0_20px_40px_rgba(76,175,80,0.15)] sm:p-8"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E8F5E9] text-[#2F7F43] transition-colors group-hover:bg-[#2F7F43] group-hover:text-white">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl text-primary">{item.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-foreground/80 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-x px-4 sm:px-6">
          <div className="grid gap-10 md:gap-16 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="eyebrow">Who We Serve</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                Designed for everyone.
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-foreground">
                TechBridge Skills Hub is designed for students, beginners, job seekers, entrepreneurs, professionals, and anyone who wants to improve their digital skills and keep up with the changing world of technology.
              </p>
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button 
                  onClick={handleStudentClick}
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#E8F5E9]"
                >
                  <GraduationCap className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary font-medium">Students & Learners</span>
                  <ArrowRight className="h-4 w-4 text-accent ml-auto" />
                </button>
                <button 
                  onClick={handleTutorClick}
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#E8F5E9]"
                >
                  <UserPlus className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary font-medium">Tutors & Educators</span>
                  <ArrowRight className="h-4 w-4 text-accent ml-auto" />
                </button>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button onClick={handleStudentClick} className="btn-primary text-sm sm:text-base w-full sm:w-auto">
                  Join as Student <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={handleTutorClick} className="btn-secondary text-sm sm:text-base w-full sm:w-auto">
                  Join as Tutor <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <img
                  src={hero1}
                  alt="Students learning"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-2xl"
                />
                <img
                  src={hero2}
                  alt="Professional development"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-2xl mt-4 sm:mt-6 md:mt-8"
                />
                <img
                  src={hero3}
                  alt="Community learning"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-2xl -mt-4 sm:-mt-6 md:-mt-8"
                />
                <img
                  src={hero4}
                  alt="Digital skills"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-2xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA />
    </SiteLayout>
  );
}