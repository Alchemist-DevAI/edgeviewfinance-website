import * as Sentry from '@sentry/astro';
export { renderers } from '../../renderers.mjs';

/**
 * Test API endpoint for Sentry error tracking
 * This endpoint intentionally throws errors to test Sentry integration
 */


async function GET() {
  try {
    // Capture a test message to Sentry
    Sentry.addBreadcrumb({
      message: 'Test API endpoint called',
      level: 'info',
      data: {
        url: '/api/test-error',
        timestamp: new Date().toISOString()
      }
    });

    // Intentionally throw an error for testing
    throw new Error('This is a test API error for Sentry tracking - Edgeview Finance');

  } catch (error) {
    // Capture the error in Sentry with additional context
    Sentry.captureException(error, {
      tags: {
        component: 'test-api',
        type: 'intentional-test'
      },
      extra: {
        message: 'This error was intentionally thrown to test Sentry integration',
        endpoint: '/api/test-error',
        project: 'edgeview-finance-website'
      }
    });

    console.error('Test API Error (sent to Sentry):', error);

    // Return error response
    return new Response(JSON.stringify({
      error: 'Test error successfully generated and sent to Sentry',
      message: error.message,
      timestamp: new Date().toISOString(),
      sentryEnabled: true
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

async function POST() {
  return new Response(JSON.stringify({
    error: 'Method not allowed - use GET for test error'
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
