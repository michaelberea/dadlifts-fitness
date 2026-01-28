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

    // Call Buttondown API
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Token 66c0dbc7-22ae-4cee-a174-8245052034d8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        tags: ['dadlifts-waitlist']
      })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Subscribed successfully' })
      };
    } else {
      // Check if already subscribed
      if (data.email && data.email[0] && data.email[0].includes('already subscribed')) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, message: 'Already subscribed' })
        };
      }
      
      throw new Error('Subscription failed');
    }
  } catch (error) {
    console.error('Subscribe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to subscribe' })
    };
  }
};
