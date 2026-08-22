import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/tutor-signup")({
  head: () => ({
    meta: [
      { title: "Tutor Signup — TechBridge Skills Hub" },
      { name: "description", content: "Complete your tutor registration." },
    ],
  }),
  component: TutorSignupPage,
});

function TutorSignupPage() {
  useEffect(() => {
    window.location.href = "https://techbridge-tutor-sandy.vercel.app/";
  }, []);
  return null;
}
