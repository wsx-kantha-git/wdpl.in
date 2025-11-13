// supabase/functions/send-confirmation-email/index.ts
import { serve } from "std/server";
import { Resend } from "resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "esakkiraj@webstix.com";

const resend = new Resend(RESEND_API_KEY);

// Allowed origins
const allowedOrigins = ["https://wdpl.in", "http://localhost:8080", "https://wsx-kantha-git.github.io/wdpl.in/" ];

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    //  Send email to Admin
    await resend.emails.send({
      from: "WDPL Contact Form <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Website Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    //  Send confirmation email to user
    await resend.emails.send({
      from: "WDPL Team <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for contacting WDPL!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out! We’ve received your message and our team will get back to you soon.</p>
        <p><em>- WDPL Team</em></p>
      `,
    });

    return new Response(JSON.stringify({ status: "Emails sent successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
      },
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({ error: "Failed to send emails" }), { status: 500 });
  }
});
