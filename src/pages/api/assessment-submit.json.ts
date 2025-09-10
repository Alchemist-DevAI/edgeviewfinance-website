import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Create Supabase client directly in the API route
const supabaseUrl = 'https://paduvnvocacqnmlfuvyn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Resend - will use environment variable from Vercel
const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const prerender = false; // This is a server-side route

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if request has a body
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName || !data.totalScore) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Prepare the assessment data for database
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
      q4_documents_ready: Array.isArray(data.answers?.q4) ? data.answers.q4 : (data.answers?.q4 ? [data.answers.q4] : null),  // Store as ARRAY
      q5_finance_experience: data.answers?.q5 || null,
      
      // Scoring
      total_score: data.totalScore,
      readiness_level: data.readinessLevel,
      
      // Tracking (simplified - removing fields that might cause RLS issues)
      utm_source: data.utmSource || null,
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      referrer_url: data.referrerUrl || null,
    };

    // Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from('assessment_responses')
      .insert([assessmentData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      console.error('Data being inserted:', JSON.stringify(assessmentData, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Failed to save assessment data',
        details: error.message,
        hint: error.hint || null,
        code: error.code || null
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Send notification emails
    let emailSent = false;
    
    if (resend) {
      try {
        // Send internal notification email
        const internalEmail = await resend.emails.send({
        from: process.env.EMAIL_FROM || import.meta.env.EMAIL_FROM || 'Edgeview Finance <noreply@edgeviewfinance.com.au>',
        to: process.env.EMAIL_TO || import.meta.env.EMAIL_TO || 'dan@edgeviewfinance.com.au',
        subject: `New Finance Ready Assessment - ${data.firstName} ${data.lastName}`,
        html: `
          <h2>New Finance Ready Assessment Submission</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Business:</strong> ${data.businessName || 'Not provided'}</p>
          <p><strong>Score:</strong> ${data.totalScore}/50</p>
          <p><strong>Level:</strong> ${data.readinessLevel}</p>
          <hr>
          <h3>Assessment Answers:</h3>
          <ul>
            <li><strong>Financial Records:</strong> ${data.answers?.q1 || 'N/A'}</li>
            <li><strong>Business Turnover:</strong> ${data.answers?.q2 || 'N/A'}</li>
            <li><strong>Financial Position:</strong> ${data.answers?.q3 || 'N/A'}</li>
            <li><strong>Documents Ready:</strong> ${Array.isArray(data.answers?.q4) ? data.answers.q4.join(', ') : (data.answers?.q4 || 'N/A')}</li>
            <li><strong>Finance Experience:</strong> ${data.answers?.q5 || 'N/A'}</li>
          </ul>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}</p>
        `
      });

      // Send thank you email to user
      const userEmail = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Edgeview Finance <noreply@edgeviewfinance.com.au>',
        to: data.email,
        subject: 'Your Finance Ready Assessment Report - Edgeview Finance',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Thank You ${data.firstName}!</h2>
            <p>Your Finance Ready Assessment has been completed successfully.</p>
            
            <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-left: 4px solid #f97316;">
              <h3 style="margin-top: 0;">Your Results:</h3>
              <p><strong>Score:</strong> ${data.totalScore}/50</p>
              <p><strong>Readiness Level:</strong> ${data.readinessLevel}</p>
            </div>
            
            <h3>What's Next?</h3>
            <ol>
              <li style="margin-bottom: 10px;"><strong>Check Your Email:</strong> Your detailed Finance Ready Report and $1,035 resource package will arrive shortly in a separate email.</li>
              <li style="margin-bottom: 10px;"><strong>Review Your Action Plan:</strong> Your personalised report includes specific recommendations based on your readiness level.</li>
              <li style="margin-bottom: 10px;"><strong>7-Day Email Course:</strong> Starting tomorrow, you'll receive daily insights to accelerate your finance readiness.</li>
              <li style="margin-bottom: 10px;"><strong>Book Your Strategy Call:</strong> Ready to fast-track your application? Schedule a complimentary 15-minute strategy call with our finance specialists.</li>
            </ol>
            
            <p style="margin-top: 30px;">
              <a href="https://calendly.com/dan-peters-edgeviewfinance/finance-discovery-call" 
                 style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; display: inline-block;">
                Book Your Strategy Call
              </a>
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Need immediate assistance?</strong><br>
              Call us on 1300 290 993<br>
              Email: dan@edgeviewfinance.com.au
            </p>
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              © ${new Date().getFullYear()} Edgeview Finance | Commercial Finance Specialists<br>
              ABN: 96 150 172 036 | Credit Representative 521422
            </p>
          </div>
        `
      });

      emailSent = true;
      console.log('Emails sent successfully:', { internal: internalEmail.id, user: userEmail.id });

      // Update database to mark email as sent
      await supabase
        .from('assessment_responses')
        .update({ email_sent: true })
        .eq('id', insertedData?.id);

      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the whole request if email fails - data is already saved
        // Just log the error and continue
      }
    } else {
      console.log('Resend API not configured - skipping email notifications');
    }

    // Update analytics (increment daily counter) - simplified for now
    // We'll handle analytics separately if needed
    console.log('Assessment saved successfully:', insertedData?.id, 'Email sent:', emailSent);

    // Return success response
    return new Response(JSON.stringify({ 
      success: true,
      assessmentId: insertedData?.id,
      message: 'Assessment saved successfully',
      emailSent
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Server error occurred',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};