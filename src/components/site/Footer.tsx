import { Link } from "@tanstack/react-router";
import { Cpu, Mail, Phone, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-deep-green text-white/80">
      <div className="container-x py-12 md:py-16 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-white/10">
              <Cpu className="h-5 w-5 text-white" />
            </span>
            <span
              className="text-white font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TechBridge
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            Equipping the next generation of innovators with practical technology skills and
            career-focused education.
          </p>
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/about", label: "About" },
              { to: "/courses", label: "Courses" },
              { to: "/contact", label: "Contact" },
              { to: "/become-tutor", label: "Teach with us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="tel:+256702881116" className="hover:text-white">
                +256 702 881 116
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="mailto:hello@techbridge.edu" className="hover:text-white">
                hello@techbridge.edu
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} TechBridge Skills Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
