"use client";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-1/2 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#0A5592]/10 blur-[120px]" />
      <div className="absolute -bottom-1/2 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-[#1B2E37]/20 blur-[100px]" style={{ animationDelay: "1s", animationDuration: "4s" }} />
      <div className="absolute top-1/4 right-1/3 h-[300px] w-[300px] animate-pulse rounded-full bg-[#0A5592]/5 blur-[80px]" style={{ animationDelay: "2s", animationDuration: "5s" }} />
    </div>
  );
}
