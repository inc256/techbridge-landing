import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, Send, Check, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Apply — TechBridge Skills Hub" },
      {
        name: "description",
        content:
          "Get in touch or start your application. Phone, email, WhatsApp, and campus contact.",
      },
      { property: "og:title", content: "Contact TechBridge Skills Hub" },
      {
        property: "og:description",
        content: "Reach the admissions team or apply for the next cohort.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  topic: z.string().trim().min(1, "Choose a topic").max(120),
  message: z.string().trim().min(10, "Please add a short message").max(1000),
});
type FormData = z.infer<typeof schema>;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <SiteLayout solidNav>
      <section className="flex min-h-screen items-center bg-[#F8FAFC] px-6 py-24 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-extrabold text-[#1E293B] md:text-5xl">
                Get in Touch
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
                Have a question about our programs, admissions, or partnering with us? We're here to
                help.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="p-8 md:p-12">
                <h2 className="mb-8 text-2xl font-bold text-[#1E293B]">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="First Name" error={errors.firstName?.message}>
                      <input
                        {...register("firstName")}
                        className={inputCls}
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </Field>
                    <Field label="Last Name" error={errors.lastName?.message}>
                      <input
                        {...register("lastName")}
                        className={inputCls}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </Field>
                  </div>
                  <Field label="Email Address" error={errors.email?.message}>
                    <input
                      type="email"
                      {...register("email")}
                      className={inputCls}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="I'm interested in..." error={errors.topic?.message}>
                    <select {...register("topic")} className={`${inputCls} appearance-none`}>
                      <option value="">Select a topic</option>
                      <option value="admissions">Admissions &amp; Programs</option>
                      <option value="tutoring">Becoming a Tutor</option>
                      <option value="partnership">Corporate Partnership</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </Field>
                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="How can we help you?"
                      className={`${inputCls} min-h-[120px] resize-y py-3.5`}
                    />
                  </Field>
                  {sent && (
                    <p role="status" className="text-sm font-medium text-[#2F7F43]">
                      Thanks for reaching out. Your message has been received.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-xl bg-[#4CAF50] py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3d8b40] hover:shadow-[0_10px_20px_rgba(76,175,80,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : sent ? "Send Another Message" : "Send Message"}
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="relative flex h-full flex-col justify-center overflow-hidden bg-[#E6F7EC] p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-[100px] -top-[100px] h-[300px] w-[300px] rounded-full bg-[#4CAF50]/10"
                />
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-[#1E293B]">Contact Information</h2>
                  <p className="mb-10 leading-relaxed text-[#64748B]">
                    Fill out the form or reach us directly through the details below.
                  </p>

                  <div className="space-y-8">
                    <ContactDetail
                      icon={Phone}
                      title="Call Us"
                      href="tel:+256702881116"
                      value="+256 702 881 116"
                    />
                    <ContactDetail
                      icon={Mail}
                      title="Email Us"
                      href="mailto:hello@techbridge.edu"
                      value="hello@techbridge.edu"
                    />
                    <ContactDetail
                      icon={MapPin}
                      title="Visit Us"
                      value={
                        <>
                          Kampala, Uganda
                          <br />
                          Innovation Hub, Level 3
                        </>
                      }
                    />
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3.5 text-sm text-[#1E293B] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#4CAF50] focus:bg-white focus:ring-4 focus:ring-[#4CAF50]/10";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#1E293B]">
        {label} {hint && <span className="text-muted-foreground font-normal">{hint}</span>}
      </span>
      <div>{children}</div>
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function ContactDetail({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: LucideIcon;
  title: string;
  value: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="group flex items-start gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#4CAF50] shadow-[0_10px_20px_rgba(76,175,80,0.1)] transition-transform duration-300 group-hover:-translate-y-1">
        <Icon size={22} strokeWidth={2} />
      </div>
      <div>
        <h3 className="mb-1 text-base font-semibold text-[#1E293B]">{title}</h3>
        {href ? (
          <a
            href={href}
            className="text-[0.95rem] text-[#64748B] transition-colors hover:text-[#4CAF50]"
          >
            {value}
          </a>
        ) : (
          <p className="text-[0.95rem] leading-relaxed text-[#64748B]">{value}</p>
        )}
      </div>
    </div>
  );
}
