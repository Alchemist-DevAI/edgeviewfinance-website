!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="32ecc9a4-89ca-415d-9f15-ec8f5c6efed8",e._sentryDebugIdIdentifier="sentry-dbid-32ecc9a4-89ca-415d-9f15-ec8f5c6efed8");})();}catch(e){}};import { createClient } from '@supabase/supabase-js';
import { E as EmailService } from '../../chunks/service_CuoVs5Yj.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const supabaseUrl = "https://paduvnvocacqnmlfuvyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE";
const emailService = EmailService;
async function POST({ request }) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) ;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { email, source } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({
        success: false,
        error: "Email address is required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const { data: existingContact } = await supabase.from("contact_form_submissions").select("id, email, newsletter_opt_in").eq("email", email).single();
    if (existingContact) {
      const { error: updateError } = await supabase.from("contact_form_submissions").update({
        newsletter_opt_in: true,
        newsletter_opt_in_date: (/* @__PURE__ */ new Date()).toISOString(),
        source_page: source || "blog"
      }).eq("id", existingContact.id);
      if (updateError) {
        console.error("Error updating newsletter opt-in:", updateError);
        return new Response(JSON.stringify({
          success: false,
          error: "Failed to update subscription. Please try again."
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      try {
        await emailService.sendNewsletterWelcome(email);
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }
      return new Response(JSON.stringify({
        success: true,
        message: "Newsletter subscription updated successfully!"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const { error: insertError } = await supabase.from("contact_form_submissions").insert({
      first_name: "Newsletter",
      last_name: "Subscriber",
      email,
      mobile_number: null,
      // Explicitly set to null for newsletter-only signups
      newsletter_opt_in: true,
      newsletter_opt_in_date: (/* @__PURE__ */ new Date()).toISOString(),
      source_page: source || "blog",
      status: "newsletter-only",
      submission_date: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (insertError) {
      console.error("Error creating newsletter subscription:", insertError);
      return new Response(JSON.stringify({
        success: false,
        error: "Failed to subscribe. Please try again."
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    try {
      await emailService.sendNewsletterWelcome(email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed to newsletter!"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "An unexpected error occurred. Please try again."
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
