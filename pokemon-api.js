import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/pokemap', async (req, res) => {
  console.log('Received request for /api/pokemap', new URLSearchParams(req.query).toString());
  try {
    const response = await fetch(`https://nycpokemap.com/query2.php?${new URLSearchParams(req.query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        Accept: 'application/json',
        Referer: 'https://nycpokemap.com/',
      },
    });

    if (!response.ok) {
      console.error(`Upstream responded with ${response.status}`);
      return res.status(response.status).json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();

    console.log('success length', data?.pokemons?.length);

    res.send((data && data.pokemons) || []);
  } catch (err) {
    console.error('Failed to fetch from pokemap:', err.message);
    res.status(502).json({ error: 'Failed to fetch data from upstream' });
  }
});

app.listen(3001);
