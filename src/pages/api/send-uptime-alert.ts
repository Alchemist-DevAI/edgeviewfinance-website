import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.to || !body.website || !body.type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, website, type' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if Resend is configured
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured - uptime alert not sent');
      return new Response(
        JSON.stringify({ message: 'Email service not configured' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const resend = new Resend(resendApiKey);
    const emailFrom = import.meta.env.EMAIL_FROM || 'noreply@edgeviewfinance.com.au';

    let subject: string;
    let htmlContent: string;

    if (body.type === 'downtime_alert') {
      subject = `🚨 Website Down Alert: ${body.website}`;
      htmlContent = `
        <h2 style="color: #dc2626;">🚨 Website Downtime Alert</h2>
        <p><strong>Website:</strong> ${body.website}</p>
        <p><strong>Status Code:</strong> ${body.status}</p>
        <p><strong>Response Time:</strong> ${body.responseTime}ms</p>
        <p><strong>Time:</strong> ${new Date(body.timestamp).toLocaleString()}</p>
        <p><strong>Consecutive Failures:</strong> ${body.consecutiveFailures}</p>
        <p><strong>Message:</strong> ${body.message}</p>

        <div style="margin-top: 20px; padding: 15px; background-color: #fef2f2; border-left: 4px solid #dc2626;">
          <p style="margin: 0; color: #991b1b;">
            Your website is currently experiencing downtime. Please investigate immediately.
          </p>
        </div>
      `;
    } else if (body.type === 'recovery_alert') {
      subject = `✅ Website Recovered: ${body.website}`;
      htmlContent = `
        <h2 style="color: #059669;">✅ Website Recovery Alert</h2>
        <p><strong>Website:</strong> ${body.website}</p>
        <p><strong>Time:</strong> ${new Date(body.timestamp).toLocaleString()}</p>
        <p><strong>Downtime Duration:</strong> ${body.downtime_duration}</p>
        <p><strong>Message:</strong> ${body.message}</p>

        <div style="margin-top: 20px; padding: 15px; background-color: #f0fdf4; border-left: 4px solid #059669;">
          <p style="margin: 0; color: #047857;">
            Your website has recovered and is now online.
          </p>
        </div>
      `;
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid alert type' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await resend.emails.send({
      from: emailFrom,
      to: body.to,
      subject: subject,
      html: htmlContent
    });

    return new Response(
      JSON.stringify({
        success: true,
        messageId: result.data?.id,
        message: 'Uptime alert sent successfully'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error sending uptime alert:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to send uptime alert',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};