'use client';

import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role: string;
  name?: string;
  email?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mr: 3
            }}
          >
            {user.username[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.role.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <List>
          <ListItem>
            <ListItemText
              primary="Username"
              secondary={user.username}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Role"
              secondary={user.role}
            />
          </ListItem>
          {user.name && (
            <ListItem>
              <ListItemText
                primary="Name"
                secondary={user.name}
              />
            </ListItem>
          )}
          {user.email && (
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={user.email}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
} 