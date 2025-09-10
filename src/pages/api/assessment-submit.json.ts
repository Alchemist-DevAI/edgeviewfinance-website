import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client directly in the API route
const supabaseUrl = 'https://paduvnvocacqnmlfuvyn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    // Update analytics (increment daily counter) - simplified for now
    // We'll handle analytics separately if needed
    console.log('Assessment saved successfully:', insertedData?.id);

    // Return success response
    return new Response(JSON.stringify({ 
      success: true,
      assessmentId: insertedData?.id,
      message: 'Assessment saved successfully'
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