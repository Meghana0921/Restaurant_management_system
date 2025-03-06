'use client';

import { Box, Container, Typography } from '@mui/material';

export default function WelcomePage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="div" gutterBottom sx={{ mb: 1 }}>
          Welcome to
        </Typography>
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Plum & Co.
        </Typography>
        <Typography 
          variant="h5" 
          component="div" 
          color="text.secondary"
          sx={{ 
            fontStyle: 'italic',
            mt: 2,
            '&::before': { content: '"\\201C"' }, // Opening quote
            '&::after': { content: '"\\201D"' },  // Closing quote
          }}
        >
          Sweet, Savory, Simply Plum
        </Typography>
      </Box>
    </Container>
  );
}
