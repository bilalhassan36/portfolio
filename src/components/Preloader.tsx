"use client";

import React, { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { usePreloaderStore } from "@/store/use-preloader-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const Preloader = () => {
  const [currency, setCurrency] = useState("$0.00");
  const container = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGGElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const setFinished = usePreloaderStore((state) => state.setFinished);

  const targetRevenue = 2000000;
  const chartEase = "cubic-bezier(0.25, 1, 0.5, 1)";

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => setFinished(), // Signal entire app
      });

      const counter = { value: 0 };

      tl.set(container.current, { display: "flex" })
        .set(maskRef.current, { clipPath: "circle(0% at 100% 0%)" })
        .set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        })
        .set(arrowHeadRef.current, { opacity: 0, scale: 0 });

      tl.fromTo(
        ".reveal-text",
        { y: 60, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          stagger: 0.15,
          ease: "expo.out",
          delay: 0.2,
        }
      );

      const animationDuration = 2;

      tl.to(
        arrowHeadRef.current,
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=1.0"
      )
        .to(
          path,
          { strokeDashoffset: 0, duration: animationDuration, ease: chartEase },
          "<"
        )
        .to(
          arrowHeadRef.current,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: animationDuration,
            ease: chartEase,
          },
          "<"
        )
        .to(
          counter,
          {
            value: targetRevenue,
            duration: animationDuration,
            ease: chartEase,
            onUpdate: () => setCurrency(formatter.format(counter.value)),
          },
          "<"
        );

      tl.to(
        maskRef.current,
        {
          clipPath: "circle(150% at 100% 0%)",
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.2"
      );

      tl.set(container.current, { display: "none" });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="bg-background text-foreground fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden font-sans select-none"
    >
      <div
        ref={maskRef}
        className="bg-background pointer-events-none absolute inset-0 z-50"
      />
      <div className="pointer-events-none absolute inset-0 z-20 flex h-full flex-col justify-between px-4 py-8 md:p-14 lg:p-20">
        <div className="flex flex-col items-start gap-4 md:gap-8">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-foreground block text-5xl leading-[0.8] font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl">
              Bilal
              <br />
              Hassan
            </h1>
          </div>
          <div className="flex flex-col items-start gap-0.5 md:gap-1">
            <div className="overflow-hidden">
              <span className="reveal-text text-muted-foreground block font-serif text-base italic md:text-2xl">
                Strategic
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text text-foreground block text-2xl font-extrabold tracking-tight uppercase md:text-4xl lg:text-5xl">
                Amazon Growth
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text text-brand block text-2xl font-extrabold tracking-tight uppercase md:text-4xl lg:text-5xl">
                Partner
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col items-end text-right">
          <div className="mb-1 overflow-hidden md:mb-2">
            <p className="reveal-text text-muted-foreground block text-[10px] font-bold tracking-[0.2em] uppercase md:text-sm md:tracking-[0.3em] lg:text-base">
              Ad Spend Managed
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-text text-foreground block text-4xl leading-none font-black tracking-tighter tabular-nums sm:text-5xl md:text-6xl lg:text-7xl">
              {currency}
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-50">
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 0 1000 L 120 850 L 220 820 L 350 600 L 500 550 L 650 320 L 800 280 L 1000 0"
            fill="none"
            className="stroke-brand"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g ref={arrowHeadRef}>
            <path d="M -14 -9 L 14 0 L -14 9 Z" className="fill-brand" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Preloader;
