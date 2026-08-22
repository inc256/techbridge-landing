// queries.ts
import { apiClient } from "./client";
import type {
  SiteContent,
  Program,
  StatItem,
  Testimonial,
  NewsPost,
  WhyItem,
  AdmissionStep,
  Course,
  APIResponse,
} from "./types";

export function useSiteContent() {
  return apiClient<SiteContent>("/site-content");
}

export function usePrograms() {
  return apiClient<Program[]>("/programs");
}

export function useStats() {
  return apiClient<StatItem[]>("/stats");
}

export function useTestimonials() {
  return apiClient<Testimonial[]>("/testimonials");
}

export function useNews() {
  return apiClient<NewsPost[]>("/news");
}

export function useWhyChoose() {
  return apiClient<WhyItem[]>("/why-choose");
}

export function useAdmissions() {
  return apiClient<AdmissionStep[]>("/admissions");
}

// New function to fetch courses from the API
export function useCourses() {
  return apiClient<APIResponse<Course>>("/courses/");
}

// Function to fetch a single course by slug
export function useCourse(slug: string) {
  return apiClient<Course>(`/courses/${slug}/`);
}

// Function to fetch course categories
export function useCourseCategories() {
  return apiClient<string[]>("/courses/categories/");
}
