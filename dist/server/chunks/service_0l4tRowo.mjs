// Email templates for Edgeview Finance

!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="87c3d4ad-eb67-456c-b038-506558a84694",e._sentryDebugIdIdentifier="sentry-dbid-87c3d4ad-eb67-456c-b038-506558a84694");})();}catch(e){}};const contactFormNotificationTemplate = (data) => {
  const financeTypesStr = data.finance_types ? data.finance_types.join(', ') : 'Not specified';
  const submissionDate = new Date().toLocaleString('en-AU', { 
    timeZone: 'Australia/Brisbane',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  return {
    subject: `New Finance Enquiry: ${data.first_name} ${data.last_name} - ${data.business_type || 'Business'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #1C2C3B;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: #f8f9fa;
              border-bottom: 3px solid #f97316;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
              color: #1C2C3B;
            }
            .header p {
              margin: 5px 0 0 0;
              font-size: 14px;
              color: #6b7280;
            }
            .content {
              padding: 30px;
            }
            .section {
              margin-bottom: 30px;
              padding: 20px;
              background: #f8f9fa;
              border-left: 4px solid #f97316;
            }
            .section h2 {
              margin: 0 0 15px 0;
              color: #1C2C3B;
              font-size: 18px;
              font-weight: 600;
            }
            .field {
              margin-bottom: 12px;
              display: flex;
              align-items: flex-start;
            }
            .field-label {
              font-weight: 600;
              color: #666;
              min-width: 140px;
              font-size: 14px;
            }
            .field-value {
              color: #1C2C3B;
              flex: 1;
              font-size: 14px;
            }
            .priority-badge {
              display: inline-block;
              padding: 4px 12px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
            }
            .priority-urgent {
              background: #fee2e2;
              color: #dc2626;
            }
            .priority-normal {
              background: #fef3c7;
              color: #d97706;
            }
            .priority-planning {
              background: #dbeafe;
              color: #2563eb;
            }
            .requirements-box {
              background: white;
              padding: 15px;
              border: 1px solid #e9ecef;
              margin-top: 10px;
            }
            .action-buttons {
              margin-top: 30px;
              text-align: center;
            }
            .btn {
              display: inline-block;
              padding: 12px 30px;
              margin: 0 5px;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
            }
            .btn-primary {
              background: #f97316;
              color: white;
            }
            .btn-secondary {
              background: #6b7280;
              color: white;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .footer a {
              color: #f97316;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Finance Enquiry Received</h1>
              <p>${submissionDate}</p>
            </div>
            
            <div class="content">
              <!-- Priority Indicator -->
              <div style="text-align: center; margin-bottom: 20px;">
                ${data.timeframe === 'ASAP (within 1 week)' ? 
                  '<span class="priority-badge priority-urgent">⚡ Urgent - ASAP</span>' :
                  data.timeframe === '2-4 weeks' ? 
                  '<span class="priority-badge priority-normal">📅 Normal Priority</span>' :
                  '<span class="priority-badge priority-planning">📋 Planning Stage</span>'
                }
              </div>

              <!-- Contact Details -->
              <div class="section">
                <h2>👤 Contact Details</h2>
                <div class="field">
                  <span class="field-label">Name:</span>
                  <span class="field-value"><strong>${data.first_name} ${data.last_name}</strong></span>
                </div>
                <div class="field">
                  <span class="field-label">Mobile:</span>
                  <span class="field-value"><a href="tel:${data.mobile_number}">${data.mobile_number}</a></span>
                </div>
                <div class="field">
                  <span class="field-label">Email:</span>
                  <span class="field-value"><a href="mailto:${data.email}">${data.email}</a></span>
                </div>
                <div class="field">
                  <span class="field-label">Preferred Contact:</span>
                  <span class="field-value">${data.contact_method}</span>
                </div>
              </div>

              <!-- Business Information -->
              <div class="section">
                <h2>🏢 Business Information</h2>
                <div class="field">
                  <span class="field-label">Business Type:</span>
                  <span class="field-value"><strong>${data.business_type || 'Not specified'}</strong></span>
                </div>
              </div>

              <!-- Finance Requirements -->
              <div class="section">
                <h2>💰 Finance Requirements</h2>
                <div class="field">
                  <span class="field-label">Finance Types:</span>
                  <span class="field-value"><strong>${financeTypesStr}</strong></span>
                </div>
                <div class="field">
                  <span class="field-label">Amount Range:</span>
                  <span class="field-value"><strong>${data.finance_amount || 'Not specified'}</strong></span>
                </div>
                <div class="field">
                  <span class="field-label">Timeframe:</span>
                  <span class="field-value"><strong>${data.timeframe || 'Not specified'}</strong></span>
                </div>
                
                ${data.requirements ? `
                <div style="margin-top: 15px;">
                  <strong style="color: #666; font-size: 14px;">Additional Requirements:</strong>
                  <div class="requirements-box">
                    ${data.requirements}
                  </div>
                </div>
                ` : ''}
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <a href="tel:${data.mobile_number}" class="btn btn-primary">📱 Call Client</a>
                <a href="mailto:${data.email}" class="btn btn-secondary">📧 Email Client</a>
              </div>
            </div>

            <div class="footer">
              <p>This enquiry was submitted via the Edgeview Finance website contact form.</p>
              <p>Submission ID: ${data.id || 'N/A'}</p>
              <p><a href="https://edgeviewfinance.com.au">edgeviewfinance.com.au</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Finance Enquiry Received
${submissionDate}

CONTACT DETAILS
Name: ${data.first_name} ${data.last_name}
Mobile: ${data.mobile_number}
Email: ${data.email}
Preferred Contact: ${data.contact_method}

BUSINESS INFORMATION
Business Type: ${data.business_type || 'Not specified'}

FINANCE REQUIREMENTS
Finance Types: ${financeTypesStr}
Amount Range: ${data.finance_amount || 'Not specified'}
Timeframe: ${data.timeframe || 'Not specified'}

Additional Requirements:
${data.requirements || 'None provided'}

---
Submission ID: ${data.id || 'N/A'}
Edgeview Finance | edgeviewfinance.com.au
    `
  };
};

// Auto-response template for clients
const clientAutoResponseTemplate = (data) => {
  return {
    subject: 'Thank you for your enquiry - Edgeview Finance',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #1C2C3B;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 12px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: #f8f9fa;
              border-bottom: 3px solid #f97316;
              padding: 30px;
              text-align: center;
            }
            .logo {
              margin-bottom: 15px;
            }
            .logo img {
              max-width: 250px;
              height: auto;
            }
            .tagline {
              color: #6b7280;
              font-size: 14px;
              margin-top: 10px;
            }
            .content {
              padding: 40px 30px;
            }
            h1 {
              color: #1C2C3B;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .timeline {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 25px;
              margin: 30px 0;
            }
            .timeline-item {
              display: flex;
              align-items: flex-start;
              margin-bottom: 20px;
            }
            .timeline-item:last-child {
              margin-bottom: 0;
            }
            .timeline-number {
              background: #f97316;
              color: white;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              margin-right: 15px;
              flex-shrink: 0;
            }
            .timeline-content h3 {
              margin: 0 0 5px 0;
              color: #1C2C3B;
              font-size: 16px;
            }
            .timeline-content p {
              margin: 0;
              color: #6b7280;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: #f97316;
              color: white;
              padding: 14px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .contact-box {
              background: #fef3c7;
              border: 1px solid #fbbf24;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            .footer {
              background: #f8f9fa;
              padding: 30px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="https://www.edgeviewfinance.com.au/images/edgeview-finance-logo.png" alt="Edgeview Finance" style="max-width: 250px; height: auto;">
              </div>
              <p class="tagline">Strategic Finance Solutions for Queensland Businesses</p>
            </div>
            
            <div class="content">
              <h1>Thank you ${data.first_name}, we've received your enquiry!</h1>
              
              <p>I'm Dan Peters, and I'll personally review your finance requirements to identify the best solutions for your business.</p>
              
              <div class="timeline">
                <h2 style="margin-top: 0; color: #1C2C3B; font-size: 18px;">What happens next:</h2>
                
                <div class="timeline-item">
                  <div class="timeline-number">1</div>
                  <div class="timeline-content">
                    <h3>Initial Review</h3>
                    <p>I'll assess your requirements against our panel of 30+ lenders</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-number">2</div>
                  <div class="timeline-content">
                    <h3>Personal Contact</h3>
                    <p>I'll call you within 4 business hours to discuss your specific needs</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-number">3</div>
                  <div class="timeline-content">
                    <h3>Tailored Solutions</h3>
                    <p>You'll receive preliminary options suited to your business situation</p>
                  </div>
                </div>
              </div>

              <div class="contact-box">
                <strong>🚨 Need immediate assistance?</strong><br>
                <p style="margin: 10px 0 5px 0;">Call me directly on <strong>1300 280 895</strong></p>
                <p style="margin: 5px 0; font-size: 13px;">Available Monday-Friday 8:30am-5:30pm AEST</p>
              </div>

              <p><strong>Your submission details:</strong></p>
              <ul style="color: #6b7280; font-size: 14px;">
                <li>Business Type: ${data.business_type || 'Not specified'}</li>
                <li>Finance Amount: ${data.finance_amount || 'Not specified'}</li>
                <li>Timeframe: ${data.timeframe || 'Not specified'}</li>
              </ul>

              <p style="margin-top: 30px;">Kind regards,</p>
              <p style="margin: 5px 0;"><strong>Dan Peters</strong><br>
              Director & Senior Finance Broker<br>
              Edgeview Finance</p>
            </div>

            <div class="footer">
              <p>Edgeview Finance Pty Ltd | ABN 38 670 557 635</p>
              <p>Credit Representative 552241 of QED Credit Services Pty Ltd<br>
              Australian Credit Licence 387856</p>
              <p><a href="https://edgeviewfinance.com.au" style="color: #f97316;">edgeviewfinance.com.au</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Thank you ${data.first_name}, we've received your enquiry!

I'm Dan Peters, and I'll personally review your finance requirements to identify the best solutions for your business.

WHAT HAPPENS NEXT:

1. Initial Review
   I'll assess your requirements against our panel of 30+ lenders

2. Personal Contact
   I'll call you within 4 business hours to discuss your specific needs

3. Tailored Solutions
   You'll receive preliminary options suited to your business situation

Need immediate assistance?
Call me directly on 1300 280 895
Available Monday-Friday 8:30am-5:30pm AEST

Your submission details:
- Business Type: ${data.business_type || 'Not specified'}
- Finance Amount: ${data.finance_amount || 'Not specified'}
- Timeframe: ${data.timeframe || 'Not specified'}

Kind regards,

Dan Peters
Director & Senior Finance Broker
Edgeview Finance

---
Edgeview Finance Pty Ltd | ABN 38 670 557 635
Credit Representative 552241 of QED Credit Services Pty Ltd
Australian Credit Licence 387856
edgeviewfinance.com.au
    `
  };
};

let resend = null;
const resendApiKey = "re_YE8Sdmy3_6eLJu6dCQkj7BGtmHo6BgcqZ";
if (!resendApiKey.includes("YOUR_API_KEY")) {
  try {
    const { Resend } = await import('resend');
    resend = new Resend(resendApiKey);
    console.log("Resend initialized successfully");
  } catch (err) {
    console.log("Resend initialization failed:", err.message);
  }
} else {
  console.log("Resend API key not configured or invalid");
}
const DEFAULT_FROM = "noreply@website.edgeviewfinance.com.au";
const DEFAULT_TO = "dan.peters@edgeviewfinance.com.au";
class EmailService {
  /**
   * Send email notification to admin when new contact form is submitted
   */
  static async sendContactFormNotification(formData) {
    try {
      if (!resend) {
        console.log("Email skipped: Resend API key not configured");
        return { success: false, skipped: true, reason: "Email service not configured" };
      }
      const template = contactFormNotificationTemplate(formData);
      const { data, error } = await resend.emails.send({
        from: `Edgeview Finance <${DEFAULT_FROM}>`,
        to: [DEFAULT_TO],
        subject: template.subject,
        html: template.html,
        text: template.text,
        reply_to: formData.email,
        // Allow direct reply to client
        tags: [
          { name: "type", value: "contact_form" }
        ]
      });
      if (error) {
        console.error("Resend error:", error);
        return { success: false, error };
      }
      console.log("Admin notification sent:", data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Email service error:", err);
      return { success: false, error: err.message };
    }
  }
  /**
   * Send auto-response to client after form submission
   */
  static async sendClientAutoResponse(formData) {
    try {
      if (!resend) {
        console.log("Email skipped: Resend API key not configured");
        return { success: false, skipped: true, reason: "Email service not configured" };
      }
      const template = clientAutoResponseTemplate(formData);
      const { data, error } = await resend.emails.send({
        from: `Dan Peters - Edgeview Finance <${DEFAULT_FROM}>`,
        to: [formData.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
        reply_to: "dan.peters@edgeviewfinance.com.au",
        headers: {
          "X-Priority": "3",
          "X-Mailer": "Edgeview Finance Website"
        },
        tags: [
          { name: "type", value: "auto_response" }
        ]
      });
      if (error) {
        console.error("Resend error for auto-response:", error);
        return { success: false, error };
      }
      console.log("Auto-response sent:", data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Auto-response error:", err);
      return { success: false, error: err.message };
    }
  }
  /**
   * Send welcome email to newsletter subscriber
   */
  static async sendNewsletterWelcome(email) {
    try {
      if (!resend) {
        console.log("Email skipped: Resend API key not configured");
        return { success: false, skipped: true, reason: "Email service not configured" };
      }
      const { data, error } = await resend.emails.send({
        from: `Dan Peters - Edgeview Finance <${DEFAULT_FROM}>`,
        to: [email],
        subject: "Welcome to Edgeview Finance Insider Insights",
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
          { name: "type", value: "newsletter_welcome" }
        ]
      });
      if (error) {
        console.error("Resend error for newsletter welcome:", error);
        return { success: false, error };
      }
      console.log("Newsletter welcome email sent:", data.id);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error("Newsletter welcome email error:", err);
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
    results.adminNotification = await this.sendContactFormNotification(formData);
    results.clientAutoResponse = await this.sendClientAutoResponse(formData);
    results.success = results.adminNotification.success;
    return results;
  }
}

export { EmailService as E };
