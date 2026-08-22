import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/student-signup")({
  head: () => ({
    meta: [
      { title: "Student Signup — TechBridge Skills Hub" },
      { name: "description", content: "Complete your student registration." },
    ],
  }),
  component: StudentSignupPage,
});

function StudentSignupPage() {
  useEffect(() => {
    window.location.href = "https://techbridge-student.vercel.app/";
  }, []);
  return null;
}
