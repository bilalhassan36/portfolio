"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { Slot } from "@radix-ui/react-slot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePreloaderStore } from "@/store/use-preloader-store";

gsap.registerPlugin(ScrollTrigger);

interface RevealWrapperProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const RevealWrapper = ({ children, asChild }: RevealWrapperProps) => {
  const containerRef = useRef(null);
  const isFinished = usePreloaderStore((state) => state.isFinished);

  useGSAP(
    () => {
      if (!isFinished) return;

      const items = gsap.utils.toArray(".reveal-item");
      if (!items.length) return;

      // Recalculate ScrollTrigger positions now that scrollbar might have returned
      ScrollTrigger.refresh();

      gsap.fromTo(
        items,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isFinished] }
  );

  const Component = asChild ? Slot : "div";
  return <Component ref={containerRef}>{children}</Component>;
};
