import Image from "next/image";

import { RevealWrapper } from "@/components/RevealWrapper";

// ============================================
// DATA TYPES
// ============================================
export type BrandLogo = {
  name?: string | null;
  logo?: string | null;
};

export interface LogoMarqueeProps {
  brands?: (BrandLogo | null)[] | null;
}

// ============================================
// COMPONENT
// ============================================
export const LogoMarquee = ({ brands }: LogoMarqueeProps) => {
  const safeBrands = (brands || []).filter(
    (b): b is BrandLogo => !!b && !!b.logo
  );

  if (safeBrands.length === 0) {
    return null;
  }

  const trackBrands = [
    ...safeBrands,
    ...safeBrands,
    ...safeBrands,
    ...safeBrands,
  ];

  return (
    // REMOVED: ref={marqueeRef} and opacity-0
    <RevealWrapper asChild>
      <div className="w-full max-w-full overflow-hidden py-12">
        {/* Header */}
        <div className="container mx-auto mb-8 px-4 sm:px-6 lg:px-8">
          <p className="reveal-item text-muted-foreground text-center text-xs tracking-widest uppercase">
            Trusted by brands across categories
          </p>
        </div>
        {/* MARQUEE CONTAINER */}
        <div className="bg-background group/marquee relative flex w-full max-w-full overflow-hidden">
          {/* LEFT GRADIENT BLUR */}
          <div className="from-background via-background/60 pointer-events-none absolute top-0 bottom-0 left-0 z-30 h-full w-16 bg-linear-to-r to-transparent" />
          {/* RIGHT GRADIENT BLUR */}
          <div className="from-background via-background/60 pointer-events-none absolute top-0 right-0 bottom-0 z-30 h-full w-16 bg-linear-to-l to-transparent" />
          {/* TRACK 1 */}
          <div className="animate-marquee-scroll flex min-w-max shrink-0 items-center gap-10 pr-10 group-hover/marquee:[animation-play-state:paused] md:gap-16 md:pr-16">
            {trackBrands.map((brand, i) => (
              <div
                key={`track1-${i}`}
                className="relative h-24 w-24 shrink-0 cursor-default overflow-hidden rounded-2xl transition-opacity duration-300 group-has-[:hover]/marquee:opacity-70 hover:opacity-100 md:h-36 md:w-36"
              >
                <Image
                  src={brand.logo as string}
                  alt={brand.name || "Client Brand Logo"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 144px"
                />
              </div>
            ))}
          </div>
          {/* TRACK 2 */}
          <div
            aria-hidden="true"
            className="animate-marquee-scroll flex min-w-max shrink-0 items-center gap-10 pr-10 group-hover/marquee:[animation-play-state:paused] md:gap-16 md:pr-16"
          >
            {trackBrands.map((brand, i) => (
              <div
                key={`track2-${i}`}
                className="relative h-24 w-24 shrink-0 cursor-default overflow-hidden rounded-2xl transition-opacity duration-300 group-has-[:hover]/marquee:opacity-35 hover:opacity-100! md:h-36 md:w-36"
              >
                <Image
                  src={brand.logo as string}
                  alt={brand.name || "Client Brand Logo"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 144px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
};

export default LogoMarquee;
