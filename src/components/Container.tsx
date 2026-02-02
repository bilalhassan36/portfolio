import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: Props) => {
  return (
    <main
      className={`mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-18 lg:px-8 lg:py-24 ${className}`}
      aria-live="polite"
    >
      {children}
    </main>
  );
};

export default Container;
