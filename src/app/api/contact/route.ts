import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
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
        <h2>${subject}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source === "careers" ? "Careers Application" : "Contact Form"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;" colspan="2">Message</td></tr>
          <tr><td style="padding:8px;" colspan="2">${message.replace(/\n/g, "<br>")}</td></tr>
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
