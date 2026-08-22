// src/components/site/sections.tsx
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Shield,
  Palette,
  Cloud,
  Smartphone,
  Award,
  Users,
  GraduationCap,
  Building2,
  Lightbulb,
  Clock,
  Star,
  ChevronRight,
  Loader2,
  Bot,
  GitBranch,
  UserPlus,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { apiClient } from "@/lib/api/client";
import aboutImg from "@/assets/about.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";

// Types
interface Program {
  id: string;
  title: string;
  category: string;
  slug: string;
  instructor: string;
  description: string;
  duration: string;
  students: number;
  image: string;
  thumbnail?: string | null;
  color: string;
  modules: number;
  rating?: number;
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

const handleEnrollClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  window.location.href = "https://techbridge-student.vercel.app/";
};

// FeaturedPrograms component - API only
export function FeaturedPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient<any>("/courses/");
        console.log("Featured programs API response:", response);
        const results = response?.results || [];
        setPrograms(results.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setError("Unable to load featured programs");
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-[color:var(--surface)]">
        <div className="container-x">
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading programs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || programs.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-[color:var(--surface)]">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">Featured Programs</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
                Programs built with industry, taught by practitioners.
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 text-center py-16">
            <p className="text-muted-foreground">
              {error || "No featured programs available at the moment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-[color:var(--surface)]">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Featured Programs</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
              Programs built with industry, taught by practitioners.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => {
            const img = p.thumbnail || p.image || fallbackImages[i % fallbackImages.length];
            return (
              <Reveal key={p.id || p.title} delay={i * 0.05}>
                <article
                  onClick={handleCardClick}
                  className="group bg-white rounded-sm overflow-hidden border border-border hover:border-accent/40 transition-all hover:shadow-md h-full flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={p.title}
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
                    <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-primary/90 text-white px-3 py-1 rounded-sm">
                      {getString(p.category)}
                    </div>
                    {p.rating && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                        <span>★</span>
                        <span>{p.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {p.enrolled_count && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-sm">
                        {p.enrolled_count.toLocaleString()} enrolled
                      </div>
                    )}
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {p.duration || "Flexible duration"}
                    </div>

                    <h3 className="mt-3 text-xl text-primary font-medium line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-foreground flex-1 line-clamp-3">
                      {p.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border">
                      <button
                        onClick={handleEnrollClick}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-sm bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <UserPlus className="h-4 w-4" />
                        Enroll
                      </button>
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

// WhyChoose component
export function WhyChoose() {
  const whyItems = [
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      desc: "Learn from active engineers, designers, and researchers.",
    },
    {
      icon: Lightbulb,
      title: "Hands-on Learning",
      desc: "Projects, labs, and real client work — not just lectures.",
    },
    {
      icon: Award,
      title: "Industry Certifications",
      desc: "Graduate with credentials employers actually recognize.",
    },
    {
      icon: Users,
      title: "Career Guidance",
      desc: "Dedicated coaches, interview prep, and hiring partners.",
    },
    {
      icon: Building2,
      title: "Innovation Labs",
      desc: "State-of-the-art facilities for robotics, AI, and cloud.",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      desc: "Full-time, part-time, and online tracks that fit your life.",
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Why TechBridge</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-primary leading-[1.05]">
              An education designed around outcomes.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div 
                onClick={handleCardClick}
                className="group cursor-pointer"
              >
                <div className="h-12 w-12 grid place-items-center rounded-sm bg-[color:var(--surface)] text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl text-primary">{f.title}</h3>
                <p className="mt-3 text-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
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
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img
        src={hero1}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative container-x text-center text-white">
        <Reveal>
          <span className="eyebrow" style={{ color: "oklch(0.75 0.15 262)" }}>
            Ready to begin?
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white max-w-4xl mx-auto leading-[1.05]">
            Your future in technology starts with a single application.
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Join thousands of graduates building meaningful careers at the world's most exciting
            technology companies.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={handleCardClick} className="btn-primary">
              Apply Now <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={handleCardClick} className="btn-secondary">
              Contact Us
            </button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Prefer teaching?{" "}
            <span onClick={handleCardClick} className="underline hover:text-white transition-colors cursor-pointer">
              Join as a tutor
            </span>
          </p>
        </Reveal>
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