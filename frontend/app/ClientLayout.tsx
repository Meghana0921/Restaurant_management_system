'use client';

import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Check for user data in localStorage whenever the pathname changes
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Only set user if we have valid user data
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }
        } catch (error) {
          setUser(null);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
      }
    };

    checkUserAuth();
  }, [pathname]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleClose();
    router.push('/login');
  };

  return (
    <div className="min-h-full">
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            Plum & Co.
          </Typography>
          <Button color="inherit" onClick={() => router.push('/menu')}>Menu</Button>
          <Button color="inherit" onClick={() => router.push('/orders')}>Orders</Button>
          {user && user.username ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
} 