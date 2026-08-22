import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-[color:var(--surface)] border-b border-border">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold text-primary leading-[1.02] max-w-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-foreground max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
