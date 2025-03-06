'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { User, UserPermissions, getRolePermissions } from '../types/User';

// Mock active orders for demonstration
interface Order {
  id: string;
  table: number;
  items: { name: string; quantity: number; }[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    table: 5,
    items: [
      { name: 'Butter Chicken', quantity: 2 },
      { name: 'Naan', quantity: 4 }
    ],
    status: 'pending',
    timestamp: new Date().toISOString()
  },
  // Add more mock orders as needed
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    // TODO: Fetch actual user data from API/localStorage
    const mockUser: User = {
      id: '1',
      username: 'staff1',
      role: 'waiter',
      name: 'John Doe',
      email: 'john@example.com'
    };
    setUser(mockUser);
    setPermissions(getRolePermissions(mockUser.role!));
  }, []);

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setActiveOrders(orders => 
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  if (!user || !permissions) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5">Welcome, {user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Staff'}
              </Typography>
            </Box>
            <Chip label={`Active Orders: ${activeOrders.length}`} color="primary" />
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <List>
              {permissions.canTakeOrders && (
                <ListItem>
                  <Button fullWidth variant="contained" color="primary" href="/menu">
                    Take New Order
                  </Button>
                </ListItem>
              )}
              {permissions.canManageMenu && (
                <ListItem>
                  <Button fullWidth variant="outlined" href="/menu/manage">
                    Manage Menu
                  </Button>
                </ListItem>
              )}
              {permissions.canViewAnalytics && (
                <ListItem>
                  <Button fullWidth variant="outlined" href="/analytics">
                    View Reports
                  </Button>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Active Orders */}
        {permissions.canViewOrders && (
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Active Orders</Typography>
              <Grid container spacing={2}>
                {activeOrders.map((order) => (
                  <Grid item xs={12} sm={6} key={order.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Table {order.table}</Typography>
                        <Typography color="text.secondary" gutterBottom>
                          Order #{order.id}
                        </Typography>
                        <List dense>
                          {order.items.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText 
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Chip 
                          label={order.status.toUpperCase()} 
                          color={
                            order.status === 'ready' ? 'success' :
                            order.status === 'preparing' ? 'warning' :
                            'default'
                          }
                        />
                      </CardContent>
                      {permissions.canUpdateOrderStatus && (
                        <CardActions>
                          {order.status === 'pending' && (
                            <Button 
                              size="small" 
                              onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                            >
                              Start Preparing
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button 
                              size="small" 
                              onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                            >
                              Mark Ready
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button 
                              size="small" 
                              onClick={() => handleUpdateOrderStatus(order.id, 'served')}
                            >
                              Mark Served
                            </Button>
                          )}
                        </CardActions>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
} 