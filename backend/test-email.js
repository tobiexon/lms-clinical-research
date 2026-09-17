/**
 * Quick Mailtrap email test
 * Run from Git Bash: node test-email.js
 */

const https = require('https');

const TOKEN = 'b2841300bb95469ec5e3d76c42772cc3';
const SANDBOX_ID = '3474710';
const TO_EMAIL = 'thaddeus_obi@yahoo.com';

const body = JSON.stringify({
  from: {
    email: 'info@clinicalresearchnexus.co.uk',
    name: 'Clinical Research Nexus',
  },
  to: [{ email: TO_EMAIL }],
  subject: '✅ Test Email — LMS Email System Working',
  html: `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:32px">
      <h1 style="color:#055d69">It Works! 🎉</h1>
      <p>Your Mailtrap sandbox integration is configured correctly.</p>
      <p><strong>Token:</strong> ...${TOKEN.slice(-6)}</p>
      <p><strong>Sandbox ID:</strong> ${SANDBOX_ID}</p>
      <p style="color:#888;font-size:12px">Sent at: ${new Date().toISOString()}</p>
    </div>
  `,
});

const options = {
  hostname: 'sandbox.api.mailtrap.io',
  port: 443,
  path: `/api/send/${SANDBOX_ID}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': TOKEN,
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log(`\nSending test email to: ${TO_EMAIL}`);
console.log(`Sandbox: ${SANDBOX_ID}`);
console.log('Connecting to sandbox.api.mailtrap.io...\n');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    try {
      const parsed = JSON.parse(data);
      if (parsed.success) {
        console.log('✅ SUCCESS! Email sent.');
        console.log('Message ID:', parsed.message_ids?.[0]);
        console.log('\nCheck your Mailtrap inbox at:');
        console.log(`https://mailtrap.io/sandboxes/${SANDBOX_ID}/inbox`);
      } else {
        console.log('❌ FAILED:', JSON.stringify(parsed, null, 2));
      }
    } catch {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Connection error:', e.message);
});

req.setTimeout(10000, () => {
  console.error('❌ Request timed out after 10s');
  req.destroy();
});

req.write(body);
req.end();
