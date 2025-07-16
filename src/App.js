import React from 'react';
import Container from '@mui/material/Container';
import URLShortener from './components/URLShortener';
import URLStats from './components/URLStats';
import RedirectPage from './components/RedirectPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="md" sx={{ my: 5 }}>
        <h1>URL Shortener with Analytics</h1>
        <Routes>
          <Route path="/" element={
            <>
              <URLShortener />
              <URLStats />
            </>
          } />
          <Route path="/s/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
