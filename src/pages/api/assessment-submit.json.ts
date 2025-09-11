import type { APIRoute } from 'astro';

export const prerender = false; // This is a server-side route

export const POST: APIRoute = async ({ request }) => {
  console.log('=== ASSESSMENT API ENDPOINT CALLED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- VERCEL:', process.env.VERCEL ? 'true' : 'false');
  console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('- RESEND_API_KEY prefix:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'undefined');
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM || 'not set');
  console.log('- EMAIL_TO:', process.env.EMAIL_TO || 'not set');
  
  // Initialize Supabase client
  let supabase: any = null;
  let resend: any = null;
  
  try {
    // Dynamic import for Supabase
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

  // Initialize Resend with enhanced debugging
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    console.log('Resend initialization attempt:');
    console.log('- API key exists:', !!resendApiKey);
    console.log('- API key is valid format:', resendApiKey ? resendApiKey.startsWith('re_') : false);
    console.log('- API key length:', resendApiKey ? resendApiKey.length : 0);
    
    if (resendApiKey && resendApiKey.startsWith('re_') && resendApiKey.length > 10) {
      const { Resend } = await import('resend');
      resend = new Resend(resendApiKey);
      console.log('✓ Resend API initialized successfully');
      
      // Test Resend connection
      try {
        console.log('Testing Resend API connection...');
        // We can't test without sending, but we can check if the instance was created
        console.log('✓ Resend instance created successfully');
      } catch (testError) {
        console.error('✗ Resend connection test failed:', testError);
      }
    } else {
      console.log('✗ Resend API key not found or invalid format, email sending disabled');
      console.log('Expected format: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    }
  } catch (error) {
    console.error('✗ Failed to initialize Resend:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    // Continue without email sending - this is not critical for the assessment submission
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

    // Check if request has a body
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
    
    const data = await request.json();
    
    // Log received data for debugging
    console.log('Received data:', {
      hasEmail: !!data.email,
      hasFirstName: !!data.firstName,
      hasLastName: !!data.lastName,
      hasTotalScore: data.totalScore !== undefined,
      totalScore: data.totalScore
    });

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName || data.totalScore === undefined) {
      console.log('Missing required fields validation failed');
      return new Response(JSON.stringify({ 
        error: 'Missing required fields',
        details: 'email, firstName, lastName, and totalScore are required'
      }), {
        status: 400,
        headers
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
        headers
      });
    }

    // Update analytics (increment daily counter) - simplified for now
    // We'll handle analytics separately if needed
    console.log('Assessment saved successfully:', insertedData?.id);

    // Send emails if Resend is configured
    let emailStatus = {
      attempted: false,
      resendConfigured: !!resend,
      internalEmailSent: false,
      userEmailSent: false,
      errors: []
    };

    if (resend && insertedData) {
      emailStatus.attempted = true;
      console.log('=== EMAIL SENDING SECTION ===');
      
      try {
        const emailFrom = process.env.EMAIL_FROM || 'noreply@edgeviewfinance.com.au';
        const emailTo = process.env.EMAIL_TO || 'dan@edgeviewfinance.com.au';
        
        console.log('Email configuration:');
        console.log('- From:', emailFrom);
        console.log('- To (internal):', emailTo);
        console.log('- To (user):', data.email);
        console.log('- Assessment ID:', insertedData.id);
        
        console.log('Attempting to send internal notification email...');
        // Send internal notification email
        const internalEmailResult = await resend.emails.send({
          from: emailFrom,
          to: emailTo,
          subject: `New Finance Assessment: ${data.firstName} ${data.lastName} - Score: ${data.totalScore}/50`,
          html: `
            <h2>New Finance Ready Assessment Completed</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Business:</strong> ${data.businessName || 'Not provided'}</p>
            <p><strong>Score:</strong> ${data.totalScore}/50</p>
            <p><strong>Readiness Level:</strong> ${data.readinessLevel}</p>
            <hr>
            <h3>Answers:</h3>
            <ul>
              <li><strong>Financial Records:</strong> ${data.answers?.q1 || 'N/A'}</li>
              <li><strong>Business Turnover:</strong> ${data.answers?.q2 || 'N/A'}</li>
              <li><strong>Financial Position:</strong> ${data.answers?.q3 || 'N/A'}</li>
              <li><strong>Documents Ready:</strong> ${Array.isArray(data.answers?.q4) ? data.answers.q4.join(', ') : (data.answers?.q4 || 'N/A')}</li>
              <li><strong>Finance Experience:</strong> ${data.answers?.q5 || 'N/A'}</li>
            </ul>
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
          to: data.email,
          subject: 'Your Finance Ready Assessment Results - Edgeview Finance',
          html: `
            <h2>Thank You ${data.firstName}!</h2>
            <p>We've received your Finance Ready Assessment.</p>
            <p><strong>Your Score:</strong> ${data.totalScore}/50</p>
            <p><strong>Readiness Level:</strong> ${data.readinessLevel}</p>
            <p>One of our finance specialists will review your assessment and contact you within 24 hours to discuss your results and next steps.</p>
            <p>If you have any urgent questions, please don't hesitate to call us on 1300 336 365.</p>
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
          .from('assessment_responses')
          .update({ 
            email_sent: emailSent,
            email_details: JSON.stringify(emailStatus)
          })
          .eq('id', insertedData.id);
          
        if (updateResult.error) {
          console.error('Failed to update email status in database:', updateResult.error);
        } else {
          console.log('✓ Database updated with email status');
        }
        
        console.log('=== EMAIL SENDING COMPLETE ===');
        console.log('Email Status Summary:', emailStatus);
        
      } catch (emailError) {
        console.error('=== EMAIL SENDING FAILED ===');
        console.error('Email error details:', {
          name: emailError.name,
          message: emailError.message,
          stack: emailError.stack,
          cause: emailError.cause
        });
        emailStatus.errors.push(`Critical email error: ${emailError.message}`);
        
        // Try to update the database with the error
        try {
          await supabase
            .from('assessment_responses')
            .update({ 
              email_sent: false,
              email_details: JSON.stringify(emailStatus)
            })
            .eq('id', insertedData.id);
        } catch (dbError) {
          console.error('Failed to update error status in database:', dbError);
        }
      }
    } else {
      console.log('=== EMAIL SENDING SKIPPED ===');
      console.log('Reasons:');
      console.log('- Resend configured:', !!resend);
      console.log('- Assessment saved:', !!insertedData);
      console.log('- Assessment ID:', insertedData?.id || 'N/A');
      
      if (insertedData) {
        // Update database to indicate emails were not sent
        try {
          await supabase
            .from('assessment_responses')
            .update({ 
              email_sent: false,
              email_details: JSON.stringify({ 
                skipped: true, 
                reason: 'Resend not configured or assessment not saved',
                resendConfigured: !!resend,
                assessmentSaved: !!insertedData
              })
            })
            .eq('id', insertedData.id);
        } catch (dbError) {
          console.error('Failed to update skip status in database:', dbError);
        }
      }
    }

    // Return success response with email status
    console.log('Assessment processed successfully');
    console.log('=== FINAL STATUS ===');
    console.log('- Assessment saved:', !!insertedData);
    console.log('- Email attempted:', emailStatus.attempted);
    console.log('- Internal email sent:', emailStatus.internalEmailSent);
    console.log('- User email sent:', emailStatus.userEmailSent);
    console.log('- Email errors:', emailStatus.errors.length);
    
    return new Response(JSON.stringify({ 
      success: true,
      assessmentId: insertedData?.id,
      message: 'Assessment saved successfully',
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