# Email Deliverability & Spam Prevention Guide

## Current Issues
Auto-response emails are being flagged as spam when sent to users who submit the contact form.

## Implemented Fixes

### 1. Sender Address Update
- Changed from `noreply@edgeviewfinance.com.au` to `dan@edgeviewfinance.com.au`
- Personal email addresses have better deliverability than "noreply" addresses

### 2. Email Headers
Added the following headers to improve deliverability:
- `reply_to`: Set to dan@edgeviewfinance.com.au for legitimate replies
- `X-Priority: 3`: Normal priority (not urgent/bulk)
- `X-Mailer`: Identifies the sending system

## Required Domain Configuration

To ensure emails reach the inbox, you need to configure the following DNS records:

### 1. SPF Record (Sender Policy Framework)
Add a TXT record to your DNS:
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com include:sendgrid.net ~all
```
Note: Update the includes based on Resend's requirements

### 2. DKIM (DomainKeys Identified Mail)
Resend should provide DKIM records in their dashboard:
1. Log into Resend.com
2. Go to Domains section
3. Add edgeviewfinance.com.au
4. Copy the DKIM records provided
5. Add them to your DNS

### 3. DMARC Record
Add a TXT record for DMARC policy:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dan@edgeviewfinance.com.au
```

## Additional Recommendations

### Content Improvements
1. ✅ Avoid spam trigger words in subject lines
2. ✅ Include both HTML and plain text versions
3. ✅ Have a good text-to-image ratio
4. ✅ Include company information in footer

### Technical Improvements
1. ✅ Use authenticated sending domain
2. ✅ Set proper reply-to address
3. ✅ Include unsubscribe information (for newsletters)
4. ⏳ Warm up IP address gradually (handled by Resend)

### Testing
1. Use mail-tester.com to check spam score
2. Send test emails to different providers (Gmail, Outlook, Yahoo)
3. Check Resend dashboard for bounce rates and spam complaints

## Resend Domain Verification

To complete domain verification in Resend:

1. Log into https://resend.com/domains
2. Click "Add Domain"
3. Enter: edgeviewfinance.com.au
4. Add the DNS records shown (usually 2-3 CNAME records)
5. Click "Verify Domain"
6. Wait for verification (usually takes 5-30 minutes)

Once verified, emails will be sent from your domain instead of Resend's, significantly improving deliverability.

## Monitoring

Check regularly:
- Resend dashboard for delivery rates
- Spam complaint rates (should be < 0.1%)
- Bounce rates (should be < 5%)
- Email engagement rates

## Support

If issues persist after implementing these changes:
1. Contact Resend support with delivery logs
2. Consider using a dedicated IP (for high volume)
3. Review email content for spam triggers