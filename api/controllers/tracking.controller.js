import fetch from 'node-fetch';

async function AddVisitor(req, res) {
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(baseUrl + '/visitors', {
      method: 'POST',
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

async function VisitorsCount(req, res) {
  //   const page = parseInt(req.query.page, 10) || 1;
  //   const limit = parseInt(req.query.limit, 10) || 20;
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(`${baseUrl}/visitors/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function UniqueVisitorsCount(req, res) {
  const startDate = req.query.page;
  const endDate = req.query.startDate;
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const params = new URLSearchParams({
      startDate: encodeURIComponent(startDate),
      endDate: encodeURIComponent(endDate),
    });
    const response = await fetch(
      `${baseUrl}/visitors/unique/count?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function UniqueVisitors(req, res) {
  const startDate = req.query.page;
  const endDate = req.query.startDate;
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const params = new URLSearchParams({
      startDate: encodeURIComponent(startDate),
      endDate: encodeURIComponent(endDate),
    });
    const response = await fetch(
      `${baseUrl}/visitors/unique?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function AddNUVisitor(req, res) {
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(baseUrl + '/nu/visitors', {
      method: 'POST',
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

async function NUVisitorsCount(req, res) {
  //   const page = parseInt(req.query.page, 10) || 1;
  //   const limit = parseInt(req.query.limit, 10) || 20;
  const baseUrl = process.env.TRACKING_APP_URL;

  if (req.headers['x-clientname'] === undefined) {
    return res.status(403).json({ error: 'Not Authorized' });
  }
  const tokenKey = `${req.headers['x-clientname']}_NEWS_LETTER_TOKEN`;
  const token = process.env[tokenKey];

  try {
    const response = await fetch(`${baseUrl}/nu/visitors/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export {
  AddVisitor,
  VisitorsCount,
  UniqueVisitorsCount,
  UniqueVisitors,
  NUVisitorsCount,
  AddNUVisitor,
};
