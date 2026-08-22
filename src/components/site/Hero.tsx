import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import hero7 from "@/assets/hero-7.jpg";
import hero8 from "@/assets/hero-8.jpg";

const slides = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-dvh min-h-[640px] w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={slides[i]}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover animate-kenburns"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[oklch(0.15_0.04_264)]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      <div className="relative z-10 h-full container-x flex flex-col justify-center items-center text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[1.02] text-white max-w-5xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          TechBridge
          <br />
          <span className="opacity-90">Skills Hub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 text-lg md:text-2xl italic text-white/85 max-w-2xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Empowering future innovators through technology, practical skills, and industry-focused
          education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link to="/contact" className="btn-primary">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="btn-secondary">
            Explore Programs
          </Link>
        </motion.div>

        <p className="mt-4 text-xs md:text-sm text-white/70">
          Prefer teaching?{" "}
          <a href="https://techbridge-tutor-sandy.vercel.app/" className="underline hover:text-white transition-colors">
            Join as a tutor
          </a>
        </p>

        {/* Slide indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-white" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>

        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-float-down" />
        </a>
      </div>
    </section>
  );
}
