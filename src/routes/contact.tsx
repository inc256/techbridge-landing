import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MessageCircle, MapPin, Send, Check } from "lucide-react";

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
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  program: z.string().trim().max(120).optional(),
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
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) return;
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <SiteLayout solidNav>
      <PageHeader
        eyebrow="Contact"
        title="Let's start a conversation."
        subtitle="Whether you're applying, hiring, or partnering — we'd love to hear from you."
      />

      <section className="py-24 md:py-32 bg-white">
        <div className="container-x grid md:grid-cols-5 gap-12">
          <Reveal className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary leading-[1.1]">
              Reach us directly.
            </h2>
            <p className="mt-4 text-foreground">Our team responds within one business day.</p>
            <ul className="mt-10 space-y-6" style={{ fontFamily: "var(--font-ui)" }}>
              {[
                { icon: MapPin, label: "Innovation Way 24, Tech District" },
                { icon: Phone, label: "+1 (555) 010-2024", href: "tel:+15550102024" },
                { icon: Mail, label: "hello@techbridge.edu", href: "mailto:hello@techbridge.edu" },
                { icon: MessageCircle, label: "WhatsApp us", href: "https://wa.me/15550102024" },
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="h-11 w-11 grid place-items-center rounded-sm bg-[color:var(--surface)] text-accent shrink-0">
                    <r.icon className="h-5 w-5" />
                  </span>
                  {r.href ? (
                    <a
                      className="text-primary hover:text-accent transition-colors mt-2"
                      href={r.href}
                    >
                      {r.label}
                    </a>
                  ) : (
                    <span className="text-primary mt-2">{r.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[color:var(--surface)] p-8 md:p-10 rounded-sm space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Full name" error={errors.name?.message}>
                  <input {...register("name")} className={inputCls} autoComplete="name" />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputCls}
                    autoComplete="email"
                  />
                </Field>
              </div>
              <Field label="Program of interest" hint="(optional)">
                <input
                  {...register("program")}
                  className={inputCls}
                  placeholder="e.g. Software Engineering"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea {...register("message")} rows={5} className={`${inputCls} resize-none`} />
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto disabled:opacity-70"
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Message sent
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "w-full h-12 px-4 rounded-sm border border-border bg-white text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";

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
      <span className="text-sm text-primary font-medium" style={{ fontFamily: "var(--font-ui)" }}>
        {label} {hint && <span className="text-muted-foreground font-normal">{hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
