const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.url === '/' || req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>Mission Control - WORKING!</title>
    <style>
        body { background: #0A0A0A; color: white; font-family: Arial; padding: 40px; text-align: center; }
        .success { color: #10B981; font-size: 24px; margin: 20px 0; }
        .info { background: #1A1A1A; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .agent { background: #2A2A2A; padding: 15px; margin: 10px; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <h1>🛡️ Mission Control Dashboard</h1>
    <div class="success">✅ SERVER CONNECTION SUCCESSFUL!</div>
    
    <div class="info">
        <h2>Connection Details</h2>
        <p><strong>Server IP:</strong> 172.18.0.3</p>
        <p><strong>Port:</strong> 80</p>
        <p><strong>Status:</strong> ACTIVE</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-AU', {timeZone: 'Australia/Melbourne'})} AEST</p>
    </div>

    <h2>Agent Status</h2>
    <div class="agent">🛡️ Sentinel - CEO Agent - ACTIVE</div>
    <div class="agent">📈 Renee Rivkin - Division 1 - BUSY</div>
    <div class="agent">💪 Greg Welch - Division 2 - ACTIVE</div>
    <div class="agent">📊 Adam Curwood - Division 3 - IDLE</div>
    <div class="agent">🏠 Shelley Vidikey - Division 4 - BUSY</div>

    <div class="info">
        <h2>Mission Statement</h2>
        <p style="font-style: italic; color: #7C3AED;">
        "Build an autonomous organization of AI agents that do work for me and produce value 24/7."
        </p>
    </div>

    <p><a href="http://172.18.0.3:3000" style="color: #7C3AED;">Try Full Next.js Dashboard</a></p>
</body>
</html>
    `);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const ports = [80, 8080, 4000, 5000, 9000];

function tryPort(portIndex = 0) {
  if (portIndex >= ports.length) {
    console.log('All ports failed');
    process.exit(1);
  }
  
  const port = ports[portIndex];
  
  server.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server running on http://0.0.0.0:${port}`);
    console.log(`✅ Network access: http://172.18.0.3:${port}`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
      console.log(`Port ${port} failed, trying next...`);
      tryPort(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

tryPort();