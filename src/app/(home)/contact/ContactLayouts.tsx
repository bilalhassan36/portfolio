/**
 * @file ContactSidebar.tsx
 * @description Client-side presentational sidebar for the contact page.
 * Displays contact methods, address details, and expected response times.
 * @dependencies
 * - UI: `Clock`, `Mail`, `MapPin`, `Phone` (Lucide)
 * - TinaCMS: Global query types for dynamic contact data
 */
"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";

import type client from "@/../tina/__generated__/client";
import { RevealWrapper } from "@/components/RevealWrapper";

type SidebarData = NonNullable<
  Awaited<ReturnType<typeof client.queries.formConfig>>["data"]["formConfig"]
>["sidebar"];

interface SidebarProps {
  data?: SidebarData | null;
}

export const ContactSidebar = ({ data }: SidebarProps) => (
  <RevealWrapper>
    <div className="reveal-item sticky top-24 flex flex-col gap-8">
      <div>
        <h4 className="text-clay border-linen mb-4 border-b pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:border-zinc-800 dark:text-zinc-500">
          Contact
        </h4>
        <ul className="space-y-4">
          <li className="group">
            <a
              href={`mailto:${data?.email || "hello@example.com"}`}
              className="text-foreground hover:text-brand dark:hover:text-brand-400 flex items-center gap-2 text-sm font-medium transition-colors duration-300 dark:text-zinc-50"
            >
              <Mail className="text-brand dark:text-brand-400 h-3.5 w-3.5 transition-colors duration-300" />
              {data?.email || "hello@example.com"}
            </a>
          </li>
          <li className="group">
            <a
              href={`tel:${data?.phone}`}
              className="text-foreground hover:text-brand dark:hover:text-brand-400 flex items-center gap-2 text-sm font-medium transition-colors duration-300 dark:text-zinc-50"
            >
              <Phone className="text-brand dark:text-brand-400 h-3.5 w-3.5 transition-colors duration-300" />
              {data?.phone || "+1 (555) 000-0000"}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-clay border-linen mb-4 border-b pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:border-zinc-800 dark:text-zinc-500">
          Details
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="text-brand dark:text-brand-400 h-3.5 w-3.5 transition-colors duration-300" />
            <p className="text-foreground text-sm font-medium transition-colors duration-300 dark:text-zinc-50">
              {data?.address || "123 Business St, City"}
            </p>
          </div>
          <p className="text-clay pl-5.5 text-xs transition-colors duration-300 dark:text-zinc-400">
            {data?.hours || "Mon-Fri: 9am - 5pm"}
          </p>
        </div>
      </div>

      <div className="bg-linen/20 border-brand dark:border-brand-400 border-l-2 p-4 transition-colors duration-300 dark:bg-zinc-900/50">
        <p className="text-clay text-xs leading-relaxed font-medium transition-colors duration-300 dark:text-zinc-400">
          <span className="text-foreground mb-1 flex items-center gap-1.5 font-bold transition-colors duration-300 dark:text-zinc-50">
            <Clock className="text-brand dark:text-brand-400 h-3 w-3 transition-colors duration-300" />
            Response Time
          </span>
          Usually within 24 hours on business days.
        </p>
      </div>
    </div>
  </RevealWrapper>
);
