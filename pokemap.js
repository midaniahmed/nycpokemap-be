export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Received request for /api/pokemap', new URLSearchParams(req.query).toString());

  try {
    const response = await fetch(
      `https://nycpokemap.com/query2.php?${new URLSearchParams(req.query)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
          Accept: 'application/json',
          Referer: 'https://nycpokemap.com/',
        },
      }
    );

    if (!response.ok) {
      console.error(`Upstream responded with ${response.status}`);
      return res.status(response.status).json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();
    console.log('success length', data?.pokemons?.length);

    return res.status(200).json((data && data.pokemons) || []);
  } catch (err) {
    console.error('Failed to fetch from pokemap:', err.message);
    return res.status(502).json({ error: 'Failed to fetch data from upstream' });
  }
}
