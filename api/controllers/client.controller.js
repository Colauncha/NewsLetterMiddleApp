import fetch from 'node-fetch';

export default async function clientHandler(req, res) {
  try {
    if (req.headers['x-clientname'] === undefined) {
      return res.status(403).json({ error: 'Not Authorized' });
    }
    const clientIdKey = `${req.headers['x-clientname']}_NEWSLETTER_APP_CLIENT_ID`;
    const clientId = process.env[clientIdKey];
    const baseUrl = process.env.NEWSLETTER_APP_CLIENT_URL;

    const response = await fetch(`${baseUrl}/${clientId}`);
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
