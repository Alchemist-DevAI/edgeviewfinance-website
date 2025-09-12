import type { APIRoute } from 'astro';

/**
 * Google OAuth Callback Handler
 * This endpoint receives the authorization code from Google OAuth flow
 * and displays it for manual token exchange
 */
export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const state = url.searchParams.get('state');

  // Handle errors from Google
  if (error) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Error - Edgeview Finance</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px;
            }
            .error { 
              background: #fee; 
              border: 1px solid #fcc; 
              padding: 20px; 
              border-radius: 8px; 
            }
            h1 { color: #d00; }
          </style>
        </head>
        <body>
          <div class="error">
            <h1>❌ OAuth Authorization Failed</h1>
            <p><strong>Error:</strong> ${error}</p>
            <p>Please close this window and try again.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  // Handle successful authorization
  if (code) {
    // In production, you would exchange this code for tokens server-side
    // For now, we'll display it for manual exchange
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Success - Edgeview Finance</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              max-width: 800px; 
              margin: 50px auto; 
              padding: 20px;
              background: #f5f5f5;
            }
            .success { 
              background: #efe; 
              border: 1px solid #cfc; 
              padding: 20px; 
              border-radius: 8px; 
              margin-bottom: 20px;
            }
            .code-box {
              background: #2d2d2d;
              color: #f8f8f2;
              padding: 15px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              word-break: break-all;
              margin: 10px 0;
            }
            .instructions {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #0a0; }
            h2 { color: #333; margin-top: 30px; }
            button {
              background: #4285f4;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
              margin: 5px;
            }
            button:hover { background: #357ae8; }
          </style>
        </head>
        <body>
          <div class="success">
            <h1>✅ Authorization Successful!</h1>
            <p>You've successfully authorized Edgeview Finance to access your Google services.</p>
          </div>
          
          <div class="instructions">
            <h2>Authorization Code:</h2>
            <div class="code-box" id="authCode">${code}</div>
            <button onclick="copyCode()">📋 Copy Code</button>
            
            <h2>Next Steps:</h2>
            <ol>
              <li>Copy the authorization code above</li>
              <li>Go back to the OAuth setup page</li>
              <li>Paste this code in Step 4</li>
              <li>Click "Get Refresh Token"</li>
            </ol>
            
            <h2>Or use this curl command:</h2>
            <div class="code-box">
curl -X POST https://oauth2.googleapis.com/token \\
  -d "code=${code}" \\
  -d "client_id=YOUR_CLIENT_ID" \\
  -d "client_secret=YOUR_CLIENT_SECRET" \\
  -d "redirect_uri=${url.origin}/api/auth/callback" \\
  -d "grant_type=authorization_code"
            </div>
            
            <p style="margin-top: 30px;">
              <a href="/get-google-refresh-token.html?code=${encodeURIComponent(code)}">
                ← Return to OAuth Setup Page
              </a>
            </p>
          </div>
          
          <script>
            function copyCode() {
              const code = document.getElementById('authCode').textContent;
              navigator.clipboard.writeText(code).then(() => {
                alert('Authorization code copied to clipboard!');
              });
            }
          </script>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  // No code or error - invalid request
  return new Response('Invalid OAuth callback - missing authorization code', {
    status: 400
  });
};