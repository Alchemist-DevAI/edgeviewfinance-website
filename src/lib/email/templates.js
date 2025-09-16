// Email templates for Edgeview Finance

export const contactFormNotificationTemplate = (data) => {
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
export const clientAutoResponseTemplate = (data) => {
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