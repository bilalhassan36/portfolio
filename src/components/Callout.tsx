import Link from "next/link";

import { ArrowRight, Phone } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { cn } from "@/lib/utils";

type CalloutData = Awaited<
  ReturnType<typeof client.queries.pages>
>["data"]["pages"]["callout"];

export type CalloutButton = {
  label?: string;
  url?: string;
};

type Props = {
  data?: CalloutData;
  className?: string;
};

export const Callout = ({ data, className }: Props) => {
  if (data?.enabled === false) return null;

  const baseButtonStyles =
    "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full cursor-pointer";

  // Sidebar variant: compact card used in case-study sidebars
  if (data?.variant === "sidebar") {
    return (
      <div
        className={cn(
          "bg-foreground text-background relative overflow-hidden rounded-2xl p-6 text-center",
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <h4 className="relative z-10 mb-2 text-xl font-bold">
          {data?.headline || "Need scale like this?"}
        </h4>
        <p className="relative z-10 mb-6 text-sm text-white/70">
          {data?.copy || "Let's audit your current setup."}
        </p>
        <Link
          href={data?.primary?.url || "/contact"}
          className="bg-brand text-background hover:bg-brand/90 relative z-10 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-bold transition-colors"
        >
          {data?.primary?.label || "Book Audit"}
        </Link>
      </div>
    );
  }

  // Default: full-width callout
  return (
    <section className={cn("py-12", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="bg-foreground text-background relative overflow-hidden rounded-[2.5rem] border border-white/5 px-6 py-12 text-center md:rounded-[3rem] md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="text-brand mb-6 flex h-14 w-14 rotate-6 transform animate-bounce items-center justify-center rounded-2xl bg-white shadow-lg shadow-white/10">
              <Phone className="h-6 w-6" />
            </div>

            <h2 className="mb-4 text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-5xl">
              {data?.headline || "Ready to be our next"} <br />
              {data?.emphasis ? (
                <span className="text-brand inline-block transform cursor-default transition-transform duration-300 hover:scale-105">
                  {data?.emphasis}
                </span>
              ) : (
                <span className="text-brand inline-block transform cursor-default transition-transform duration-300 hover:scale-105">
                  Success Story?
                </span>
              )}
            </h2>

            <p className="mb-8 max-w-md text-sm leading-relaxed font-medium text-white/70 md:text-base">
              {data?.copy ||
                "Book a free consultation and we'll analyze your business to find the perfect strategy for your growth."}
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={data?.primary?.url || "/contact"}
                className="w-full sm:w-auto"
              >
                <button
                  className={cn(
                    baseButtonStyles,
                    "bg-brand shadow-brand/20 hover:shadow-brand/40 group text-white shadow-md hover:-translate-y-0.5"
                  )}
                >
                  {data?.primary?.label || "Schedule a Call"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link
                href={data?.secondary?.url || "/packages"}
                className="w-full sm:w-auto"
              >
                <button
                  className={cn(
                    baseButtonStyles,
                    "text-foreground bg-white shadow-lg shadow-white/5 hover:bg-white/90"
                  )}
                >
                  {data?.secondary?.label || "View Packages"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Callout;
