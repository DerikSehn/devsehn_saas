import { type ClassValue, clsx } from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIsMobile(width: number = 768) {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${width}px)`).matches
  );
}
