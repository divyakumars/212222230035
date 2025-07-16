import React, { useEffect, useState } from 'react';
import { getStats } from '../services/api';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const URLStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const data = await getStats();
      setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <h2>URL Statistics</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Long URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow key={index}>
              <TableCell><a href={stat.shortUrl} target="_blank" rel="noopener noreferrer">{stat.shortUrl}</a></TableCell>
              <TableCell>{stat.longUrl}</TableCell>
              <TableCell>{stat.clicks}</TableCell>
              <TableCell>{stat.expiryTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default URLStats;
