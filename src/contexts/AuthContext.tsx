import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type UserRole = "student" | "tutor" | null;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledCourses?: string[];
  tutorStatus?: "pending" | "approved" | "rejected";
}

interface AuthContextValue {
  user: UserProfile | null;
  setRole: (role: UserRole) => void;
  enroll: (courseId: string) => void;
  unenroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "techbridge_user";

function loadUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const setRole = (role: UserRole) => {
    setUser((prev) => {
      if (!prev) {
        return {
          id: crypto.randomUUID(),
          name: "",
          email: "",
          role,
          enrolledCourses: [],
        };
      }
      return { ...prev, role };
    });
  };

  const enroll = (courseId: string) => {
    setUser((prev) => {
      if (!prev || prev.role !== "student") return prev;
      const enrolled = new Set(prev.enrolledCourses ?? []);
      if (!enrolled.has(courseId)) enrolled.add(courseId);
      return { ...prev, enrolledCourses: Array.from(enrolled) };
    });
  };

  const unenroll = (courseId: string) => {
    setUser((prev) => {
      if (!prev || prev.role !== "student") return prev;
      return {
        ...prev,
        enrolledCourses: (prev.enrolledCourses ?? []).filter((id) => id !== courseId),
      };
    });
  };

  const isEnrolled = (courseId: string) => {
    return user?.role === "student" && (user.enrolledCourses ?? []).includes(courseId);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setRole, enroll, unenroll, isEnrolled, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
