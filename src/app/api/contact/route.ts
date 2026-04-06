import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (entry && now < entry.resetTime) {
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    entry.count++;
  } else {
    if (entry) rateLimitMap.delete(ip);
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env["RESEND_API_KEY"]);

    const formData = await request.formData();

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "Not provided";
    const message = formData.get("message") as string;
    const attachment = formData.get("attachment") as File | null;
    const source = (formData.get("source") as string) || "contact";

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const subject =
      source === "careers"
        ? `New Application: ${firstName} ${lastName}`
        : `New Inquiry: ${firstName} ${lastName}`;

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);
    const safeSubject = escapeHtml(subject);

    const attachments: { filename: string; content: Buffer }[] = [];
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({ filename: attachment.name, content: buffer });
    }

    await resend.emails.send({
      from: "Metanova Website <onboarding@resend.dev>",
      to: ["info@metanova.ca"],
      replyTo: email,
      subject,
      html: `
        <h2>${safeSubject}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeFirstName} ${safeLastName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${safePhone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source === "careers" ? "Careers Application" : "Contact Form"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;" colspan="2">Message</td></tr>
          <tr><td style="padding:8px;" colspan="2">${safeMessage.replace(/\n/g, "<br>")}</td></tr>
        </table>
        ${attachments.length > 0 ? `<p style="margin-top:16px;color:#666;">📎 Attachment: ${attachments[0]?.filename ?? "file"}</p>` : ""}
        <hr style="margin-top:24px;border:none;border-top:1px solid #eee;">
        <p style="color:#999;font-size:12px;">Sent from metanova.ca ${source} form</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
