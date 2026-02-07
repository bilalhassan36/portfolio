/**
 * File: src/app/(home)/caseStudies/[id]/ProofGallery.tsx
 * Purpose: Render a gallery of proof images/screenshots used in case studies.
 * Component: Presentational
 * Client-safe: Yes — purely presentational and safe for server or client usage.
 * Key dependencies: `next/image`, `lucide-react` (ImageIcon)
 */
import Image from "next/image";

import { ImageIcon } from "lucide-react";

// Light type for optional proof images coming from the CMS
interface ProofImage {
  src?: string | null;
  label?: string | null;
  description?: string | null;
}

export const ProofGallery = ({ images }: { images: (ProofImage | null)[] }) => {
  // Early return for empty state
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="group bg-surface border-linen hover:border-brand/30 flex flex-col items-center justify-center rounded-xl border p-6 transition-colors"
          >
            {img?.src ? (
              <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                {/* Next.js Image for optimized delivery */}
                <Image
                  src={img.src}
                  alt={img.label || "Proof"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              // Placeholder when no image URL is provided
              <div className="bg-brand/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <ImageIcon className="text-brand h-5 w-5" />
              </div>
            )}
            <p className="text-foreground text-center text-sm font-bold">
              {img?.label}
            </p>
            <p className="text-clay mt-1 text-center text-xs">
              {img?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
