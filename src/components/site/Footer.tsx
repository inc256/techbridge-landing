import { Link } from "@tanstack/react-router";
import { Mail, Phone, Sparkles } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/contact", label: "Contact" },
    { to: "/become-tutor", label: "Teach with us" },
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-[#0F172A] pb-10 pt-20">
      <div className="container-x">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              to="/"
              className="group mb-6 flex w-fit items-center gap-2 text-2xl font-extrabold uppercase tracking-wide text-[#F8FAFC]"
              aria-label="TechBridge home"
            >
              <Sparkles className="h-7 w-7 text-[#4CAF50] transition-transform group-hover:scale-110" />
              TechBridge
            </Link>
            <p className="max-w-[350px] text-[0.95rem] leading-relaxed text-[#94A3B8]">
              Equipping the next generation of innovators with practical technology skills and
              career-focused education.
            </p>
          </div>

          <div>
            <h3 className="relative mb-6 inline-block text-lg font-bold text-[#F8FAFC]">
              Quick Links
              <span className="absolute -bottom-2 left-0 h-[3px] w-[30px] rounded-full bg-[#4CAF50]" />
            </h3>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block text-[0.95rem] font-medium text-[#94A3B8] transition-all duration-300 hover:translate-x-1 hover:text-[#4CAF50]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="relative mb-6 inline-block text-lg font-bold text-[#F8FAFC]">
              Contact
              <span className="absolute -bottom-2 left-0 h-[3px] w-[30px] rounded-full bg-[#4CAF50]" />
            </h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  href="tel:+256702881116"
                  className="group flex items-center gap-3 text-[0.95rem] font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4CAF50]/15 text-[#81C784] transition-colors group-hover:bg-[#4CAF50]/25">
                    <Phone size={18} />
                  </span>
                  +256 702 881 116
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@techbridge.edu"
                  className="group flex items-center gap-3 text-[0.95rem] font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4CAF50]/15 text-[#81C784] transition-colors group-hover:bg-[#4CAF50]/25">
                    <Mail size={18} />
                  </span>
                  hello@techbridge.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-[#94A3B8] md:flex-row">
          <p>&copy; {new Date().getFullYear()} TechBridge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#4CAF50]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#4CAF50]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
