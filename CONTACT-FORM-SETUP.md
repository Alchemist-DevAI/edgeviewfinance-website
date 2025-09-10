# Contact Form Email Setup Guide

## Overview
The contact form is now fully integrated with:
- ✅ Supabase database for storing submissions
- ✅ Resend email service for notifications
- ✅ Professional HTML email templates
- ✅ Auto-response to clients

## Current Status (Without Resend API Key)
The system is using `MockEmailService` which logs email details to console instead of sending real emails. All form submissions are still saved to the database.

## Setting Up Resend (Production)

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (10,000 emails/month free)
3. Verify your email address

### Step 2: Verify Your Domain
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter `edgeviewfinance.com.au`
4. Add the DNS records provided to your domain:
   - SPF record
   - DKIM records
   - Optional: DMARC record for better deliverability
5. Click "Verify Domain" once DNS propagates (usually 5-30 minutes)

### Step 3: Get API Key
1. Go to "API Keys" in Resend dashboard
2. Click "Create API Key"
3. Name it: "Edgeview Finance Website"
4. Copy the key (starts with `re_`)

### Step 4: Configure Environment
1. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Add your Resend API key:
```env
RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
EMAIL_FROM=noreply@edgeviewfinance.com.au
EMAIL_TO=dan@edgeviewfinance.com.au
```

3. Restart the development server to load new environment variables

## Testing the Form

### With Mock Service (Development)
1. Submit the contact form
2. Check browser console for "MOCK EMAIL SERVICE" logs
3. Check database for saved submission

### With Resend (Production)
1. Submit the contact form
2. Check your email for:
   - Admin notification (to dan@edgeviewfinance.com.au)
   - Client auto-response (to submitted email)
3. Check Resend dashboard for email logs

## Email Features

### Admin Notification Email
- Professional HTML design with Edgeview branding
- Priority indicator based on timeframe
- All form fields clearly displayed
- Direct call/email action buttons
- Reply-to set to client's email

### Client Auto-Response
- Branded welcome message from Dan Peters
- 4-step process timeline
- Contact information for urgent queries
- Professional footer with license details

## Database Structure

Table: `contact_form_submissions`
- Stores all form fields
- Tracks email sent status
- Includes submission timestamp
- Status field for CRM integration

## Future CRM Integration

When building the CRM, this system provides:
1. **Database**: All submissions stored with status tracking
2. **Email Service**: Resend configured and ready
3. **Templates**: Professional email templates ready to extend
4. **API**: Endpoint structure ready for CRM webhook integration

### CRM Enhancement Ideas:
- Webhook to create CRM lead automatically
- Email sequences for follow-up
- SMS integration via Twilio
- Calendar booking after submission
- Lead scoring based on finance amount/urgency
- Automated task creation for follow-ups

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify API endpoint is accessible: `/api/submit-contact`
3. Check network tab for response

### Emails Not Sending
1. Verify RESEND_API_KEY is set in `.env`
2. Check Resend dashboard for API logs
3. Verify domain is verified in Resend
4. Check console logs for error messages

### Database Not Saving
1. Check Supabase project is active
2. Verify table exists: `contact_form_submissions`
3. Check browser console for database errors

## Support
For Resend support: https://resend.com/docs
For implementation questions: Check the codebase in:
- `/src/lib/email/` - Email templates and service
- `/src/pages/api/submit-contact.js` - API endpoint
- `/src/components/Contact/ContactForm.astro` - Form component