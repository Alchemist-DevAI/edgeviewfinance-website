import type { APIRoute } from 'astro';

export const prerender = false; // This is a server-side route

export const POST: APIRoute = async ({ request }) => {
  console.log('=== CONTACT FORM API ENDPOINT CALLED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  // Initialize Supabase client
  let supabase: any = null;
  let resend: any = null;
  
  try {
    // Dynamic import for Supabase with hardcoded credentials
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = 'https://paduvnvocacqnmlfuvyn.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE';
    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✓ Supabase client initialized successfully');
  } catch (error) {
    console.error('✗ Failed to initialize Supabase:', error);
    return new Response(JSON.stringify({ 
      error: 'Database configuration error',
      details: 'Failed to initialize database connection'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Initialize Resend for email notifications
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    console.log('Resend initialization attempt:');
    console.log('- API key exists:', !!resendApiKey);
    
    if (resendApiKey && resendApiKey.startsWith('re_') && resendApiKey.length > 10) {
      const { Resend } = await import('resend');
      resend = new Resend(resendApiKey);
      console.log('✓ Resend API initialized successfully');
    } else {
      console.log('✗ Resend API key not found or invalid format, email sending disabled');
    }
  } catch (error) {
    console.error('✗ Failed to initialize Resend:', error);
    // Continue without email sending - this is not critical for the contact form submission
  }

  try {
    // Set CORS headers
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers });
    }
    
    // Check if request has a body and correct content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log('Invalid content type:', contentType);
      return new Response(JSON.stringify({ 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers
      });
    }
    
    const formData = await request.json();
    
    // Log received data for debugging
    console.log('Received contact form data:', {
      hasEmail: !!formData.email,
      hasFirstName: !!formData.firstName,
      hasLastName: !!formData.lastName,
      hasMobileNumber: !!formData.mobileNumber
    });

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      console.log('Missing required fields validation failed');
      return new Response(JSON.stringify({ 
        error: 'Missing required fields',
        details: 'email, firstName, and lastName are required'
      }), {
        status: 400,
        headers
      });
    }
    
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
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      console.error('Data being inserted:', JSON.stringify(submissionData, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Failed to save contact form data',
        details: error.message,
        hint: error.hint || null,
        code: error.code || null
      }), {
        status: 500,
        headers
      });
    }
    
    console.log('Contact form saved successfully:', data?.id);
    
    // Send emails if Resend is configured
    let emailStatus = {
      attempted: false,
      resendConfigured: !!resend,
      internalEmailSent: false,
      userEmailSent: false,
      errors: []
    };

    if (resend && data) {
      emailStatus.attempted = true;
      console.log('=== EMAIL SENDING SECTION ===');
      
      try {
        const emailFrom = process.env.EMAIL_FROM || 'noreply@website.edgeviewfinance.com.au';
        const emailTo = process.env.EMAIL_TO || 'dan@edgeviewfinance.com.au';
        
        console.log('Email configuration:');
        console.log('- From:', emailFrom);
        console.log('- To (internal):', emailTo);
        console.log('- To (user):', formData.email);
        console.log('- Contact Form ID:', data.id);
        
        console.log('Attempting to send internal notification email...');
        // Send internal notification email
        const internalEmailResult = await resend.emails.send({
          from: emailFrom,
          to: emailTo,
          subject: `New Contact Form: ${formData.firstName} ${formData.lastName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Mobile:</strong> ${formData.mobileNumber || 'Not provided'}</p>
            <p><strong>Business Type:</strong> ${formData.businessType || 'Not provided'}</p>
            <p><strong>Finance Types:</strong> ${financeTypes.length > 0 ? financeTypes.join(', ') : 'Not specified'}</p>
            <p><strong>Finance Amount:</strong> ${formData.financeAmount || 'Not specified'}</p>
            <p><strong>Timeframe:</strong> ${formData.timeframe || 'Not specified'}</p>
            <p><strong>Requirements:</strong> ${formData.requirements || 'None provided'}</p>
            <p><strong>Preferred Contact Method:</strong> ${formData.contactMethod || 'Phone (during business hours)'}</p>
          `
        });
        
        if (internalEmailResult.error) {
          console.error('Internal email failed:', internalEmailResult.error);
          emailStatus.errors.push(`Internal email error: ${internalEmailResult.error}`);
        } else {
          console.log('✓ Internal email sent successfully. Message ID:', internalEmailResult.data?.id);
          emailStatus.internalEmailSent = true;
        }

        console.log('Attempting to send user thank you email...');
        // Send thank you email to user
        const userEmailResult = await resend.emails.send({
          from: emailFrom,
          to: formData.email,
          subject: 'Thank you for your enquiry - Edgeview Finance',
          html: `
            <h2>Thank You ${formData.firstName}!</h2>
            <p>We've received your enquiry and one of our finance specialists will be in touch within 24 hours.</p>
            <p>If you have any urgent questions, please don't hesitate to call us on 1300 280 895.</p>
            <br>
            <p>Best regards,<br>The Edgeview Finance Team</p>
          `
        });

        if (userEmailResult.error) {
          console.error('User email failed:', userEmailResult.error);
          emailStatus.errors.push(`User email error: ${userEmailResult.error}`);
        } else {
          console.log('✓ User email sent successfully. Message ID:', userEmailResult.data?.id);
          emailStatus.userEmailSent = true;
        }
        
        // Update the database to mark email status
        const emailSent = emailStatus.internalEmailSent || emailStatus.userEmailSent;
        const updateResult = await supabase
          .from('contact_form_submissions')
          .update({ 
            email_sent: emailSent,
            email_sent_date: emailSent ? new Date().toISOString() : null,
            notes: emailStatus.errors.length > 0 ? emailStatus.errors.join('; ') : null
          })
          .eq('id', data.id);
          
        if (updateResult.error) {
          console.error('Failed to update email status in database:', updateResult.error);
        } else {
          console.log('✓ Database updated with email status');
        }
        
        console.log('=== EMAIL SENDING COMPLETE ===');
        console.log('Email Status Summary:', emailStatus);
        
      } catch (emailError) {
        console.error('=== EMAIL SENDING FAILED ===');
        console.error('Email error details:', emailError);
        emailStatus.errors.push(`Critical email error: ${emailError.message}`);
        
        // Try to update the database with the error
        try {
          await supabase
            .from('contact_form_submissions')
            .update({ 
              email_sent: false,
              notes: `Email error: ${emailError.message}`
            })
            .eq('id', data.id);
        } catch (dbError) {
          console.error('Failed to update error status in database:', dbError);
        }
      }
    } else {
      console.log('=== EMAIL SENDING SKIPPED ===');
      console.log('Reasons:');
      console.log('- Resend configured:', !!resend);
      console.log('- Contact form saved:', !!data);
      console.log('- Contact form ID:', data?.id || 'N/A');
      
      if (data) {
        // Update database to indicate emails were not sent
        try {
          await supabase
            .from('contact_form_submissions')
            .update({ 
              email_sent: false,
              notes: 'Email service not configured at time of submission'
            })
            .eq('id', data.id);
        } catch (dbError) {
          console.error('Failed to update skip status in database:', dbError);
        }
      }
    }

    // Return success response
    console.log('Contact form processed successfully');
    console.log('=== FINAL STATUS ===');
    console.log('- Contact form saved:', !!data);
    console.log('- Email attempted:', emailStatus.attempted);
    console.log('- Internal email sent:', emailStatus.internalEmailSent);
    console.log('- User email sent:', emailStatus.userEmailSent);
    console.log('- Email errors:', emailStatus.errors.length);
    
    return new Response(JSON.stringify({ 
      success: true,
      submissionId: data?.id,
      message: 'Contact form submitted successfully',
      emailStatus: {
        attempted: emailStatus.attempted,
        resendConfigured: emailStatus.resendConfigured,
        internalEmailSent: emailStatus.internalEmailSent,
        userEmailSent: emailStatus.userEmailSent,
        hasErrors: emailStatus.errors.length > 0,
        errorCount: emailStatus.errors.length
      }
    }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('API error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    
    // Fallback headers in case the main headers weren't defined
    const fallbackHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    
    return new Response(JSON.stringify({ 
      error: 'Server error occurred',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: fallbackHeaders
    });
  }
};