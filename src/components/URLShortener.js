import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { shortenUrls } from '../services/api';
import { Log } from '../services/Log';

const URLShortener = () => {
  const [urls, setUrls] = useState([{ longUrl: '', expiry: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleShorten = async () => {
    const validUrls = urls.filter(u => u.longUrl.trim() !== '');
    const response = await shortenUrls(validUrls);
    setResults(response);
    Log("handleShorten", "INFO", "URLShortener", `Shortened ${validUrls.length} URL(s)`);
  };

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <h2>Shorten URLs</h2>
      {urls.map((url, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Long URL"
              value={url.longUrl}
              onChange={e => handleChange(i, 'longUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Expiry (min)"
              type="number"
              value={url.expiry}
              onChange={e => handleChange(i, 'expiry', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={url.shortcode}
              onChange={e => handleChange(i, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleShorten}>Shorten</Button>

      {results.length > 0 && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <h3>Shortened Results</h3>
          {results.map((res, i) => (
            <div key={i}>
              <p><strong>Original:</strong> {res.longUrl}</p>
              <p><strong>Short URL:</strong> <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></p>
              <p><strong>Expiry:</strong> {res.expiryTime}</p>
              <hr />
            </div>
          ))}
        </Paper>
      )}
    </Paper>
  );
};

export default URLShortener;
