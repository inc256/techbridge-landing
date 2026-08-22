// types.ts

export interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  level?: string;
  duration: string;
  students: number;
  rating?: number;
  reviews?: number;
  certificate?: boolean;
  price?: string;
  image: string;
  thumbnail?: string | null;
  color: string;
  description: string;
  progress?: number;
  modules: number;
}

export interface Program {
  id: string;
  title: string;
  category: any;
  description: string;
  duration: string;
  imageUrl: string;
  icon: any;
  slug?: string;
}

export interface APIResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
  data?: T;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  quote: string;
  rating: number;
}

export interface NewsPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AdmissionStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface SiteContent {
  about: {
    eyebrow: string;
    title: string;
    description: string;
    mission: string;
    vision: string;
    imageUrl: string;
    yearsExperience: number;
  };
  hero: {
    slides: string[];
    eyebrow?: string;
    title: string;
    subtitle: string;
  };
  stats: StatItem[];
  programs: Program[];
  whyChoose: WhyItem[];
  admissions: AdmissionStep[];
  testimonials: Testimonial[];
  news: NewsPost[];
  contactCta: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
  };
}

// Course categories (matching your static categories)
export type CourseCategory = "All" | "Engineering" | "Data & AI" | "Design" | "Infrastructure";
