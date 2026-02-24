import Image from "next/image";

import type client from "@/../tina/__generated__/client";

type GlobalResponse = Awaited<ReturnType<typeof client.queries.global>>;
type GalleryItem = NonNullable<
  GlobalResponse["data"]["global"]["gallery"]
>[number];

export interface MasonryGalleryProps {
  images?: (GalleryItem | null)[] | null | undefined;
}

// ============================================
// COMPONENT
// ============================================
export const MasonryGallery = ({ images }: MasonryGalleryProps) => {
  // Safely filter out empty images and ensure TypeScript knows 'src' exists
  const safeImages = (images || []).filter(
    (img): img is GalleryItem => !!img && !!img.src
  );

  if (safeImages.length === 0) return null;

  return (
    <div className="reveal-item container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="reveal-item text-primary text-xs font-medium tracking-widest uppercase">
            Visual Proof
          </span>
          <h2 className="reveal-item text-foreground mt-3 text-2xl font-bold md:text-3xl">
            Dashboards & Analytics
          </h2>
        </div>

        {/* Masonry Layout using CSS Columns */}
        {/* Added group/gallery to act as the parent controller for the hover states */}
        <div className="reveal-item group/gallery columns-1 gap-4 [column-fill:balance] sm:columns-2 lg:columns-3">
          {safeImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item group bg-muted hover:shadow-primary/10 /* CSS Native Hover Logic: 1. If anything in the gallery is hovered, scale down and dim everything to 60%. 2. Force the currently hovered item back up to 100% scale and opacity. */ relative mb-4 break-inside-avoid overflow-hidden rounded-2xl transition-all duration-300 group-has-[:hover]/gallery:opacity-70 hover:scale-100! hover:opacity-100! hover:shadow-2xl"
            >
              <Image
                src={img?.src as string}
                alt={img?.title || "Gallery Image"}
                width={800}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block h-auto w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay (Appears on Hover) */}
              <div className="from-background/90 via-background/10 absolute inset-0 flex flex-col justify-end rounded-2xl bg-linear-to-t to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-brand mb-1 text-[10px] font-bold tracking-wider uppercase">
                  {img?.label}
                </span>
                <h3 className="text-foreground translate-y-2 text-sm font-semibold transition-transform duration-300 group-hover:translate-y-0">
                  {img?.title}
                </h3>
              </div>

              {/* Top-left floating label (Disappears on hover) */}
              {img?.label && (
                <span className="bg-background/70 text-foreground border-border/50 absolute top-3 left-3 rounded-lg border px-3 py-1.5 text-[10px] font-bold tracking-wide shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
                  {img?.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
