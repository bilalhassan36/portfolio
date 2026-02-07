"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";

import type client from "@/../tina/__generated__/client";

// --- TYPE INFERENCE ---
// 1. Get the Full Query Response Type
type FormConfigQueryResponse = Awaited<
  ReturnType<typeof client.queries.formConfig>
>;

// 2. Extract strictly the 'sidebar' object
type SidebarData = NonNullable<
  NonNullable<FormConfigQueryResponse["data"]["formConfig"]>["sidebar"]
>;

interface ContactSidebarProps {
  data?: SidebarData | null;
}

export const ContactSidebar = ({ data }: ContactSidebarProps) => {
  return (
    <div className="sticky top-24 flex flex-col gap-8">
      {/* 1. CONTACT INFO */}
      <div className="">
        <h4 className="text-clay border-linen mb-4 border-b pb-2 text-[10px] font-bold tracking-widest uppercase">
          Contact
        </h4>
        <ul className="space-y-4">
          <li className="group">
            <a
              href={`mailto:${data?.email || "hello@example.com"}`}
              className="text-foreground hover:text-brand flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Mail className="text-brand h-3.5 w-3.5" />
              {data?.email || "hello@example.com"}
            </a>
          </li>
          <li className="group">
            <a
              href={`tel:${data?.phone}`}
              className="text-foreground hover:text-brand flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Phone className="text-brand h-3.5 w-3.5" />
              {data?.phone || "+1 (555) 000-0000"}
            </a>
          </li>
        </ul>
      </div>

      {/* 2. LOCATION / HOURS */}
      <div className="">
        <h4 className="text-clay border-linen mb-4 border-b pb-2 text-[10px] font-bold tracking-widest uppercase">
          Details
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="text-brand h-3.5 w-3.5" />
            <p className="text-foreground text-sm font-medium">
              {data?.address || "123 Business St, City"}
            </p>
          </div>
          <p className="text-clay pl-5.5 text-xs">
            {data?.hours || "Mon-Fri: 9am - 5pm"}
          </p>
        </div>
      </div>

      {/* 3. RESPONSE TIME (Now Dynamic) */}
      <div className="bg-linen/20 border-brand border-l-2 p-4">
        <p className="text-clay text-xs leading-relaxed font-medium">
          <span className="text-foreground mb-1 flex items-center gap-1.5 font-bold">
            <Clock className="text-brand h-3 w-3" />
            Response Time
          </span>
          {/* 👇 Uses CMS data or fallback */}
          {data?.responseTime || "Usually within 24 hours on business days."}
        </p>
      </div>
    </div>
  );
};
