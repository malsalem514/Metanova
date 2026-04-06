import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#0A5592]">
        404
      </p>
      <h1 className="mt-4 font-medium text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#121212]">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[#121212]/60">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity hover:opacity-80"
        >
          GO HOME
        </Link>
        <Link
          href="/contact"
          className="border border-[#E8E0D0] px-5 py-2.5 text-xs font-normal text-[#121212] transition-colors hover:border-[#0A5592] hover:text-[#0A5592]"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
}
