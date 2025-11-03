export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  console.log("Assessment API endpoint called");
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase configuration");
      return new Response(JSON.stringify({
        error: "Server configuration error",
        details: "Database connection not configured"
      }), {
        status: 500,
        headers
      });
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized");
    let resend = null;
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const { Resend } = await import('resend');
        resend = new Resend(resendApiKey);
        console.log("Resend API configured");
      } else {
        console.log("Resend API key not found, email sending disabled");
      }
    } catch (error2) {
      console.error("Failed to initialize Resend:", error2);
    }
    const data = await request.json();
    console.log("Received data:", {
      hasEmail: !!data.email,
      hasFirstName: !!data.firstName,
      hasLastName: !!data.lastName,
      hasTotalScore: data.totalScore !== void 0,
      totalScore: data.totalScore
    });
    if (!data.email || !data.firstName || !data.lastName || data.totalScore === void 0) {
      console.log("Missing required fields validation failed");
      return new Response(JSON.stringify({
        error: "Missing required fields",
        details: "email, firstName, lastName, and totalScore are required"
      }), {
        status: 400,
        headers
      });
    }
    const assessmentData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      business_name: data.businessName || null,
      // Store individual question answers
      q1_financial_records: data.answers?.q1 || null,
      q2_business_turnover: data.answers?.q2 || null,
      q3_financial_position: data.answers?.q3 || null,
      q4_documents_ready: Array.isArray(data.answers?.q4) ? data.answers.q4 : data.answers?.q4 ? [data.answers.q4] : null,
      q5_finance_experience: data.answers?.q5 || null,
      // Scoring
      total_score: data.totalScore,
      readiness_level: data.readinessLevel,
      // Tracking
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      referrer_url: data.referrerUrl || null
    };
    const { data: insertedData, error } = await supabase.from("assessment_responses").insert([assessmentData]).select().single();
    if (error) {
      console.error("Supabase error:", JSON.stringify(error, null, 2));
      return new Response(JSON.stringify({
        error: "Failed to save assessment data",
        details: error.message
      }), {
        status: 500,
        headers
      });
    }
    console.log("Assessment saved successfully:", insertedData?.id);
    if (resend && insertedData) {
      try {
        const emailFrom = process.env.EMAIL_FROM || "noreply@edgeviewfinance.com.au";
        const emailTo = process.env.EMAIL_TO || "dan@edgeviewfinance.com.au";
        await resend.emails.send({
          from: emailFrom,
          to: emailTo,
          subject: `New Finance Assessment: ${data.firstName} ${data.lastName} - Score: ${data.totalScore}/50`,
          html: `
            <h2>New Finance Ready Assessment Completed</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
            <p><strong>Business:</strong> ${data.businessName || "Not provided"}</p>
            <p><strong>Score:</strong> ${data.totalScore}/50</p>
            <p><strong>Readiness Level:</strong> ${data.readinessLevel}</p>
            <hr>
            <h3>Answers:</h3>
            <ul>
              <li><strong>Financial Records:</strong> ${data.answers?.q1 || "N/A"}</li>
              <li><strong>Business Turnover:</strong> ${data.answers?.q2 || "N/A"}</li>
              <li><strong>Financial Position:</strong> ${data.answers?.q3 || "N/A"}</li>
              <li><strong>Documents Ready:</strong> ${Array.isArray(data.answers?.q4) ? data.answers.q4.join(", ") : data.answers?.q4 || "N/A"}</li>
              <li><strong>Finance Experience:</strong> ${data.answers?.q5 || "N/A"}</li>
            </ul>
          `
        });
        await resend.emails.send({
          from: emailFrom,
          to: data.email,
          subject: "Your Finance Ready Assessment Results - Edgeview Finance",
          html: `
            <h2>Thank You ${data.firstName}!</h2>
            <p>We've received your Finance Ready Assessment.</p>
            <p><strong>Your Score:</strong> ${data.totalScore}/50</p>
            <p><strong>Readiness Level:</strong> ${data.readinessLevel}</p>
            <p>One of our finance specialists will review your assessment and contact you within 24 hours.</p>
            <p>Best regards,<br>The Edgeview Finance Team</p>
          `
        });
        await supabase.from("assessment_responses").update({ email_sent: true }).eq("id", insertedData.id);
        console.log("Emails sent successfully");
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
      }
    }
    return new Response(JSON.stringify({
      success: true,
      assessmentId: insertedData?.id,
      message: "Assessment saved successfully"
    }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({
      error: "Server error occurred",
      message: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers
    });
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
