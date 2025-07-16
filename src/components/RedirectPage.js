import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStats } from '../services/api';

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    async function redirectToLongUrl() {
      const all = await getStats();
      const match = all.find(entry => entry.shortUrl.endsWith(shortcode));
      if (match) {
        window.location.href = match.longUrl;
      } else {
        alert("Short URL not found!");
      }
    }
    redirectToLongUrl();
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
