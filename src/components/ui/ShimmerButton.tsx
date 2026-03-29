"use client";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-none bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}
