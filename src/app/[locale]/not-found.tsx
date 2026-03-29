import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[clamp(4rem,10vw,8rem)] font-medium leading-none text-[#121212]/10">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-medium text-[#121212]">
        Page not found
      </h2>
      <p className="mt-3 max-w-md text-sm text-[#121212]/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <p className="mt-1 max-w-md text-sm text-[#121212]/60">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80"
      >
        ← Back to home / Retour à l&apos;accueil
      </Link>
    </div>
  );
}
