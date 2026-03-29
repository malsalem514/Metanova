import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MetaNova for structural engineering, project management, or development consulting inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactForm />
    </div>
  );
}
