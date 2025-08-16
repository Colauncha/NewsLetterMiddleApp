import fetch from 'node-fetch';

export default async function SubscriberHandler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const baseUrl = process.env.NEWSLETTER_SUBSCRIBER_URL;

  console.log(req.ip);
  console.log(req.socket?.remoteAddress);
  console.log(req.headers['x-forwarded-for']);

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const skip = (page - 1) * limit;
    const response = await fetch(`${baseUrl}/?skip=${skip}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
