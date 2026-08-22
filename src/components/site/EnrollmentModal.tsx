import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, User, Mail, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    id: string;
    title: string;
    duration: string;
    price?: number;
  };
}

export function EnrollmentModal({ open, onOpenChange, course }: EnrollmentModalProps) {
  const { user, setRole, enroll } = useAuth();
  const [step, setStep] = useState<"details" | "success">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isStudent = user?.role === "student";

  const handleEnroll = () => {
    if (!isStudent) {
      setRole("student");
    }
    if (user?.email) setEmail(user.email);
    if (user?.name) setName(user.name);
    enroll(course.id);
    setStep("success");
  };

  const reset = () => {
    setStep("details");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        {step === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle>Enroll in {course.title}</DialogTitle>
              <DialogDescription>
                {course.price ? `$${course.price} · ` : "Free · "}
                {course.duration}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              {!isStudent && (
                <div className="bg-accent/5 border border-accent/20 rounded-sm p-4 text-sm text-foreground">
                  <p className="font-medium mb-1">Create a student profile to enroll</p>
                  <p className="text-muted-foreground">
                    We'll save your details for faster checkout next time.
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="enroll-name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="enroll-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enroll-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="enroll-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enroll-phone">Phone (optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="enroll-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleEnroll} className="w-full">
                {isStudent ? "Confirm Enrollment" : "Create profile & enroll"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" />
                You're enrolled!
              </DialogTitle>
              <DialogDescription>
                We've saved your spot in{" "}
                <span className="font-medium text-primary">{course.title}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-[color:var(--surface)] rounded-sm p-6 text-center space-y-2 mt-2">
              <p className="text-sm text-muted-foreground">A confirmation will be sent to</p>
              <p className="text-sm font-medium text-primary">{email || "your email"}</p>
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/student-signup">Complete signup</Link>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
