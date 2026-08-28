import { useState } from "react";

const SUPABASE_MEDIA_URL = "https://xcxuhqghaddopvzhapgw.supabase.co/storage/v1/object/public/media";
const SUPABASE_THUMBNAIL_PREFIX = `${SUPABASE_MEDIA_URL}/courses/thumbnails/`;

export function resolveCourseThumbnail(value?: string | null) {
  const thumbnail = typeof value === "string" ? value.trim() : "";
  if (!thumbnail) return null;
  if (thumbnail.startsWith(SUPABASE_THUMBNAIL_PREFIX)) return thumbnail;

  const filename = thumbnail
    .split(/[?#]/, 1)[0]
    .replace(/\\/g, "/")
    .split("/")
    .pop();

  if (!filename) return null;
  return `${SUPABASE_THUMBNAIL_PREFIX}${encodeURIComponent(filename)}`;
}

interface CourseThumbProps {
  variant?: string;
  color?: string | null;
  thumbnail?: string | null;
  title?: string;
  className?: string;
  fallbackSrc?: string;
}

export function CourseThumb({
  variant = "network",
  color = "#2563eb",
  thumbnail,
  title,
  className = "aspect-[16/10]",
  fallbackSrc,
}: CourseThumbProps) {
  const safeThumbnail = resolveCourseThumbnail(thumbnail);
  const [imageFailed, setImageFailed] = useState(false);
  const bg = isHexColor(color) ? color : "#2563eb";
  const showImage = Boolean(safeThumbnail) && !imageFailed;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${bg} 0%, ${shade(bg, -15)} 100%)` }}
    >
      {showImage ? (
        <img
          src={safeThumbnail ?? undefined}
          alt={title ?? "Course thumbnail"}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : fallbackSrc ? (
        <img
          src={fallbackSrc}
          alt={title ?? "Course thumbnail"}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <FallbackArtwork variant={variant} />
      )}
      {title && (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-[11px] font-medium uppercase tracking-widest text-white/70">
            TechBridge
          </div>
        </div>
      )}
    </div>
  );
}

function FallbackArtwork({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 400 250" aria-hidden="true" className="absolute inset-0 h-full w-full opacity-90">
      {variant === "security" ? (
        <g fill="none" stroke="white" strokeOpacity="0.4">
          <path d="M200 40 L280 80 L280 150 Q280 200 200 220 Q120 200 120 150 L120 80 Z" fill="white" fillOpacity="0.08" strokeWidth="1.5" />
          <path d="M170 130 L195 155 L240 105" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : variant === "code" ? (
        <g fill="white" fillOpacity="0.9" fontFamily="ui-monospace, monospace" fontSize="14">
          <text x="40" y="70" opacity="0.5">const</text>
          <text x="90" y="70">learn = () =&gt; &#123;</text>
          <text x="60" y="105">return</text>
          <text x="130" y="105" opacity="0.8">&quot;skills&quot;</text>
          <text x="40" y="140">&#125;</text>
          <rect x="40" y="170" width="80" height="4" rx="2" opacity="0.5" />
          <rect x="40" y="185" width="180" height="4" rx="2" opacity="0.3" />
          <rect x="40" y="200" width="130" height="4" rx="2" opacity="0.3" />
        </g>
      ) : (
        <g stroke="white" strokeOpacity="0.35" fill="none">
          <circle cx="80" cy="80" r="6" fill="white" fillOpacity="0.9" />
          <circle cx="200" cy="50" r="6" fill="white" fillOpacity="0.9" />
          <circle cx="320" cy="90" r="6" fill="white" fillOpacity="0.9" />
          <circle cx="120" cy="180" r="6" fill="white" fillOpacity="0.9" />
          <circle cx="280" cy="200" r="6" fill="white" fillOpacity="0.9" />
          <circle cx="200" cy="130" r="8" fill="white" />
          <line x1="80" y1="80" x2="200" y2="130" />
          <line x1="200" y1="50" x2="200" y2="130" />
          <line x1="320" y1="90" x2="200" y2="130" />
          <line x1="120" y1="180" x2="200" y2="130" />
          <line x1="280" y1="200" x2="200" y2="130" />
        </g>
      )}
    </svg>
  );
}

function isHexColor(value: string | null | undefined): value is string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.slice(1), 16);
  const red = Math.max(0, Math.min(255, (num >> 16) + percent));
  const green = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent));
  const blue = Math.max(0, Math.min(255, (num & 0x0000ff) + percent));
  return `rgb(${red}, ${green}, ${blue})`;
}