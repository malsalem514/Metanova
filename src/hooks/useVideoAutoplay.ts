import { useEffect, useRef } from "react";

/**
 * Handles video autoplay with Safari/iOS fallback.
 * Attempts play immediately, then again on first user interaction
 * if autoplay was blocked (e.g. Low Power Mode).
 */
export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    attemptPlay();

    const handleInteraction = () => {
      attemptPlay();
    };
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  return videoRef;
}
