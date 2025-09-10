import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://paduvnvocacqnmlfuvyn.supabase.co'
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Assessment scoring logic
export function calculateScore(answers) {
  let score = 0;
  
  // Q1: Financial Management (0-10 points)
  const q1Scores = { 'A': 10, 'B': 7, 'C': 4, 'D': 0 };
  score += q1Scores[answers.q1] || 0;
  
  // Q2: Revenue Profile (0-10 points)
  const q2Scores = { 'A': 10, 'B': 7, 'C': 4, 'D': 0 };
  score += q2Scores[answers.q2] || 0;
  
  // Q3: Asset Visibility (0-10 points)
  const q3Scores = { 'A': 10, 'B': 7, 'C': 4, 'D': 0 };
  score += q3Scores[answers.q3] || 0;
  
  // Q4: Documentation (0-10 points)
  // Based on number of items checked (0-9)
  const checkedCount = parseInt(answers.q4) || 0;
  if (checkedCount >= 7) score += 10;
  else if (checkedCount >= 5) score += 7;
  else if (checkedCount >= 3) score += 4;
  else score += 0;
  
  // Q5: Experience (0-10 points)
  const q5Scores = { 'A': 10, 'B': 7, 'C': 4, 'D': 0 };
  score += q5Scores[answers.q5] || 0;
  
  return score;
}

export function getReadinessLevel(score) {
  if (score >= 45) return 'elite';
  if (score >= 35) return 'professional';
  if (score >= 25) return 'nearly-ready';
  if (score >= 15) return 'foundation';
  return 'support';
}

export function getReadinessLevelDisplayName(level) {
  const displayNames = {
    'elite': 'Finance Ready - Elite Level',
    'professional': 'Finance Ready - Professional Level',
    'nearly-ready': 'Nearly Ready - Strategic Gaps Identified',
    'foundation': 'Foundation Building Required',
    'support': 'Strategic Support Recommended'
  };
  return displayNames[level] || 'Assessment Complete';
}

export function getScoreColor(level) {
  const colors = {
    'elite': '#22C55E',
    'professional': '#3B82F6', 
    'nearly-ready': '#F59E0B',
    'foundation': '#F97316',
    'support': '#EF4444'
  };
  return colors[level] || '#6B7280';
}