export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="h-dvh bg-[#E8E0D0]/30" />
      {/* Content skeleton */}
      <div className="mx-auto max-w-[1240px] px-6 py-24">
        <div className="mb-4 h-4 w-32 rounded bg-[#E8E0D0]/50" />
        <div className="mb-8 h-10 w-3/4 rounded bg-[#E8E0D0]/50" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-[#E8E0D0]/30" />
          <div className="h-4 w-5/6 rounded bg-[#E8E0D0]/30" />
          <div className="h-4 w-4/6 rounded bg-[#E8E0D0]/30" />
        </div>
      </div>
    </div>
  );
}
