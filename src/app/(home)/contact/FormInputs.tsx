/**
 * @file FormInputs.tsx
 * @description Inputs without '' to prevent z-index/overflow issues.
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
  <label className="text-clay mb-2 block text-[10px] font-bold tracking-widest uppercase">
    {children} {required && <span className="text-brand">*</span>}
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
        "border-linen text-foreground placeholder:text-clay/30 hover:border-brand/30 h-10 w-full rounded-none border-b bg-transparent text-sm transition-all duration-300 focus:outline-none",
        clientError || (formErrors && formErrors.length > 0)
          ? "border-brand"
          : "focus:border-brand"
      )}
    />
    {clientError ? (
      <p className="text-brand animate-in slide-in-from-top-1 mt-1 flex items-center gap-1 text-[10px] font-medium">
        <AlertCircle className="h-3 w-3" /> {clientError}
      </p>
    ) : (
      <ValidationError
        prefix={label}
        field={name}
        errors={formErrors}
        className="text-brand animate-in slide-in-from-top-1 mt-1 block text-[10px] font-medium"
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
        "border-linen text-foreground focus:border-brand placeholder:text-clay/30 hover:border-brand/30 w-full resize-none rounded-none border-b bg-transparent py-2 text-sm transition-all focus:outline-none",
        clientError || (formErrors && formErrors.length > 0)
          ? "border-brand"
          : "border-linen"
      )}
    />
    {clientError ? (
      <p className="text-brand animate-in slide-in-from-top-1 mt-2 flex items-center gap-1 text-[10px] font-medium">
        <AlertCircle className="h-3 w-3" /> {clientError}
      </p>
    ) : (
      <ValidationError
        prefix={label}
        field={name}
        errors={formErrors}
        className="text-brand animate-in slide-in-from-top-1 mt-1 block text-[10px] font-medium"
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
    // Removed '', kept dynamic z-index
    <div className={cn("group relative", isOpen ? "z-50" : "z-0")} ref={ref}>
      <FormLabel required>{label}</FormLabel>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "border-linen hover:border-brand/50 flex h-10 w-full cursor-pointer items-center justify-between border-b bg-transparent px-0 py-1 text-sm transition-all select-none",
          isOpen || clientError ? "border-brand" : "",
          !value ? "text-clay/50" : "text-foreground font-medium"
        )}
      >
        <span>{value || "Select an option..."}</span>
        <ChevronDown
          className={cn(
            "text-clay h-4 w-4 transition-transform duration-300",
            isOpen && "text-brand rotate-180"
          )}
        />
      </div>

      <div
        className={cn(
          "border-linen absolute top-full left-0 mt-1 w-full origin-top border bg-white shadow-xl transition-all duration-200",
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
                  "hover:bg-linen/20 cursor-pointer px-3 py-2 text-xs transition-colors",
                  value === opt
                    ? "text-brand bg-brand/5 font-bold"
                    : "text-foreground"
                )}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="text-clay px-3 py-2 text-xs italic">
              No options available
            </div>
          )}
        </div>
      </div>
      {clientError && (
        <p className="text-brand animate-in slide-in-from-top-1 mt-1 flex items-center gap-1 text-[10px] font-medium">
          <AlertCircle className="h-3 w-3" /> {clientError}
        </p>
      )}
      <input type="hidden" name={name} value={value} />
    </div>
  );
};
