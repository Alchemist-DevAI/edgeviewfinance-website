#!/usr/bin/env node

/**
 * Test script for the assessment submission API
 * This will help debug the email sending issues
 */

import fetch from 'node-fetch';

const API_URL = process.env.API_URL || 'http://localhost:4002/api/assessment-submit.json';

const testData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '0400000000',
  businessName: 'Test Business',
  totalScore: 42,
  readinessLevel: 'Finance Ready',
  answers: {
    q1: 'Up-to-date and accurate',
    q2: '$1M - $5M',
    q3: 'Strong - We have healthy cash flow and solid profit margins',
    q4: ['Financial statements (latest 2 years)', 'Tax returns (latest 2 years)'],
    q5: 'We have obtained finance before and understand the process'
  },
  utmSource: 'test',
  utmMedium: 'api_test',
  utmCampaign: 'debug',
  referrerUrl: 'http://localhost:4002/test'
};

async function testAPI() {
  console.log('=== TESTING ASSESSMENT API ===');
  console.log('API URL:', API_URL);
  console.log('Test data prepared');
  
  try {
    console.log('\nSending POST request...');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Assessment-API-Test/1.0'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.json();
    console.log('\nResponse data:');
    console.log(JSON.stringify(responseData, null, 2));
    
    if (responseData.success) {
      console.log('\n✓ API call successful');
      console.log('Assessment ID:', responseData.assessmentId);
      
      if (responseData.emailStatus) {
        console.log('\nEmail Status:');
        console.log('- Resend configured:', responseData.emailStatus.resendConfigured);
        console.log('- Email attempted:', responseData.emailStatus.attempted);
        console.log('- Internal email sent:', responseData.emailStatus.internalEmailSent);
        console.log('- User email sent:', responseData.emailStatus.userEmailSent);
        console.log('- Has errors:', responseData.emailStatus.hasErrors);
        console.log('- Error count:', responseData.emailStatus.errorCount);
      }
    } else {
      console.log('\n✗ API call failed');
      console.log('Error:', responseData.error);
      console.log('Details:', responseData.details);
    }
    
  } catch (error) {
    console.error('\n✗ Test failed with error:');
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
  
  console.log('\n=== TEST COMPLETE ===');
}

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAPI();
}

export { testAPI };