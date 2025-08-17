import fetch from 'node-fetch';

export default async function CreateSubscriberHandler(req, res) {
  const baseUrl = process.env.NEWSLETTER_SUBSCRIBER_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(baseUrl + '/', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(`Error: ${response.status} - ${error}`);
      throw new Error(error.detail);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
