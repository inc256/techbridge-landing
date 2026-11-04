import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = forceSolid || scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-[400ms] md:z-50 ${
          solid ? "bg-white/95 backdrop-blur border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[70px] items-center justify-between md:h-20">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="TechBridge Skills Hub home"
            onClick={() => setOpen(false)}
          >
            <span className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-wide text-[#1E293B] md:hidden">
              <Sparkles className="h-6 w-6 text-[#4CAF50]" />
              TechBridge
            </span>
            <img
              className="hidden h-8 w-auto object-contain md:block"
              src={logo}
              alt="TechBridge"
            />
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm transition-colors ${solid ? "text-primary hover:text-accent" : "text-[#1E293B] hover:text-[#2F6B3F]"}`}
                activeProps={{ className: "font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/become-tutor"
              className={`text-sm transition-colors ${solid ? "text-primary hover:text-accent" : "text-[#1E293B] hover:text-[#2F6B3F]"}`}
              activeProps={{ className: "font-semibold" }}
            >
              Teach with us
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs capitalize text-muted-foreground">
                  {user.role === "student" ? "Student" : user.role === "tutor" ? "Tutor" : "Guest"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRole(user.role === "student" ? "tutor" : "student")}
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
                  <Button variant="default" size="sm" className="btn-primary">
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
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] transition-colors hover:bg-[#E8F5E9] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-[1000] flex h-dvh flex-col bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2.5 pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-8 flex shrink-0 items-center justify-between">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-wide text-[#1E293B]"
          >
            <Sparkles className="h-6 w-6 text-[#4CAF50]" />
            TechBridge
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-[#F1F5F9] text-[#1E293B] transition-colors hover:bg-[#E2E8F0]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto"
          style={{ fontFamily: "var(--font-ui)" }}
          aria-label="Mobile navigation links"
        >
          <ul className="flex min-h-full flex-col justify-center gap-2 py-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "bg-[#E8F5E9] text-[#2F7F43]" }}
                  className="flex items-center rounded-2xl px-6 py-4 text-2xl font-semibold text-[#1E293B] transition-colors hover:bg-[#F8FAFC] active:bg-[#F8FAFC]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/become-tutor"
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-[#E8F5E9] text-[#2F7F43]" }}
                className="flex items-center rounded-2xl px-6 py-4 text-2xl font-semibold text-[#1E293B] transition-colors hover:bg-[#F8FAFC] active:bg-[#F8FAFC]"
              >
                Teach with us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-4 shrink-0 border-t border-[#E2E8F0] pt-5">
          {user ? (
            <div className="flex flex-col gap-3">
              <p className="px-1 text-sm capitalize text-[#64748B]">Signed in as {user.role}</p>
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl"
                onClick={() => {
                  setRole(user.role === "student" ? "tutor" : "student");
                  setOpen(false);
                }}
              >
                Switch to {user.role === "student" ? "tutor" : "student"}
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full rounded-xl"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <Link
              to="/student-signup"
              onClick={() => setOpen(false)}
              className="block w-full rounded-2xl bg-[#4CAF50] py-4 text-center text-lg font-bold text-white shadow-[0_10px_25px_rgba(76,175,80,0.3)] transition-colors hover:bg-[#3d8b40] active:bg-[#3d8b40]"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
