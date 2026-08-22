// src/routes/courses.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ContactCTA } from "@/components/site/sections";
import {
  Search,
  Clock,
  Loader2,
  AlertCircle,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import { apiClient } from "@/lib/api/client";
import { EnrollmentModal } from "@/components/site/EnrollmentModal";
import { useAuth } from "@/contexts/AuthContext";

// Type definitions
interface Course {
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

interface APIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

type CourseCategory = "All" | "Engineering" | "Data & AI" | "Design" | "Infrastructure";

// Helper functions
const getString = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value.name || value.title || value.label || "";
  }
  return String(value);
};

// Format instructor name from "john.kiggundu" to "John Kiggundu"
const formatInstructorName = (name: string): string => {
  if (!name) return "";
  
  // Split by dot or underscore or space
  const parts = name.split(/[._\s]+/);
  
  // Capitalize each part and join with space
  return parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const getInstructorName = (instructor: any): string => {
  if (!instructor) return "";
  if (typeof instructor === "string") {
    return formatInstructorName(instructor);
  }
  if (typeof instructor === "object") {
    if (instructor.first_name && instructor.last_name) {
      return `${instructor.first_name} ${instructor.last_name}`;
    }
    const name = instructor.name || instructor.username || instructor.email || "";
    return formatInstructorName(name);
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

const fallbackImages = [hero1, hero2, hero3, hero4];

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
  const [category, setCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [retry, setRetry] = useState(0);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const { isEnrolled } = useAuth();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient<any>("/courses/categories/");
        console.log("Categories API full response:", response);
        
        let categoryNames: string[] = [];

        // Try different response formats
        if (Array.isArray(response)) {
          // If response is an array
          categoryNames = response.map((item: any) => {
            if (typeof item === "string") return item;
            if (typeof item === "object") {
              return item.name || item.title || item.category || item.slug || String(item);
            }
            return String(item);
          });
        } else if (response?.results && Array.isArray(response.results)) {
          // If response has results array
          categoryNames = response.results.map((item: any) => {
            if (typeof item === "string") return item;
            if (typeof item === "object") {
              return item.name || item.title || item.category || item.slug || String(item);
            }
            return String(item);
          });
        } else if (response?.data && Array.isArray(response.data)) {
          // If response has data array
          categoryNames = response.data.map((item: any) => {
            if (typeof item === "string") return item;
            if (typeof item === "object") {
              return item.name || item.title || item.category || item.slug || String(item);
            }
            return String(item);
          });
        } else if (typeof response === "object") {
          // If response is an object with key-value pairs
          categoryNames = Object.values(response)
            .filter((val) => typeof val === "string" || typeof val === "object")
            .map((item: any) => {
              if (typeof item === "string") return item;
              return item?.name || item?.title || item?.category || item?.slug || String(item);
            });
        }

        // Filter out empty strings and duplicates
        const cleanList = categoryNames
          .filter((cat) => cat && cat.trim().length > 0)
          .filter((cat, index, self) => self.indexOf(cat) === index);

        // Add "All" at the beginning
        const finalList = ["All", ...cleanList];
        
        console.log("Processed categories:", finalList);
        
        // Only update if we got categories back
        if (finalList.length > 1) {
          setCategories(finalList);
        } else {
          // If no categories found, use default hardcoded list as fallback
          setCategories(["All", "Engineering", "Data & AI", "Design", "Infrastructure"]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // Use default categories as fallback
        setCategories(["All", "Engineering", "Data & AI", "Design", "Infrastructure"]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient<APIResponse<Course>>("/courses/");
        console.log("Courses API response:", response);
        setCourses(response?.results || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Unable to load courses. Please try again.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [retry]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const catMatch = category === "All" || getCategory(course) === category;
      const searchLower = search.toLowerCase();
      const titleMatch = course.title?.toLowerCase().includes(searchLower) || false;
      const descMatch = course.description?.toLowerCase().includes(searchLower) || false;
      const instructorMatch = getInstructorName(course.instructor)
        .toLowerCase()
        .includes(searchLower);
      return catMatch && (titleMatch || descMatch || instructorMatch);
    });
  }, [search, category, courses]);

  const handleCardClick = (course: Course) => {
    window.location.href = "https://techbridge-student.vercel.app/";
  };

  const handleEnrollClick = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    setEnrollCourse(course);
    setEnrollOpen(true);
  };

  if (loading) {
    return (
      <SiteLayout solidNav>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading programs...</p>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (error) {
    return (
      <SiteLayout solidNav>
        <PageHeader
          eyebrow="Programs"
          title="Programs that lead to real careers."
          subtitle="Full-time, part-time, and short-form programs across engineering, data, design, and infrastructure."
        />
        <section className="py-16 bg-white">
          <div className="container-x">
            <div className="text-center py-16 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Unable to Load Programs</h3>
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={() => setRetry((r) => r + 1)}
                className="mt-4 px-6 py-2 bg-accent text-white rounded-sm hover:bg-accent/90 inline-flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </section>
        <ContactCTA />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout solidNav>
      <PageHeader
        eyebrow="Programs"
        title="Programs that lead to real careers."
        subtitle="Full-time, part-time, and short-form programs across engineering, data, design, and infrastructure."
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-x">
          {/* Search Bar - Full width, above categories */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs..."
              className="w-full h-12 pl-11 pr-4 rounded-sm border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {courses.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No courses available at the moment.</p>
            </div>
          )}

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => {
              const img = course.thumbnail || course.image || fallbackImages[i % fallbackImages.length];

              return (
                <Reveal key={course.id || i} delay={i * 0.04}>
                  <article
                    onClick={() => handleCardClick(course)}
                    className="group bg-white rounded-sm overflow-hidden border border-border hover:border-accent/40 transition-all hover:shadow-md h-full flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={img}
                        alt={course.title}
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
                        {getCategory(course)}
                      </div>
                      {course.rating && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                          <span>★</span>
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {course.enrolled_count && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-sm">
                          {course.enrolled_count.toLocaleString()} enrolled
                        </div>
                      )}
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration || "Flexible duration"}
                      </div>

                      <h3 className="mt-3 text-xl text-primary font-medium line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-foreground flex-1 line-clamp-3">
                        {course.description}
                      </p>

                      {getInstructorName(course.instructor) && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Instructor: {getInstructorName(course.instructor)}
                        </p>
                      )}

                      <div className="mt-4 pt-4 border-t border-border">
                        <button
                          onClick={(e) => handleEnrollClick(e, course)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-sm transition-colors ${
                            isEnrolled(course.id)
                              ? "bg-accent/10 text-accent border border-accent/20"
                              : "bg-primary text-white hover:bg-primary/90"
                          }`}
                        >
                          <UserPlus className="h-4 w-4" />
                          {isEnrolled(course.id) ? "Enrolled" : "Enroll"}
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            {filtered.length === 0 && courses.length > 0 && (
              <div className="col-span-full text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-primary mb-2">No programs found</h3>
                <p className="text-muted-foreground">
                  {search
                    ? `No programs match "${search}".`
                    : "No programs available in this category."}
                </p>
                {(search || category !== "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="mt-4 text-accent hover:underline text-sm"
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