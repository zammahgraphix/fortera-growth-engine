import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  company?: string;
  businessType: string;
  goals?: string;
  budgetRange?: string;
  timeline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactNotificationRequest = await req.json();
    console.log("Received contact notification request:", data);

    // Send notification email to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fortera Digital <onboarding@resend.dev>",
        to: ["webadmin@forteraglobalgroup.com"],
        subject: `New Contact Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p>You have received a new inquiry from the Fortera Digital website.</p>
          
          <h3>Contact Details</h3>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.company ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Company:</td>
              <td style="padding: 8px;">${data.company}</td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Business Type:</td>
              <td style="padding: 8px;">${data.businessType}</td>
            </tr>
            ${data.budgetRange ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Budget Range:</td>
              <td style="padding: 8px;">${data.budgetRange}</td>
            </tr>
            ` : ''}
            ${data.timeline ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; font-weight: bold;">Timeline:</td>
              <td style="padding: 8px;">${data.timeline}</td>
            </tr>
            ` : ''}
          </table>
          
          ${data.goals ? `
          <h3>Goals & Requirements</h3>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${data.goals}</p>
          ` : ''}
          
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 12px;">This notification was sent automatically from the Fortera Digital website contact form.</p>
        `,
      }),
    });

    const adminEmailResponse = await adminEmailRes.json();
    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation email to the user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fortera Digital <onboarding@resend.dev>",
        to: [data.email],
        subject: "We've received your inquiry - Fortera Digital",
        html: `
          <h2>Thank you for reaching out, ${data.name}!</h2>
          <p>We've received your inquiry and our team will review it shortly.</p>
          <p>You can expect to hear back from us within 24-48 business hours.</p>
          
          <h3>What happens next?</h3>
          <ol>
            <li>Our team reviews your submission</li>
            <li>We'll reach out to schedule a discovery call</li>
            <li>We'll discuss your goals and create a tailored strategy</li>
          </ol>
          
          <p>In the meantime, feel free to explore our <a href="https://forteraglobalgroups.lovable.app/digital/portfolio">portfolio</a> to see our recent work.</p>
          
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 12px;">
            Fortera Digital - Building Your Digital Future<br/>
            This is an automated response. Please do not reply directly to this email.
          </p>
        `,
      }),
    });

    const userEmailResponse = await userEmailRes.json();
    console.log("User confirmation sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        userEmail: userEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
