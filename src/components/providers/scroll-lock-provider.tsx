"use client";

import { useEffect } from "react";

import { usePreloaderStore } from "@/store/use-preloader-store";

export const ScrollLockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isFinished = usePreloaderStore((state) => state.isFinished);

  useEffect(() => {
    if (!isFinished) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
    }
  }, [isFinished]);

  return <>{children}</>;
};
