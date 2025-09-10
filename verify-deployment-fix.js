#!/usr/bin/env node

/**
 * Vercel Deployment Fix Verification Script
 * Confirms that all deployment issues have been resolved
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Verifying Vercel Deployment Fix...\n');

// Check 1: Verify astro.config.mjs has correct configuration
console.log('1. Checking Astro configuration...');
const astroConfig = readFileSync('./astro.config.mjs', 'utf-8');

const checks = [
  {
    name: 'Modern Vercel adapter import',
    test: () => astroConfig.includes('import vercel from "@astrojs/vercel"'),
    error: 'Still using deprecated @astrojs/vercel/serverless import'
  },
  {
    name: 'Server output mode',
    test: () => astroConfig.includes('output: \'server\''),
    error: 'Output mode is not set to "server"'
  },
  {
    name: 'Analytics enabled',
    test: () => astroConfig.includes('analytics: true'),
    error: 'Vercel analytics not enabled'
  },
  {
    name: 'Speed Insights enabled',
    test: () => astroConfig.includes('speedInsights'),
    error: 'Speed Insights not configured'
  }
];

checks.forEach(check => {
  if (check.test()) {
    console.log(`   ✅ ${check.name}`);
  } else {
    console.log(`   ❌ ${check.name}: ${check.error}`);
    process.exit(1);
  }
});

// Check 2: Verify build works
console.log('\n2. Testing build process...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('   ✅ Build successful');
} catch (error) {
  console.log('   ❌ Build failed');
  console.log('   Error:', error.message);
  process.exit(1);
}

// Check 3: Verify Vercel output structure
console.log('\n3. Checking Vercel output structure...');
try {
  const configExists = readFileSync('./.vercel/output/config.json', 'utf-8');
  console.log('   ✅ Vercel output configuration exists');
  
  const config = JSON.parse(configExists);
  if (config.version === 3) {
    console.log('   ✅ Using Vercel Build Output API v3');
  }
} catch (error) {
  console.log('   ❌ Vercel output configuration missing or invalid');
  process.exit(1);
}

// Check 4: Verify package.json dependencies
console.log('\n4. Checking dependencies...');
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

if (packageJson.dependencies['@astrojs/vercel']) {
  console.log(`   ✅ @astrojs/vercel version ${packageJson.dependencies['@astrojs/vercel']}`);
} else {
  console.log('   ❌ @astrojs/vercel dependency missing');
  process.exit(1);
}

console.log('\n🎉 All deployment configuration checks passed!');
console.log('\n📦 Deployment Summary:');
console.log('   • Fixed deprecated Vercel adapter import');
console.log('   • Changed output mode from hybrid to server');
console.log('   • Enabled Vercel Analytics and Speed Insights');
console.log('   • Removed legacy configuration files');
console.log('   • Verified build process works correctly');
console.log('\n🚀 The website should now deploy successfully on Vercel!');