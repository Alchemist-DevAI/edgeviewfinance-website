#!/usr/bin/env node

import http from 'http';
import { parse } from 'url';

const PORT = 4003;

const server = http.createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);
  
  // Handle OAuth callback
  if (pathname === '/api/auth/callback') {
    const code = query.code;
    const error = query.error;
    
    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head><title>OAuth Error</title></head>
          <body style="font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto;">
            <h1 style="color: red;">❌ OAuth Error</h1>
            <p>Error: ${error}</p>
          </body>
        </html>
      `);
      return;
    }
    
    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Success - Edgeview Finance</title>
            <style>
              body { font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto; }
              .success { background: #d4edda; border: 1px solid #28a745; padding: 20px; border-radius: 8px; }
              .code-box { background: #f8f9fa; padding: 15px; border: 1px solid #dee2e6; border-radius: 4px; font-family: monospace; word-break: break-all; margin: 20px 0; }
              .curl-box { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 12px; overflow-x: auto; }
              button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
              button:hover { background: #0056b3; }
              h2 { color: #28a745; }
            </style>
          </head>
          <body>
            <div class="success">
              <h1>✅ Authorization Successful!</h1>
              <p>You've successfully authorized Edgeview Finance to access Google services.</p>
            </div>
            
            <h2>Step 1: Your Authorization Code</h2>
            <div class="code-box" id="authCode">${code}</div>
            <button onclick="copyCode()">📋 Copy Code</button>
            
            <h2>Step 2: Exchange for Refresh Token</h2>
            <p>Run this command in your terminal (WSL or Command Prompt):</p>
            <div class="curl-box">curl -X POST https://oauth2.googleapis.com/token \\
  -d "code=${code}" \\
  -d "client_id=YOUR_GOOGLE_CLIENT_ID_HERE" \\
  -d "client_secret=YOUR_GOOGLE_CLIENT_SECRET_HERE" \\
  -d "redirect_uri=http://localhost:4003/api/auth/callback" \\
  -d "grant_type=authorization_code"</div>
            <button onclick="copyCurl()">📋 Copy Command</button>
            
            <h2>Step 3: Save the Refresh Token</h2>
            <p>After running the curl command, you'll get a JSON response with a "refresh_token". Add it to your .env file:</p>
            <div class="code-box">GOOGLE_REFRESH_TOKEN=1//...</div>
            
            <script>
              function copyCode() {
                const code = document.getElementById('authCode').textContent;
                navigator.clipboard.writeText(code).then(() => {
                  alert('Authorization code copied!');
                });
              }
              
              function copyCurl() {
                const cmd = document.querySelector('.curl-box').textContent;
                navigator.clipboard.writeText(cmd).then(() => {
                  alert('Curl command copied! Paste it in your terminal.');
                });
              }
            </script>
          </body>
        </html>
      `);
      return;
    }
    
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing authorization code');
    return;
  }
  
  // Default response
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head><title>OAuth Server</title></head>
      <body style="font-family: system-ui; padding: 40px; text-align: center;">
        <h1>🔐 OAuth Callback Server</h1>
        <p>Server is running on port ${PORT}</p>
        <p>Waiting for OAuth callback at: /api/auth/callback</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`
  ✅ OAuth callback server running!
  
  Server URL: http://localhost:${PORT}
  Callback URL: http://localhost:${PORT}/api/auth/callback
  
  Ready to receive OAuth callbacks...
  `);
});