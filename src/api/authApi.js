const TOKEN_ENDPOINT = 'https://api2.datapel.net/api.datapel/v2.0/token';

export const getToken = async (apiKey, apiSecret) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'grant_type': 'password',
        'password': apiSecret,
        'scope': 'pub',
        'username': apiKey
      },
      body: JSON.stringify({}) // Empty payload since all params are in headers
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
}; 