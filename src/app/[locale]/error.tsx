"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h2 className="font-medium text-[clamp(1.5rem,3vw,2rem)] text-[#121212]">
        Something went wrong
      </h2>
      <p className="mt-4 text-sm text-[#121212]/60">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </section>
  );
}
