import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Cpu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, setRole, logout } = useAuth();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = forceSolid || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ${
        solid ? "bg-white/95 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="TechBridge Skills Hub home">
          <img className="h-8 w-auto object-contain" src={logo} alt="Logo"></img>
        </Link>

        <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "var(--font-ui)" }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors ${solid ? "text-primary hover:text-accent" : "text-white/90 hover:text-white"}`}
              activeProps={{ className: "font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/become-tutor"
            className={`text-sm transition-colors ${solid ? "text-primary hover:text-accent" : "text-white/90 hover:text-white"}`}
          >
            Teach with us
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span
                className="text-xs text-muted-foreground capitalize"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                {user.role === "student" ? "Student" : user.role === "tutor" ? "Tutor" : "Guest"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (user.role === "student") {
                    setRole("tutor");
                  } else if (user.role === "tutor") {
                    setRole("student");
                  } else {
                    setRole("student");
                  }
                }}
                className="text-xs"
              >
                Switch to {user.role === "student" ? "tutor" : "student"}
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="btn-primary"
                >
                  Apply Now
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/student-signup">Student signup</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tutor-signup">Tutor signup</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button
          className={`md:hidden grid place-items-center h-10 w-10 rounded-md ${solid ? "text-primary" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-white border-b border-border transition-all duration-300 overflow-hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className="container-x flex flex-col py-6 gap-1"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3 text-primary text-base border-b border-border/60"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/become-tutor"
            onClick={() => setOpen(false)}
            className="py-3 text-primary text-base border-b border-border/60"
          >
            Teach with us
          </Link>
          <div className="py-3 text-primary text-base border-b border-border/60">
            <div className="text-xs text-muted-foreground mb-2">Apply Now</div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link to="/student-signup">Student signup</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link to="/tutor-signup">Tutor signup</Link>
              </Button>
            </div>
          </div>
          <div className="pt-4 flex flex-col gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground capitalize px-1">
                  Role: {user.role}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRole(user.role === "student" ? "tutor" : "student");
                    setOpen(false);
                  }}
                >
                  Switch to {user.role === "student" ? "tutor" : "student"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
