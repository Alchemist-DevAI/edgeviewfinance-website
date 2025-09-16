export const prerender = false;

import { createClient } from '@supabase/supabase-js';
import { EmailService } from '../../lib/email/service.js';

const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const emailService = EmailService;

export async function POST({ request }) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Server configuration error. Please contact support.' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { email, source } = await request.json();
    
    if (!email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email address is required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Check if email already exists
    const { data: existingContact } = await supabase
      .from('contact_form_submissions')
      .select('id, email, newsletter_opt_in')
      .eq('email', email)
      .single();

    if (existingContact) {
      // Update existing contact to opt-in to newsletter
      const { error: updateError } = await supabase
        .from('contact_form_submissions')
        .update({ 
          newsletter_opt_in: true,
          newsletter_opt_in_date: new Date().toISOString(),
          source_page: source || 'blog'
        })
        .eq('id', existingContact.id);

      if (updateError) {
        console.error('Error updating newsletter opt-in:', updateError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Failed to update subscription. Please try again.' 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      // Send welcome email
      try {
        await emailService.sendNewsletterWelcome(email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the subscription if email fails
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Newsletter subscription updated successfully!' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create new contact with newsletter opt-in
    const { error: insertError } = await supabase
      .from('contact_form_submissions')
      .insert({
        first_name: 'Newsletter',
        last_name: 'Subscriber',
        email: email,
        mobile_number: null, // Explicitly set to null for newsletter-only signups
        newsletter_opt_in: true,
        newsletter_opt_in_date: new Date().toISOString(),
        source_page: source || 'blog',
        status: 'newsletter-only',
        submission_date: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error creating newsletter subscription:', insertError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to subscribe. Please try again.' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Send welcome email
    try {
      await emailService.sendNewsletterWelcome(email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}