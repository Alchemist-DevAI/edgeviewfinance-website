!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="34ce91bf-470e-407c-bed3-3d312225c2f3",e._sentryDebugIdIdentifier="sentry-dbid-34ce91bf-470e-407c-bed3-3d312225c2f3");})();}catch(e){}};import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.to || !body.website || !body.type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, website, type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const resendApiKey = "re_YE8Sdmy3_6eLJu6dCQkj7BGtmHo6BgcqZ";
    if (!resendApiKey) ;
    const resend = new Resend(resendApiKey);
    const emailFrom = "noreply@website.edgeviewfinance.com.au";
    let subject;
    let htmlContent;
    if (body.type === "downtime_alert") {
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
    } else if (body.type === "recovery_alert") {
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
        JSON.stringify({ error: "Invalid alert type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const result = await resend.emails.send({
      from: emailFrom,
      to: body.to,
      subject,
      html: htmlContent
    });
    return new Response(
      JSON.stringify({
        success: true,
        messageId: result.data?.id,
        message: "Uptime alert sent successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error sending uptime alert:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send uptime alert",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
