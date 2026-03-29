/**
 * JSON-LD structured data component for SEO.
 * Content is always developer-controlled (hardcoded schemas), never user-supplied.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
