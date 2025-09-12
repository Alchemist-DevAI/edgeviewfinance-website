import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log('=== NEWSLETTER SIGNUP API ENDPOINT CALLED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  // Initialize Supabase client with hardcoded credentials (matching assessment form)
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

  // Initialize Resend for email notifications
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    console.log('Resend initialization attempt:');
    console.log('- API key exists:', !!resendApiKey);
    
    if (resendApiKey && resendApiKey.startsWith('re_')) {
      const { Resend } = await import('resend');
      resend = new Resend(resendApiKey);
      console.log('✓ Resend API initialized successfully');
    } else {
      console.log('✗ Resend API key not found or invalid format, email sending disabled');
    }
  } catch (error) {
    console.error('✗ Failed to initialize Resend:', error);
    // Continue without email sending - this is not critical
  }
  try {
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

      // Send email notifications if Resend is configured
      if (resend) {
        try {
          const emailFrom = process.env.EMAIL_FROM || 'noreply@website.edgeviewfinance.com.au';
          
          // Send notification to Dan Peters
          console.log('Sending newsletter subscription notification to Dan Peters...');
          const adminNotification = await resend.emails.send({
            from: emailFrom,
            to: 'dan.peters@edgeviewfinance.com.au',
            subject: `New Newsletter Subscriber: ${email}`,
            html: `
              <h2>New Newsletter Subscription</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Source:</strong> ${source || 'blog'}</p>
              <p><strong>Type:</strong> Existing contact opted-in</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <hr>
              <p>This subscriber was already in the database and has now opted-in to the newsletter.</p>
            `
          });
          
          if (adminNotification.error) {
            console.error('Admin notification failed:', adminNotification.error);
          } else {
            console.log('✓ Admin notification sent successfully');
          }
          
          // Send welcome email to subscriber
          console.log('Sending welcome email to subscriber...');
          const welcomeEmail = await resend.emails.send({
            from: emailFrom,
            to: email,
            subject: 'Welcome to Edgeview Finance Newsletter',
            html: `
              <h2>Welcome to Our Newsletter!</h2>
              <p>Thank you for subscribing to the Edgeview Finance newsletter.</p>
              <p>You'll receive our latest insights on commercial finance, business tips, and industry updates.</p>
              <p>If you have any questions, feel free to reach out to us at 1300 336 365.</p>
              <br>
              <p>Best regards,<br>The Edgeview Finance Team</p>
            `
          });
          
          if (welcomeEmail.error) {
            console.error('Welcome email failed:', welcomeEmail.error);
          } else {
            console.log('✓ Welcome email sent successfully');
          }
        } catch (emailError) {
          console.error('Failed to send emails:', emailError);
          // Don't fail the subscription if email fails
        }
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

    // Send email notifications if Resend is configured
    if (resend) {
      try {
        const emailFrom = process.env.EMAIL_FROM || 'noreply@website.edgeviewfinance.com.au';
        
        // Send notification to Dan Peters
        console.log('Sending new subscriber notification to Dan Peters...');
        const adminNotification = await resend.emails.send({
          from: emailFrom,
          to: 'dan.peters@edgeviewfinance.com.au',
          subject: `New Newsletter Subscriber: ${email}`,
          html: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source || 'blog'}</p>
            <p><strong>Type:</strong> New subscriber</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <hr>
            <p>This is a new subscriber who has just signed up for the newsletter.</p>
          `
        });
        
        if (adminNotification.error) {
          console.error('Admin notification failed:', adminNotification.error);
        } else {
          console.log('✓ Admin notification sent successfully');
        }
        
        // Send welcome email to subscriber
        console.log('Sending welcome email to new subscriber...');
        const welcomeEmail = await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: 'Welcome to Edgeview Finance Newsletter',
          html: `
            <h2>Welcome to Our Newsletter!</h2>
            <p>Thank you for subscribing to the Edgeview Finance newsletter.</p>
            <p>You'll receive our latest insights on commercial finance, business tips, and industry updates.</p>
            <p>If you have any questions, feel free to reach out to us at 1300 336 365.</p>
            <br>
            <p>Best regards,<br>The Edgeview Finance Team</p>
          `
        });
        
        if (welcomeEmail.error) {
          console.error('Welcome email failed:', welcomeEmail.error);
        } else {
          console.log('✓ Welcome email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't fail the subscription if email fails
      }
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