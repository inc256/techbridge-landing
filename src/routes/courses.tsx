// src/routes/courses.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { ContactCTA } from "@/components/site/sections";
import { Search, PlayCircle, Users } from "lucide-react";
import hero1 from "@/assets/optimized/hero-1.webp";
import hero2 from "@/assets/optimized/hero-2.webp";
import hero3 from "@/assets/optimized/hero-3.webp";
import hero4 from "@/assets/optimized/hero-4.webp";
import { EnrollmentModal } from "@/components/site/EnrollmentModal";
import { useAuth } from "@/contexts/AuthContext";
import type { Course } from "@/lib/api/types";

type CourseCategory = "All" | "Engineering" | "Data & AI" | "Design" | "Infrastructure";

// Helper functions
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (value: unknown): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isRecord(value)) {
    for (const key of ["name", "title", "label"]) {
      if (typeof value[key] === "string") return value[key];
    }
  }
  return String(value);
};

// Format instructor name from "john.kiggundu" to "John Kiggundu"
const formatInstructorName = (name: string): string => {
  if (!name) return "";

  // Split by dot or underscore or space
  const parts = name.split(/[._\s]+/);

  // Capitalize each part and join with space
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
};

const getInstructorName = (instructor: unknown): string => {
  if (!instructor) return "";
  if (typeof instructor === "string") {
    return formatInstructorName(instructor);
  }
  if (isRecord(instructor)) {
    if (
      typeof instructor.first_name === "string" &&
      typeof instructor.last_name === "string"
    ) {
      return `${instructor.first_name} ${instructor.last_name}`;
    }
    for (const key of ["name", "username", "email"]) {
      if (typeof instructor[key] === "string") {
        return formatInstructorName(instructor[key]);
      }
    }
  }
  return formatInstructorName(String(instructor));
};

const getCategory = (course: Course): CourseCategory => {
  const cat = getString(course.category).toLowerCase();

  if (cat.includes("engineering") || cat.includes("software") || cat.includes("development")) {
    return "Engineering";
  }
  if (cat.includes("data") || cat.includes("ai") || cat.includes("machine learning")) {
    return "Data & AI";
  }
  if (cat.includes("design") || cat.includes("ui") || cat.includes("ux")) {
    return "Design";
  }
  if (cat.includes("infrastructure") || cat.includes("cloud") || cat.includes("security")) {
    return "Infrastructure";
  }

  const title = course.title?.toLowerCase() || "";
  if (title.includes("engineering") || title.includes("software") || title.includes("mobile")) {
    return "Engineering";
  }
  if (title.includes("data") || title.includes("ai") || title.includes("machine learning")) {
    return "Data & AI";
  }
  if (title.includes("design") || title.includes("ui") || title.includes("ux")) {
    return "Design";
  }
  if (title.includes("cloud") || title.includes("devops") || title.includes("security")) {
    return "Infrastructure";
  }

  return "Engineering";
};

const categories: CourseCategory[] = [
  "All",
  "Engineering",
  "Data & AI",
  "Design",
  "Infrastructure",
];

const demoCourses: Course[] = [
  {
    id: "python-data-science",
    slug: "python-data-science",
    title: "Complete Python for Data Science & Machine Learning",
    instructor: "Dr. Sarah Jenkins",
    category: "Data Science",
    duration: "12 weeks",
    students: 1200,
    price: 49,
    image: hero1,
    thumbnail: null,
    color: "#2F7F43",
    description: "Learn Python, data analysis, and machine learning through practical projects.",
    modules: 24,
  },
  {
    id: "figma-design",
    slug: "figma-design",
    title: "Mastering Figma: From Wireframes to Prototypes",
    instructor: "Marcus Chen",
    category: "UI/UX Design",
    duration: "8 weeks",
    students: 3400,
    price: 0,
    image: hero2,
    thumbnail: null,
    color: "#9C27B0",
    description: "Build modern interface design skills, from first sketch to interactive prototype.",
    modules: 18,
  },
  {
    id: "full-stack-react",
    slug: "full-stack-react",
    title: "Full-Stack React & Node.js Bootcamp",
    instructor: "Elena Rodriguez",
    category: "Web Development",
    duration: "16 weeks",
    students: 850,
    price: 39,
    image: hero3,
    thumbnail: null,
    color: "#2196F3",
    description: "Create full-stack web applications using React, Node.js, and modern tooling.",
    modules: 42,
  },
  {
    id: "cloud-fundamentals",
    slug: "cloud-fundamentals",
    title: "Cloud Computing & Infrastructure Fundamentals",
    instructor: "James Okello",
    category: "Infrastructure",
    duration: "10 weeks",
    students: 2100,
    price: 35,
    image: hero4,
    thumbnail: null,
    color: "#FF9800",
    description: "Understand cloud platforms, deployment workflows, and infrastructure essentials.",
    modules: 20,
  },
];

// Route definition
export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — TechBridge Skills Hub" },
      {
        name: "description",
        content:
          "Explore programs in software engineering, data science, AI, design, cloud and cybersecurity.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CourseCategory>("All");
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const { isEnrolled } = useAuth();

  const filtered = useMemo(() => {
    return demoCourses.filter((course) => {
      const catMatch = category === "All" || getCategory(course) === category;
      const searchLower = search.toLowerCase();
      const titleMatch = course.title?.toLowerCase().includes(searchLower) || false;
      const descMatch = course.description?.toLowerCase().includes(searchLower) || false;
      const instructorMatch = getInstructorName(course.instructor)
        .toLowerCase()
        .includes(searchLower);
      return catMatch && (titleMatch || descMatch || instructorMatch);
    });
  }, [search, category]);

  const openEnrollment = (course: Course) => {
    setEnrollCourse(course);
    setEnrollOpen(true);
  };

  return (
    <SiteLayout solidNav>
      <section className="bg-[#F8FAFC] pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="container-x">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2F6B3F]">
              TechBridge Courses
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-[#1E293B] md:text-5xl">
              Find a program for your next step.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#64748B] md:text-lg">
              Browse practical courses taught by instructors with industry experience.
            </p>
          </div>

          <div className="rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-11 pr-4 text-[#1E293B] placeholder:text-[#64748B] transition-colors focus:border-[#2F7F43] focus:outline-none focus:ring-4 focus:ring-green-700/10"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    category === item
                      ? "bg-[#2F7F43] text-white"
                      : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E8F5E9] hover:text-[#2F7F43]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => {
              const isFree =
                course.price === 0 ||
                (typeof course.price === "string" && course.price.trim().toLowerCase() === "free");
              const tutorName = getInstructorName(course.instructor);
              const initials = tutorName
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();
              const studentCount =
                course.students >= 1000
                  ? `${(course.students / 1000).toFixed(1).replace(/\.0$/, "")}k`
                  : String(course.students);
              const enrolled = isEnrolled(course.id);

              return (
                <Reveal key={course.id} delay={i * 0.05}>
                  <article
                    onClick={() => openEnrollment(course)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openEnrollment(course);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${enrolled ? "View enrollment for" : "Enroll in"} ${course.title}`}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-green-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-700/20"
                  >
                    <div className="relative h-52 overflow-hidden">
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
                          isFree
                            ? "bg-[#3B82F6] shadow-blue-500/40"
                            : "bg-[#4CAF50] shadow-green-500/40"
                        }`}
                      >
                        {isFree ? "Free" : `$${course.price} one-time`}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="mb-5 line-clamp-2 text-xl font-semibold leading-snug text-[#1E293B]">
                        {course.title}
                      </h2>

                      <div className="mb-6 flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8F5E9] text-xs font-semibold text-[#2F7F43]"
                        >
                          {initials}
                        </span>
                        <span className="text-sm font-medium text-[#64748B]">{tutorName}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-medium text-[#64748B]">
                        <span className="flex items-center gap-2">
                          <PlayCircle size={18} className="text-[#4CAF50]" />
                          {course.modules} Lessons
                        </span>
                        <span className="flex items-center gap-2">
                          <Users size={18} className="text-[#4CAF50]" />
                          {studentCount} Students
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full rounded-[24px] bg-white py-16 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-[#64748B] opacity-50" />
                <h2 className="mb-2 text-xl font-semibold text-[#1E293B]">No courses found</h2>
                <p className="text-[#64748B]">
                  {search
                    ? `No courses match "${search}".`
                    : "No courses available in this category."}
                </p>
                {(search || category !== "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="mt-4 text-sm font-semibold text-[#2F7F43] hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactCTA />

      {enrollCourse && (
        <EnrollmentModal
          open={enrollOpen}
          onOpenChange={setEnrollOpen}
          course={{
            id: enrollCourse.id,
            title: enrollCourse.title,
            duration: enrollCourse.duration,
            price: enrollCourse.price,
          }}
        />
      )}
    </SiteLayout>
  );
}
