import fetch from 'node-fetch';

export default async function ECSVHandler(req, res) {
  const { campaignType, emailExtension, activeOnly, useStream } = req.query;
  const baseUrl = process.env.NEWSLETTER_SUBSCRIBER_URL;
  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    let exportUrl;
    if (useStream === 'true') {
      exportUrl = `${baseUrl}/campaigns/export/csv/stream`;
    } else if (campaignType) {
      exportUrl = `${baseUrl}/campaigns/export/csv/by-campaign/${campaignType}`;
    } else {
      const params = new URLSearchParams({
        skip: '0',
        limit: 'None',
        email_filter: emailExtension || '',
        active_only: activeOnly || 'true',
      });
      exportUrl = `${baseUrl}/campaigns/export/csv?${params}`;
    }

    const response = await fetch(exportUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=subscribers.csv'
    );
    res.setHeader('Content-Type', 'text/csv');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
