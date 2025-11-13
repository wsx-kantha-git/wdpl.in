import { serve } from "std/server";
import { Resend } from "resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "esakkiraj@webstix.com"; // <-- use your own email to receive test

const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // 1️⃣ Email to Admin
    await resend.emails.send({
      from: "WDPL Contact Form <onboarding@resend.dev>", // ✅ working test sender
      to: [ADMIN_EMAIL],
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Website Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 2️⃣ Confirmation Email to User
    await resend.emails.send({
      from: "WDPL Team <onboarding@resend.dev>", // ✅ same sandbox sender
      to: [email],
      subject: "✅ Thanks for contacting WDPL!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out! We’ve received your message and our team will get back to you soon.</p>
        <p><em>- WDPL Team</em></p>
      `,
    });

    return new Response(
      JSON.stringify({ status: "Emails sent successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send emails" }),
      { status: 500 }
    );
  }
});
