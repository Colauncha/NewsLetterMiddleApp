import fetch from 'node-fetch';

export default async function RenewTokenhandler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const baseUrl = process.env.NEWSLETTER_APP_CLIENT_URL;
  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(`${baseUrl}/refresh-token`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
