import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import hero1 from "@/assets/optimized/hero-1.webp";
import hero2 from "@/assets/optimized/hero-2.webp";
import hero3 from "@/assets/optimized/hero-3.webp";
import hero4 from "@/assets/optimized/hero-4.webp";
import hero5 from "@/assets/optimized/hero-5.webp";
import hero6 from "@/assets/optimized/hero-6.webp";
import hero7 from "@/assets/optimized/hero-7.webp";
import hero8 from "@/assets/optimized/hero-8.webp";

const slides = [hero7, hero2, hero3, hero4, hero5, hero6, hero8, hero1];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const nextSlide = new Image();
    nextSlide.src = slides[(activeSlide + 1) % slides.length];
  }, [activeSlide]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };
  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative min-h-[90svh] w-full overflow-hidden bg-[#BFD8C3]"
      style={{ clipPath: "ellipse(150% 100% at 50% 0%)" }}
    >
      <div className="container-x grid min-h-[90svh] items-center gap-12 pb-24 pt-24 md:grid-cols-[0.9fr_1.1fr] md:gap-6 md:py-20 lg:gap-8 lg:py-24">
        <div className="relative z-10 text-center lg:text-left">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#2F6B3F]">
            TechBridge Skills Hub
          </p>
          <h1
            id="home-hero-title"
            className="text-4xl font-bold leading-[1.12] text-[#1E293B] md:text-4xl lg:text-[4rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Grow your skills.
            <br className="hidden lg:block" /> Shape your future.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#64748B] md:text-lg lg:mx-0">
            Empowering future innovators through technology, practical skills, and industry-focused
            education.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2F7F43] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition-colors hover:bg-[#256B37]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center rounded-lg border border-[#2F7F43]/30 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#1E293B] transition-colors hover:bg-white"
            >
              Explore Programs
            </Link>
          </div>
          <p className="mt-5 text-sm text-[#64748B]">
            Prefer teaching?{" "}
            <a
              href="https://techbridge-tutor-sandy.vercel.app/"
              className="font-semibold text-[#2F6B3F] underline underline-offset-2 transition-colors hover:text-[#1E293B]"
            >
              Join as a tutor
            </a>
          </p>
        </div>

        <div className="relative mx-auto flex h-[360px] w-full max-w-[620px] items-center justify-center sm:h-[420px] md:h-[min(60svh,440px)] md:min-h-[360px] lg:h-[min(65svh,560px)] lg:min-h-[430px]">
          <div className="absolute h-[min(76vw,300px)] w-[min(76vw,300px)] rounded-full bg-[#2F7F43] sm:h-[400px] sm:w-[400px] lg:h-[470px] lg:w-[470px]" />
          <div className="absolute h-[370px] w-[370px] rounded-full border-2 border-dashed border-[#2F7F43]/70 sm:h-[490px] sm:w-[490px] lg:h-[570px] lg:w-[570px]" />

          <div className="relative z-10 h-[min(69vw,270px)] w-[min(69vw,270px)] overflow-hidden rounded-full shadow-2xl sm:h-[360px] sm:w-[360px] lg:h-[424px] lg:w-[424px]">
            <AnimatePresence mode="sync">
              <motion.img
                key={activeSlide}
                src={slides[activeSlide]}
                alt="Students learning at TechBridge"
                width={800}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                loading={activeSlide === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={activeSlide === 0 ? "high" : "auto"}
              />
            </AnimatePresence>
          </div>

          <div className="absolute left-0 top-[12%] z-20 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur-md sm:left-2 sm:p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5F0E6] text-[#2F7F43]">
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E293B]">Career-ready</p>
              <p className="text-[10px] text-[#64748B]">Practical skills for real work</p>
            </div>
          </div>

          <div className="absolute right-0 top-[8%] z-20 rounded-2xl bg-white/95 p-4 text-center shadow-xl backdrop-blur-md sm:right-2 sm:p-5">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F0E6] text-[#2F7F43]">
              <GraduationCap className="h-4 w-4" />
            </div>
            <p className="mb-1 text-xs text-[#64748B]">Learn with experts</p>
            <p className="text-sm font-bold text-[#1E293B]">Industry-led</p>
          </div>

          <div className="absolute bottom-[20%] left-0 z-20 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md sm:left-2 sm:p-5">
            <p className="text-sm font-bold text-[#1E293B]">Take the next step</p>
            <p className="mt-1 text-[10px] text-[#64748B]">Find a program that fits your goals</p>
            <Link
              to="/courses"
              className="mt-3 inline-flex items-center gap-1 rounded-md bg-[#2F7F43] px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-[#256B37]"
            >
              Browse programs
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 p-2 shadow-xl">
            <button
              type="button"
              onClick={showPreviousSlide}
              aria-label="Previous hero image"
              className="grid h-8 w-8 place-items-center rounded-full text-[#1E293B] transition-colors hover:bg-[#E5F0E6]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5" aria-label="Choose hero image">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === index ? "w-5 bg-[#2F7F43]" : "w-1.5 bg-[#86B994]"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNextSlide}
              aria-label="Next hero image"
              className="grid h-8 w-8 place-items-center rounded-full text-[#1E293B] transition-colors hover:bg-[#E5F0E6]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
