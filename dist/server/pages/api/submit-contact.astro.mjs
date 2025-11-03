import { createClient } from '@supabase/supabase-js';
import { E as EmailService } from '../../chunks/service_BdBdXSH8.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const supabaseUrl = "https://paduvnvocacqnmlfuvyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE";
const emailService = EmailService;
const getCommonHeaders = () => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
});
async function GET({ request }) {
  return new Response(JSON.stringify({
    success: false,
    error: "Method Not Allowed",
    message: "This endpoint only accepts POST requests for form submissions.",
    allowedMethods: ["POST"]
  }), {
    status: 405,
    headers: {
      ...getCommonHeaders(),
      "Allow": "POST, OPTIONS"
    }
  });
}
async function OPTIONS({ request }) {
  return new Response(null, {
    status: 200,
    headers: getCommonHeaders()
  });
}
async function POST({ request }) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) ;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const formData = await request.json();
    const financeTypes = [];
    if (formData.financeTypes) {
      Object.keys(formData.financeTypes).forEach((key) => {
        if (formData.financeTypes[key]) {
          financeTypes.push(key);
        }
      });
    }
    if (formData.financeTypeOther) {
      financeTypes.push(`Other: ${formData.financeTypeOther}`);
    }
    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      mobile_number: formData.mobileNumber,
      email: formData.email,
      business_type: formData.businessType || null,
      finance_types: financeTypes.length > 0 ? financeTypes : null,
      finance_amount: formData.financeAmount || null,
      timeframe: formData.timeframe || null,
      requirements: formData.requirements || null,
      contact_method: formData.contactMethod || "Phone (during business hours)",
      status: "new"
    };
    const { data, error } = await supabase.from("contact_form_submissions").insert([submissionData]).select().single();
    if (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: "Failed to save submission"
      }), {
        status: 500,
        headers: getCommonHeaders()
      });
    }
    try {
      const emailData = { ...submissionData, id: data.id };
      const emailResults = await emailService.sendContactFormEmails(emailData);
      if (emailResults.success) {
        await supabase.from("contact_form_submissions").update({
          email_sent: true,
          email_sent_date: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", data.id);
        console.log("Email notifications sent successfully");
      } else if (emailResults.adminNotification?.skipped || emailResults.clientAutoResponse?.skipped) {
        console.log("Email service not configured - emails skipped");
        await supabase.from("contact_form_submissions").update({
          email_sent: false,
          notes: "Email service not configured at time of submission"
        }).eq("id", data.id);
      } else {
        console.log("Some email notifications may have failed:", emailResults);
      }
    } catch (emailError) {
      console.error("Email notification error (non-critical):", emailError);
      await supabase.from("contact_form_submissions").update({
        email_sent: false,
        notes: `Email error: ${emailError.message}`
      }).eq("id", data.id);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Form submitted successfully",
      submissionId: data.id
    }), {
      status: 200,
      headers: getCommonHeaders()
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({
      success: false,
      error: "Server error occurred"
    }), {
      status: 500,
      headers: getCommonHeaders()
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
