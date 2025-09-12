export const prerender = false; // Mark this endpoint as server-side

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { EmailService } from '../../lib/email/service.js';

// Initialize Supabase client using environment variables from Astro
// In Astro, we use import.meta.env for environment variables
const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Always use EmailService - it will handle missing API key gracefully
const emailService = EmailService;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check for required environment variables
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

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const formData = await request.json();
    
    // Process finance types from checkboxes
    const financeTypes = [];
    if (formData.financeTypes) {
      Object.keys(formData.financeTypes).forEach(key => {
        if (formData.financeTypes[key]) {
          financeTypes.push(key);
        }
      });
    }
    
    // If "Other" is selected and text provided, add it
    if (formData.financeTypeOther) {
      financeTypes.push(`Other: ${formData.financeTypeOther}`);
    }
    
    // Prepare data for database
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
      contact_method: formData.contactMethod || 'Phone (during business hours)',
      status: 'new'
    };
    
    // Insert into database
    const { data, error } = await supabase
      .from('contact_form_submissions')
      .insert([submissionData])
      .select()
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to save submission' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Try to send email notifications (but don't fail if email service is unavailable)
    try {
      // Add the submission ID to the data for email templates
      const emailData = { ...submissionData, id: data.id };
      
      // Send both admin notification and client auto-response
      const emailResults = await emailService.sendContactFormEmails(emailData);
      
      if (emailResults.success) {
        // Update database to mark email as sent
        await supabase
          .from('contact_form_submissions')
          .update({ 
            email_sent: true, 
            email_sent_date: new Date().toISOString() 
          })
          .eq('id', data.id);
        
        console.log('Email notifications sent successfully');
      } else if (emailResults.adminNotification?.skipped || emailResults.clientAutoResponse?.skipped) {
        console.log('Email service not configured - emails skipped');
        // Mark in database that email was skipped due to configuration
        await supabase
          .from('contact_form_submissions')
          .update({ 
            email_sent: false, 
            notes: 'Email service not configured at time of submission' 
          })
          .eq('id', data.id);
      } else {
        console.log('Some email notifications may have failed:', emailResults);
      }
    } catch (emailError) {
      console.error('Email notification error (non-critical):', emailError);
      // Continue anyway - form submission is still successful
      await supabase
        .from('contact_form_submissions')
        .update({ 
          email_sent: false, 
          notes: `Email error: ${emailError.message}` 
        })
        .eq('id', data.id);
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId: data.id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server error occurred' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}