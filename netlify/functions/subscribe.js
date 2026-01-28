const https = require('https');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' })
      };
    }

    console.log('Attempting to subscribe:', email);

    // Make request to Buttondown API
    const result = await new Promise((resolve, reject) => {
      const data = JSON.stringify({
        email: email,
        tags: ['dadlifts-waitlist']
      });

      const options = {
        hostname: 'api.buttondown.email',
        path: '/v1/subscribers',
        method: 'POST',
        headers: {
          'Authorization': 'Token 66c0dbc7-22ae-4cee-a174-8245052034d8',
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          console.log('Buttondown response status:', res.statusCode);
          console.log('Buttondown response body:', body);
          
          try {
            const parsed = JSON.parse(body);
            resolve({ statusCode: res.statusCode, data: parsed });
          } catch (e) {
            resolve({ statusCode: res.statusCode, data: body });
          }
        });
      });

      req.on('error', (e) => {
        console.error('Request error:', e);
        reject(e);
      });
      
      req.write(data);
      req.end();
    });

    console.log('Result:', JSON.stringify(result));

    if (result.statusCode === 201 || result.statusCode === 200) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Subscribed successfully' })
      };
    } else if (result.data.email && Array.isArray(result.data.email) && result.data.email[0] && result.data.email[0].includes('already subscribed')) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Already subscribed' })
      };
    } else {
      // Return detailed error info
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Subscription failed', 
          buttondownStatus: result.statusCode,
          buttondownResponse: result.data 
        })
      };
    }
  } catch (error) {
    console.error('Subscribe error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to subscribe', details: error.message })
    };
  }
};
