import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { Slot } from "@radix-ui/react-slot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealWrapperProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const RevealWrapper = ({ children, asChild }: RevealWrapperProps) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".reveal-item");
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          y: 50,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.2,
          // The Scroll Configuration
          scrollTrigger: {
            trigger: containerRef.current, // Watch this element
            start: "top 80%", // Start when top of element hits 80% of viewport
            end: "bottom 20%", // End point (useful if using scrub)
            // toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
            // scrub: true, // Uncomment if you want animation tied to scroll speed
          },
        }
      );
    },
    { scope: containerRef }
  );

  const Component = asChild ? Slot : "div";
  return <Component ref={containerRef}>{children}</Component>;
};
