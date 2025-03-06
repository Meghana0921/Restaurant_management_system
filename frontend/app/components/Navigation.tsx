'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
            Plum & Co.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button 
              color="inherit" 
              onClick={() => router.push('/menu')}
              sx={{ 
                minWidth: '120px',
                fontSize: '1.1rem',
                fontWeight: pathname === '/menu' ? 'bold' : 'normal',
                borderBottom: pathname === '/menu' ? '2px solid white' : 'none'
              }}
            >
              Menu
            </Button>
            <Button 
              color="inherit" 
              onClick={() => router.push('/orders')}
              sx={{ 
                minWidth: '120px',
                fontSize: '1.1rem',
                fontWeight: pathname === '/orders' ? 'bold' : 'normal',
                borderBottom: pathname === '/orders' ? '2px solid white' : 'none'
              }}
            >
              Orders
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 