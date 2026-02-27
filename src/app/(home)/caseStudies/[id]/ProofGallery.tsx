/**
 * @file ProofGallery.tsx
 * @description Renders a responsive gallery grid of proof images or screenshots for case studies.
 * Handles missing image sources gracefully with a branded fallback icon.
 * @dependencies
 * - Next.js: `Image` for optimized image delivery
 * - UI: `ImageIcon` (Lucide)
 */
import Image from "next/image";

import { ImageIcon } from "lucide-react";

interface ProofImage {
  src?: string | null;
  label?: string | null;
  description?: string | null;
}

interface ProofGalleryProps {
  images: (ProofImage | null)[];
}

export const ProofGallery = ({ images }: ProofGalleryProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="group bg-surface border-linen hover:border-brand/30 dark:hover:border-brand/40 dark:bg-linen/10 flex flex-col items-center justify-center rounded-xl border p-6 transition-colors duration-300 dark:border-zinc-800"
          >
            {img?.src ? (
              <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 transition-colors duration-300 dark:bg-zinc-800/50">
                <Image
                  src={img.src}
                  alt={img.label || "Proof"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-brand/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300">
                <ImageIcon className="text-brand dark:text-brand-400 h-5 w-5 transition-colors duration-300" />
              </div>
            )}

            <p className="text-foreground text-center text-sm font-bold transition-colors duration-300 dark:text-zinc-50">
              {img?.label}
            </p>

            <p className="text-clay mt-1 text-center text-xs transition-colors duration-300 dark:text-zinc-400">
              {img?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
