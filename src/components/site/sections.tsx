// src/components/site/sections.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Shield,
  Palette,
  Megaphone,
  Cloud,
  Smartphone,
  Award,
  GraduationCap,
  Clock,
  Star,
  UserCheck,
  PlayCircle,
  Users,
  ChevronRight,
  Loader2,
  Bot,
  GitBranch,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { apiClient } from "@/lib/api/client";
import aboutImg from "@/assets/about.jpg";
import hero1 from "@/assets/optimized/hero-1.webp";
import hero2 from "@/assets/optimized/hero-2.webp";
import hero3 from "@/assets/optimized/hero-3.webp";
import hero4 from "@/assets/optimized/hero-4.webp";
import hero5 from "@/assets/optimized/hero-5.webp";

interface FeaturedProgram {
  id: string;
  title: string;
  tutorName: string;
  category: string;
  image: string;
  price: number | "Free";
  lessons: number;
  students: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Testimonial {
  id: string;
  name: string;
  program: string;
  quote: string;
  rating: number;
  avatar?: string;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug?: string;
}

// Helper functions
const getString = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value.name || value.title || value.label || "";
  }
  return String(value);
};

const fallbackImages = [hero1, hero2, hero3, hero4];

// Helper function to handle card clicks
const handleCardClick = () => {
  window.location.href = "https://techbridge-student.vercel.app/";
};

const featuredPrograms: FeaturedProgram[] = [
  {
    id: "python-data-science",
    title: "Complete Python for Data Science & Machine Learning",
    tutorName: "Dr. Sarah Jenkins",
    image: hero1,
    category: "Data Science",
    price: 49,
    lessons: 24,
    students: "1.2k",
  },
  {
    id: "figma-design",
    title: "Mastering Figma: From Wireframes to Prototypes",
    tutorName: "Marcus Chen",
    image: hero2,
    category: "UI/UX Design",
    price: "Free",
    lessons: 18,
    students: "3.4k",
  },
  {
    id: "full-stack-react",
    title: "Full-Stack React & Node.js Bootcamp",
    tutorName: "Elena Rodriguez",
    image: hero3,
    category: "Web Development",
    price: 39,
    lessons: 42,
    students: "850",
  },
];

export function FeaturedPrograms() {
  return (
    <section className="bg-[#F8FAFC] py-20 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-[#1E293B] md:text-4xl">
                Featured Programs
              </h2>
              <p className="text-lg text-[#64748B]">
                Programs built with industry, taught by practitioners.
              </p>
            </div>
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 font-semibold text-[#2F7F43] transition-colors hover:text-[#256B37]"
            >
              View All Programs
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPrograms.map((course, index) => {
            const isFree = course.price === "Free";
            const initials = course.tutorName
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <Reveal key={course.id} delay={index * 0.05}>
                <article
                  onClick={handleCardClick}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-green-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-[#1E293B] shadow-sm backdrop-blur-sm">
                      {course.category}
                    </span>
                    <span
                      className={`absolute bottom-4 right-4 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg ${
                        isFree ? "bg-[#3B82F6] shadow-blue-500/40" : "bg-[#4CAF50] shadow-green-500/40"
                      }`}
                    >
                      {isFree ? "Free" : `$${course.price}`}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-5 line-clamp-2 text-xl font-semibold leading-snug text-[#1E293B]">
                      {course.title}
                    </h3>

                    <div className="mb-6 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8F5E9] text-xs font-semibold text-[#2F7F43]"
                      >
                        {initials}
                      </span>
                      <span className="text-sm font-medium text-[#64748B]">{course.tutorName}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-medium text-[#64748B]">
                      <span className="flex items-center gap-2">
                        <PlayCircle size={18} className="text-[#4CAF50]" />
                        {course.lessons} Lessons
                      </span>
                      <span className="flex items-center gap-2">
                        <Users size={18} className="text-[#4CAF50]" />
                        {course.students} Students
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// AboutPreview component
export function AboutPreview() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container-x grid gap-14 md:gap-20 md:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <img
              src={aboutImg}
              alt="TechBridge student"
              width={1200}
              height={1400}
              loading="lazy"
              className="w-full h-[480px] md:h-[600px] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-white p-6 rounded-sm max-w-[220px]">
              <div className="text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                12+
              </div>
              <div className="text-sm text-white/70 mt-1">
                Years shaping tomorrow's technologists
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">About TechBridge</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
            Where curiosity becomes <em className="not-italic text-accent">career</em>.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground">
            TechBridge Skills Hub is a modern learning environment for the next generation of
            engineers, designers, and problem-solvers. We blend hands-on projects, industry
            mentorship, and rigorous curriculum to prepare students for real technology careers.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <div
                className="text-xs uppercase tracking-widest text-accent font-medium"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Our Mission
              </div>
              <p className="mt-2 text-foreground">
                To democratize technology education and equip every student with skills the industry
                actually values.
              </p>
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-widest text-accent font-medium"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Our Vision
              </div>
              <p className="mt-2 text-foreground">
                A world where anyone with drive can build a meaningful career in technology.
              </p>
            </div>
          </div>
          <button onClick={handleCardClick} className="btn-dark mt-10 text-sm">
            Read More <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

const topCategories = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    courses: "120+ Courses",
    icon: Palette,
    iconBackground: "bg-[#E3F2FD]",
    iconColor: "text-[#2196F3]",
  },
  {
    id: "web-dev",
    title: "Web Development",
    courses: "85+ Courses",
    icon: Code2,
    iconBackground: "bg-[#F3E5F5]",
    iconColor: "text-[#9C27B0]",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    courses: "65+ Courses",
    icon: Megaphone,
    iconBackground: "bg-[#FFF3E0]",
    iconColor: "text-[#FF9800]",
  },
  {
    id: "data-science",
    title: "Data Science",
    courses: "90+ Courses",
    icon: Database,
    iconBackground: "bg-[#E8F5E9]",
    iconColor: "text-[#4CAF50]",
  },
];

export function TopCategories() {
  return (
    <section className="bg-[#E6F7EC] py-20 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-[#1E293B] md:text-4xl">Top Categories</h2>
            <p className="mt-4 text-base text-[#64748B]">
              Explore our most popular courses and start building your skills today.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {topCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <Link
                to="/courses"
                className="group block h-full rounded-[20px] border border-transparent bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-green-500/20 hover:shadow-[0_20px_40px_rgba(76,175,80,0.15)]"
              >
                <span
                  className={`mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${category.iconBackground} ${category.iconColor}`}
                >
                  <category.icon size={32} strokeWidth={1.5} />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-[#1E293B]">{category.title}</h3>
                <p className="mb-6 text-sm text-[#64748B]">{category.courses}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F7F43] transition-colors group-hover:text-[#256B37]">
                  Explore Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// WhyChoose component
export function WhyChoose() {
  const whyItems = [
    {
      icon: UserCheck,
      title: "Expert Instructors",
      desc: "Learn from active engineers, designers, and researchers.",
    },
    {
      icon: Award,
      title: "Industry Certifications",
      desc: "Graduate with credentials employers actually recognize.",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      desc: "Full-time, part-time, and online tracks that fit your life.",
    },
  ];
  return (
    <section className="overflow-hidden bg-white py-20 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-10 text-center lg:text-left">
                <span className="eyebrow">Why TechBridge</span>
                <h2 className="mt-4 text-3xl font-bold leading-[1.1] text-[#1E293B] md:text-5xl">
                  An education designed around outcomes.
                </h2>
                <p className="mt-4 text-lg font-medium text-[#64748B]">
                  Build practical skills with support that moves your career forward.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-7">
              {whyItems.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 0.06}>
                  <div className="group flex items-start gap-5">
                    <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-gray-50 bg-white text-[#2F7F43] shadow-[0_10px_25px_rgba(47,127,67,0.15)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_15px_30px_rgba(47,127,67,0.25)]">
                      <feature.icon size={28} strokeWidth={2} />
                    </div>
                    <div className="pt-1">
                      <h3 className="mb-1 text-xl font-semibold text-[#1E293B]">{feature.title}</h3>
                      <p className="text-base leading-relaxed text-[#64748B]">{feature.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex h-[460px] w-full max-w-[560px] items-center justify-center sm:h-[540px]">
            <div className="absolute h-[min(72vw,350px)] w-[min(72vw,350px)] rounded-full bg-[#75C79A] opacity-90 sm:h-[430px] sm:w-[430px]" />
            <div className="absolute h-[min(86vw,420px)] w-[min(86vw,420px)] rounded-full border-2 border-dashed border-[#A5D6A7] sm:h-[530px] sm:w-[530px] motion-safe:animate-[spin_40s_linear_infinite]" />
            <img
              src={hero5}
              alt="TechBridge learner working toward a career in technology"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="relative z-10 h-[min(64vw,300px)] w-[min(64vw,300px)] rounded-full object-cover shadow-2xl sm:h-[380px] sm:w-[380px]"
            />

            <div className="absolute right-0 top-[5%] z-20 rounded-2xl bg-white/95 px-5 py-4 text-center shadow-[0_15px_35px_rgba(0,0,0,0.1)] backdrop-blur-md sm:right-0 sm:top-10 sm:px-6 sm:py-5">
              <p className="mb-1 text-3xl font-bold leading-none text-[#2F7F43]">94%</p>
              <p className="text-xs font-medium text-[#64748B]">Placement Rate</p>
            </div>

            <div className="absolute bottom-[5%] left-0 z-20 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.1)] sm:bottom-[60px] sm:-left-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2F7F43]">
                <Star size={20} strokeWidth={2} fill="currentColor" />
              </span>
              <p className="text-sm font-semibold text-[#1E293B]">Top Rated Program</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Admissions component
export function Admissions() {
  const steps = [
    {
      n: "01",
      title: "Choose Program",
      desc: "Explore programs and find the one that matches your ambition.",
    },
    {
      n: "02",
      title: "Submit Application",
      desc: "Fill out a short form and tell us about yourself.",
    },
    {
      n: "03",
      title: "Review",
      desc: "Our team reviews and invites qualified applicants to interview.",
    },
    {
      n: "04",
      title: "Admission",
      desc: "Receive your offer and secure your seat in the next cohort.",
    },
    {
      n: "05",
      title: "Start Learning",
      desc: "Begin your journey with orientation and your first sprint.",
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-[color:var(--surface)]">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Admissions</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
              Five steps to your future.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div 
                onClick={handleCardClick}
                className="bg-white p-6 rounded-sm h-full border-t-2 border-accent cursor-pointer hover:shadow-md transition-shadow"
              >
                <div
                  className="text-xs text-accent tracking-widest"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  STEP {s.n}
                </div>
                <h3 className="mt-3 text-lg text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={handleCardClick} className="btn-primary">
            Apply Now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Testimonials component - API enabled
export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackTestimonials = [
    {
      id: "1",
      name: "Amara Okafor",
      program: "Software Engineering '24",
      quote:
        "TechBridge didn't just teach me to code — it taught me to think like an engineer. I was hired before graduation.",
      rating: 5,
    },
    {
      id: "2",
      name: "Daniel Mwangi",
      program: "Data Science & AI '24",
      quote:
        "The instructors are working professionals. Every project felt like real industry work.",
      rating: 5,
    },
    {
      id: "3",
      name: "Priya Ramesh",
      program: "UI/UX Design '23",
      quote:
        "I built a portfolio I'm genuinely proud of. Career services helped me land my dream role.",
      rating: 5,
    },
    {
      id: "4",
      name: "Kwame Boateng",
      program: "Cybersecurity '24",
      quote: "Hands-on labs, real threat scenarios. Nothing beats the depth of learning here.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient<any>("/testimonials/");
        console.log("Testimonials API response:", response);
        const results = response?.results || [];
        if (results.length > 0) {
          setTestimonials(results);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-primary text-white">
        <div className="container-x">
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="mt-4 text-white/70">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-primary text-white">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow" style={{ color: "oklch(0.75 0.15 262)" }}>
              Student Voices
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
              Stories from our graduates.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.id || t.name} delay={i * 0.06}>
              <figure 
                onClick={handleCardClick}
                className="bg-white/5 border border-white/10 rounded-sm p-8 h-full cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star
                      key={k}
                      className="h-4 w-4 fill-current"
                      style={{ color: "oklch(0.75 0.15 262)" }}
                    />
                  ))}
                </div>
                <blockquote
                  className="mt-6 text-lg md:text-xl leading-relaxed text-white/90"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-white font-medium">{t.name}</div>
                  <div className="text-sm text-white/60" style={{ fontFamily: "var(--font-ui)" }}>
                    {t.program}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery component
export function Gallery() {
  const imgs = [
    { src: hero1, alt: "Campus", tall: true },
    { src: hero4, alt: "Innovation lab" },
    { src: hero2, alt: "Students" },
    { src: hero3, alt: "Coding session", tall: true },
  ];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Campus Gallery</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
              Inside TechBridge.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {imgs.map((im, i) => (
            <Reveal key={i} delay={i * 0.05} className={im.tall ? "row-span-2" : ""}>
              <div 
                onClick={handleCardClick}
                className="relative overflow-hidden rounded-sm h-full cursor-pointer"
              >
                <img
                  src={im.src}
                  alt={im.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// LatestNews component - API enabled
export function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackNews = [
    {
      id: "1",
      date: "Mar 12, 2026",
      title: "New AI Research Lab opens at TechBridge campus",
      excerpt:
        "A 4,000 sq ft facility dedicated to applied machine learning, computer vision, and NLP.",
      imageUrl: hero4,
    },
    {
      id: "2",
      date: "Feb 28, 2026",
      title: "TechBridge partners with 12 leading engineering firms",
      excerpt: "Guaranteed internships and pipeline hiring for our graduating cohorts.",
      imageUrl: hero2,
    },
    {
      id: "3",
      date: "Feb 04, 2026",
      title: "Applications open for the 2026 cohort",
      excerpt: "Early admission benefits, scholarships, and merit awards now available.",
      imageUrl: hero1,
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient<any>("/news/");
        console.log("News API response:", response);
        const results = response?.results || [];
        if (results.length > 0) {
          setNews(results);
        } else {
          setNews(fallbackNews);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-[color:var(--surface)]">
        <div className="container-x">
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-[color:var(--surface)]">
      <div className="container-x">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 max-w-4xl">
            <div>
              <span className="eyebrow">Latest News</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                From the newsroom.
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {news.map((p, i) => (
            <Reveal key={p.id || p.title} delay={i * 0.06}>
              <article 
                onClick={handleCardClick}
                className="group bg-white rounded-sm overflow-hidden border border-border hover:border-accent/40 transition-colors h-full cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.imageUrl || fallbackImages[i % fallbackImages.length]}
                    alt=""
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        fallbackImages[i % fallbackImages.length];
                    }}
                  />
                </div>
                <div className="p-7">
                  <div
                    className="text-xs text-muted-foreground uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    {p.date}
                  </div>
                  <h3 className="mt-3 text-xl text-primary leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm text-foreground leading-relaxed">{p.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read more <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ContactCTA component
export function ContactCTA() {
  return (
    <section className="bg-white py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] px-6 py-20 text-center shadow-[0_25px_50px_-12px_rgba(27,94,32,0.5)] md:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 40%, transparent 80%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[150px] -top-[150px] z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(129,199,132,0.4)_0%,rgba(129,199,132,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[200px] -right-[150px] z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.3)_0%,rgba(76,175,80,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[80px] right-[10%] z-0 h-[300px] w-[300px] rounded-full border-2 border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-[15%] z-0 h-[150px] w-[150px] rounded-full border-2 border-dashed border-white/10"
          />

          <Reveal>
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <h2 className="mb-4 text-4xl font-extrabold leading-[1.2] tracking-tight text-white md:text-5xl lg:text-[3.2rem]">
                Ready to begin?
              </h2>
              <p className="mb-5 text-lg font-semibold text-[#A5D6A7] md:text-xl">
                Your future in technology starts with a single application.
              </p>
              <p className="mb-12 max-w-2xl text-base leading-relaxed text-[#E8F5E9] opacity-90 md:text-lg">
                Join thousands of graduates building meaningful careers at the world's most
                exciting technology companies.
              </p>

              <div className="mb-10 flex w-full flex-col items-center justify-center gap-5 sm:w-auto sm:flex-row">
                <a
                  href="https://techbridge-student.vercel.app/"
                  className="w-full rounded-xl bg-white px-10 py-4 text-lg font-semibold text-[#1B5E20] shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#F1F8E9] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] sm:w-auto"
                >
                  Apply Now
                </a>
                <Link
                  to="/contact"
                  className="w-full rounded-xl border-2 border-white/40 bg-white/5 px-10 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white hover:bg-white/15 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>

              <p className="text-sm text-[#E8F5E9] opacity-80 md:text-base">
                Prefer teaching?{" "}
                <a
                  href="https://techbridge-tutor-sandy.vercel.app/"
                  className="font-bold text-white underline decoration-2 decoration-[#A5D6A7] underline-offset-4 transition-colors duration-300 hover:text-[#A5D6A7] hover:decoration-white"
                >
                  Join as a tutor
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Stats component - API enabled
export function Stats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Students Trained", value: 5000, suffix: "+" },
    { label: "Expert Trainers", value: 120, suffix: "+" },
    { label: "Programs Offered", value: 40, suffix: "+" },
    { label: "Graduate Success", value: 95, suffix: "%" },
    { label: "Industry Partners", value: 50, suffix: "+" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient<any>("/stats/");
        console.log("Stats API response:", response);
        if (response && Array.isArray(response)) {
          setStats(response);
        } else if (response?.results && Array.isArray(response.results)) {
          setStats(response.results);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container-x">
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary text-white py-20 md:py-28">
      <div className="container-x grid grid-cols-2 md:grid-cols-5 gap-10">
        {stats.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.06}>
            <div className="text-center md:text-left">
              <div
                className="text-4xl md:text-6xl font-semibold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                <Counter to={it.value} suffix={it.suffix} />
              </div>
              <div
                className="mt-3 text-sm text-white/60 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {it.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}