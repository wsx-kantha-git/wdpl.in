import { serve } from "std/server";
import { Resend } from "resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "contact@webstix.com";
const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET"); // ⬅ Added

const resend = new Resend(RESEND_API_KEY);

const allowedOrigins = [
  "https://wdpl.in",
  "http://localhost:8080",
  "http://localhost:8080/wdpl.in/",
  "http://localhost:5173"
];

serve(async (req) => {
  const origin = req.headers.get("Origin") || "";
  const isAllowedOrigin = allowedOrigins.some((o) => origin.startsWith(o));

  // Preflight OPTIONS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { name, phone, email, message, captcha } = await req.json();
    const submissionDate = new Date().toLocaleDateString("en-US");

    // Check required fields
    if (!name || !email || !message || !captcha) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    //  Step 1: Verify reCAPTCHA with Google

    const captchaVerifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`,
      }
    );

    const captchaData = await captchaVerifyRes.json();

    if (!captchaData.success) {
      return new Response(JSON.stringify({ error: "Invalid captcha" }), {
        status: 400,
      });
    }


    // Step 2: Send ADMIN EMAIL

    await resend.emails.send({
      from: "WDPL Contact Form <contact@Webstix.com>",
      to: [ADMIN_EMAIL],
      subject: `Contact-Us Form - ${submissionDate} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name</strong></p>
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:12px;">${name}</div>

        <p><strong>Email</strong></p>
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:12px;">${email}</div>

        <p><strong>Phone</strong></p>
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:12px;">${phone}</div>

        <p><strong>Message</strong></p>
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:20px; white-space:pre-line;">${message}</div>
      `,
    });


    // Step 3: Send USER EMAIL

    await resend.emails.send({
      from: "WDPL Team <contact@Webstix.com>",
      to: [email],
      subject: "Contact Us - Thank You!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for contacting us! We will get in touch with you shortly.</p>
        <p>Regards,<br/><strong>- Team WDPL</strong></p>
      `,
    });


    //  Step 4: Final response

    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
      },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
});
