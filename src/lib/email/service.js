import { contactFormNotificationTemplate, clientAutoResponseTemplate } from './templates.js';

// Only import and initialize Resend if API key is properly configured
let resend = null;
const resendApiKey = import.meta.env.RESEND_API_KEY;
if (resendApiKey && !resendApiKey.includes('YOUR_API_KEY')) {
  try {
    const { Resend } = await import('resend');
    resend = new Resend(resendApiKey);
    console.log('Resend initialized successfully');
  } catch (err) {
    console.log('Resend initialization failed:', err.message);
  }
} else {
  console.log('Resend API key not configured or invalid');
}

// Default email addresses
const DEFAULT_FROM = import.meta.env.EMAIL_FROM || 'noreply@website.edgeviewfinance.com.au';
const DEFAULT_TO = import.meta.env.EMAIL_TO || 'dan.peters@edgeviewfinance.com.au';

export class EmailService {
  /**
   * Send email notification to admin when new contact form is submitted
   */
  static async sendContactFormNotification(formData) {
    try {
      // Skip if Resend is not configured
      if (!resend) {
        console.log('Email skipped: Resend API key not configured');
        return { success: false, skipped: true, reason: 'Email service not configured' };
      }

      const template = contactFormNotificationTemplate(formData);
      
      const { data, error } = await resend.emails.send({
        from: `Edgeview Finance <${DEFAULT_FROM}>`,
        to: ['ray.mckay@edgeviewfinance.com.au'],
        cc: ['dan.peters@edgeviewfinance.com.au'],
        subject: template.subject,
        html: template.html,
        text: template.text,
        reply_to: formData.email, // Allow direct reply to client
        tags: [
          { name: 'type', value: 'contact_form' }
        ]
      });

      if (error) {
        console.error('Resend error:', error);
        return { success: false, error };
      }

      console.log('Admin notification sent:', data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error('Email service error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Send auto-response to client after form submission
   */
  static async sendClientAutoResponse(formData) {
    try {
      // Skip if Resend is not configured
      if (!resend) {
        console.log('Email skipped: Resend API key not configured');
        return { success: false, skipped: true, reason: 'Email service not configured' };
      }

      const template = clientAutoResponseTemplate(formData);
      
      const { data, error } = await resend.emails.send({
        from: `Ray McKay - Edgeview Finance <${DEFAULT_FROM}>`,
        to: [formData.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
        reply_to: 'ray.mckay@edgeviewfinance.com.au',
        headers: {
          'X-Priority': '3',
          'X-Mailer': 'Edgeview Finance Website'
        },
        tags: [
          { name: 'type', value: 'auto_response' }
        ]
      });

      if (error) {
        console.error('Resend error for auto-response:', error);
        return { success: false, error };
      }

      console.log('Auto-response sent:', data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error('Auto-response error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Send welcome email to newsletter subscriber
   */
  static async sendNewsletterWelcome(email) {
    try {
      // Skip if Resend is not configured
      if (!resend) {
        console.log('Email skipped: Resend API key not configured');
        return { success: false, skipped: true, reason: 'Email service not configured' };
      }

      const { data, error } = await resend.emails.send({
        from: `Dan Peters - Edgeview Finance <${DEFAULT_FROM}>`,
        to: [email],
        subject: 'Welcome to Edgeview Finance Insider Insights',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Welcome to Finance Insider Insights!</h2>
            <p>Thank you for subscribing to our newsletter. You're now part of hundreds of business owners getting weekly finance strategies delivered to their inbox.</p>
            
            <h3>What to expect:</h3>
            <ul>
              <li>Weekly insights on commercial finance trends</li>
              <li>Tips for securing better finance terms</li>
              <li>Success stories from Queensland businesses</li>
              <li>Market updates that affect your business</li>
            </ul>
            
            <p>Keep an eye on your inbox for our next newsletter, packed with valuable insights to help grow your business.</p>
            
            <p>If you have any questions about commercial finance, feel free to reply to this email or call us on 1300 192 407.</p>
            
            <p>Best regards,<br>
            Dan Peters<br>
            Founder, Edgeview Finance</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 12px; color: #666;">
              You're receiving this because you subscribed to our newsletter. 
              <a href="https://www.edgeviewfinance.com.au" style="color: #f97316;">Visit our website</a>
            </p>
          </div>
        `,
        text: `Welcome to Finance Insider Insights!

Thank you for subscribing to our newsletter. You're now part of hundreds of business owners getting weekly finance strategies delivered to their inbox.

What to expect:
- Weekly insights on commercial finance trends
- Tips for securing better finance terms
- Success stories from Queensland businesses
- Market updates that affect your business

Keep an eye on your inbox for our next newsletter, packed with valuable insights to help grow your business.

If you have any questions about commercial finance, feel free to reply to this email or call us on 1300 192 407.

Best regards,
Dan Peters
Founder, Edgeview Finance

---
You're receiving this because you subscribed to our newsletter.
Visit our website: https://www.edgeviewfinance.com.au`,
        tags: [
          { name: 'type', value: 'newsletter_welcome' }
        ]
      });

      if (error) {
        console.error('Resend error for newsletter welcome:', error);
        return { success: false, error };
      }

      console.log('Newsletter welcome email sent:', data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error('Newsletter welcome email error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Send both admin notification and client auto-response
   */
  static async sendContactFormEmails(formData) {
    const results = {
      adminNotification: null,
      clientAutoResponse: null,
      success: false
    };

    // Send admin notification
    results.adminNotification = await this.sendContactFormNotification(formData);
    
    // Send client auto-response
    results.clientAutoResponse = await this.sendClientAutoResponse(formData);
    
    // Overall success if at least admin notification was sent
    results.success = results.adminNotification.success;
    
    return results;
  }
}

// For development/testing without Resend API key
export class MockEmailService {
  static async sendContactFormEmails(formData) {
    console.log('=== MOCK EMAIL SERVICE ===');
    console.log('Would send emails to:', DEFAULT_TO);
    console.log('Would send auto-response to:', formData.email);
    console.log('Form data:', formData);
    console.log('==========================');
    
    return {
      adminNotification: { success: true, messageId: 'mock-admin-123' },
      clientAutoResponse: { success: true, messageId: 'mock-client-123' },
      success: true
    };
  }
}