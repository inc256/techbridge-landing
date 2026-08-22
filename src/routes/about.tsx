import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ContactCTA } from "@/components/site/sections";
import aboutImg from "@/assets/hero-4.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import { 
  Target, 
  Compass, 
  Heart, 
  Award,
  Laptop,
  Code2,
  Palette,
  Database,
  Megaphone,
  Briefcase,
  BookOpen,
  Trophy,
  Clock,
  GraduationCap,
  Users,
  Globe,
  Sparkles,
  CheckCircle,
  UserPlus,
  ArrowRight
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

      {/* Hero / Introduction */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-x">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <Reveal>
              <span className="eyebrow">Welcome to TechBridge</span>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-[1.05]">
                Your gateway to practical, accessible, and future-ready digital skills.
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto px-2">
                We help learners build the knowledge and confidence they need to succeed in school, work, business, and the digital world.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <button onClick={handleExploreClick} className="btn-primary text-sm sm:text-base">
                  Explore Programs <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={handleStudentClick} className="btn-secondary text-sm sm:text-base">
                  Get Started
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24 lg:py-32 bg-[color:var(--surface)]">
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
                  className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover rounded-sm"
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

      {/* What We Offer */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-x px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">What We Offer</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                Comprehensive programs for every path.
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80">
                From foundational skills to advanced specializations, we have something for everyone.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Laptop, title: "Technology & Computer Skills", desc: "Master essential computing skills for the modern workplace." },
              { icon: Code2, title: "Web Development", desc: "Build websites and web applications from the ground up." },
              { icon: Palette, title: "Graphic Design", desc: "Develop your creative skills with professional design tools." },
              { icon: Database, title: "Data & Digital Skills", desc: "Learn to work with data, analytics, and digital tools." },
              { icon: Megaphone, title: "Digital Marketing", desc: "Reach audiences and build brands in the digital space." },
              { icon: Briefcase, title: "Career & Professional Skills", desc: "Prepare for interviews, networking, and career growth." },
              { icon: BookOpen, title: "Study Resources", desc: "Access comprehensive study materials and learning guides." },
              { icon: Trophy, title: "Practical Projects", desc: "Build a portfolio with real-world projects and assessments." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div 
                  onClick={handleStudentClick}
                  className="group bg-[color:var(--surface)] p-4 sm:p-6 rounded-sm hover:shadow-md transition-all cursor-pointer hover:border-accent/40 border border-border"
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 grid place-items-center rounded-sm bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-primary">{item.title}</h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-foreground/80 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why TechBridge */}
      <section className="py-16 md:py-24 lg:py-32 bg-[color:var(--surface)]">
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
                  className="bg-white p-6 sm:p-8 rounded-sm border border-border hover:border-accent/40 transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 grid place-items-center rounded-sm bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
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
                  className="flex items-center gap-3 bg-[color:var(--surface)] p-4 rounded-sm hover:bg-accent/10 transition-colors cursor-pointer w-full"
                >
                  <GraduationCap className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary font-medium">Students & Learners</span>
                  <ArrowRight className="h-4 w-4 text-accent ml-auto" />
                </button>
                <button 
                  onClick={handleTutorClick}
                  className="flex items-center gap-3 bg-[color:var(--surface)] p-4 rounded-sm hover:bg-accent/10 transition-colors cursor-pointer w-full"
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
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-sm"
                />
                <img
                  src={hero2}
                  alt="Professional development"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-sm mt-4 sm:mt-6 md:mt-8"
                />
                <img
                  src={hero3}
                  alt="Community learning"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-sm -mt-4 sm:-mt-6 md:-mt-8"
                />
                <img
                  src={hero4}
                  alt="Digital skills"
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-sm"
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