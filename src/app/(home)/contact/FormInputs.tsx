/**
 * @file FormInputs.tsx
 * @description Custom, accessible form input primitives tailored for the contact form.
 * Includes text inputs, textareas, and a fully custom dropdown select component synced
 * with a hidden native input for Formspree compatibility.
 * @dependencies
 * - @formspree/react: `ValidationError`
 * - UI: `AlertCircle`, `ChevronDown` (Lucide)
 * - Utils: `cn` (Tailwind class merging)
 */
"use client";

import React, { useEffect, useRef, useState } from "react";

import { ValidationError } from "@formspree/react";
import { AlertCircle, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface BaseInputProps {
  label: string;
  name: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formErrors?: any;
  clientError?: string;
  placeholder?: string;
}

interface InputFieldProps extends BaseInputProps {
  type?: string;
}

interface TextAreaProps extends BaseInputProps {
  rows?: number;
}

interface SelectInputProps extends BaseInputProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const FormLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="text-clay mb-2 block text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 dark:text-zinc-500">
    {children}{" "}
    {required && <span className="text-brand dark:text-brand-400">*</span>}
  </label>
);

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  formErrors,
  clientError,
}: InputFieldProps) => (
  <div className="group w-full">
    <FormLabel required={required}>{label}</FormLabel>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={cn(
        "border-linen text-foreground placeholder:text-clay/30 hover:border-brand/30 dark:hover:border-brand-400/50 h-10 w-full rounded-none border-b bg-transparent text-sm transition-all duration-300 focus:outline-none dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600",
        clientError || (formErrors && formErrors.length > 0)
          ? "border-brand dark:border-brand-400"
          : "focus:border-brand dark:focus:border-brand-400"
      )}
    />
    {clientError ? (
      <p className="text-brand dark:text-brand-400 animate-in slide-in-from-top-1 mt-1 flex items-center gap-1 text-[10px] font-medium transition-colors duration-300">
        <AlertCircle className="h-3 w-3" /> {clientError}
      </p>
    ) : (
      <ValidationError
        prefix={label}
        field={name}
        errors={formErrors}
        className="text-brand dark:text-brand-400 animate-in slide-in-from-top-1 mt-1 block text-[10px] font-medium transition-colors duration-300"
      />
    )}
  </div>
);

export const TextAreaField = ({
  label,
  name,
  rows = 3,
  placeholder,
  required = false,
  formErrors,
  clientError,
}: TextAreaProps) => (
  <div className="group w-full">
    <FormLabel required={required}>{label}</FormLabel>
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      className={cn(
        "border-linen text-foreground focus:border-brand dark:focus:border-brand-400 placeholder:text-clay/30 hover:border-brand/30 dark:hover:border-brand-400/50 w-full resize-none rounded-none border-b bg-transparent py-2 text-sm transition-all duration-300 focus:outline-none dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600",
        clientError || (formErrors && formErrors.length > 0)
          ? "border-brand dark:border-brand-400"
          : "border-linen dark:border-zinc-800"
      )}
    />
    {clientError ? (
      <p className="text-brand dark:text-brand-400 animate-in slide-in-from-top-1 mt-2 flex items-center gap-1 text-[10px] font-medium transition-colors duration-300">
        <AlertCircle className="h-3 w-3" /> {clientError}
      </p>
    ) : (
      <ValidationError
        prefix={label}
        field={name}
        errors={formErrors}
        className="text-brand dark:text-brand-400 animate-in slide-in-from-top-1 mt-1 block text-[10px] font-medium transition-colors duration-300"
      />
    )}
  </div>
);

export const SelectInput = ({
  label,
  name,
  options = [],
  value,
  onChange,
  clientError,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={cn("group relative", isOpen ? "z-50" : "z-0")} ref={ref}>
      <FormLabel required>{label}</FormLabel>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "border-linen hover:border-brand/50 dark:hover:border-brand-400/50 flex h-10 w-full cursor-pointer items-center justify-between border-b bg-transparent px-0 py-1 text-sm transition-all duration-300 select-none dark:border-zinc-800",
          isOpen || clientError ? "border-brand dark:border-brand-400" : "",
          !value
            ? "text-clay/50 dark:text-zinc-500"
            : "text-foreground font-medium dark:text-zinc-50"
        )}
      >
        <span>{value || "Select an option..."}</span>
        <ChevronDown
          className={cn(
            "text-clay h-4 w-4 transition-transform duration-300 dark:text-zinc-500",
            isOpen && "text-brand dark:text-brand-400 rotate-180"
          )}
        />
      </div>

      <div
        className={cn(
          "border-linen absolute top-full left-0 mt-1 w-full origin-top border bg-white shadow-xl transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none",
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        )}
      >
        <div className="custom-scrollbar max-h-60 overflow-y-auto">
          {options && options.length > 0 ? (
            options.map((opt) => (
              <div
                key={opt}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={cn(
                  "hover:bg-linen/20 cursor-pointer px-3 py-2 text-xs transition-colors duration-300 dark:hover:bg-zinc-800",
                  value === opt
                    ? "text-brand dark:text-brand-400 bg-brand/5 dark:bg-brand-400/10 font-bold"
                    : "text-foreground dark:text-zinc-50"
                )}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="text-clay px-3 py-2 text-xs italic transition-colors duration-300 dark:text-zinc-500">
              No options available
            </div>
          )}
        </div>
      </div>

      {clientError && (
        <p className="text-brand dark:text-brand-400 animate-in slide-in-from-top-1 mt-1 flex items-center gap-1 text-[10px] font-medium transition-colors duration-300">
          <AlertCircle className="h-3 w-3" /> {clientError}
        </p>
      )}

      <input type="hidden" name={name} value={value} />
    </div>
  );
};
