let mockDB = [];

export async function shortenUrls(payload) {
  const results = payload.map((item) => {
    const code = item.shortcode || `mock${Math.floor(Math.random() * 10000)}`;
    const shortUrl = `http://localhost:3000/s/${code}`;
    const expiryTime = `${item.expiry || 10} minutes`;

    const entry = {
      code,
      shortUrl,
      longUrl: item.longUrl,
      clicks: 0,
      expiryTime,
    };

    mockDB.push(entry);
    return entry;
  });

  return Promise.resolve(results);
}

export async function getStats() {
  return Promise.resolve(mockDB);
}
