'use client';

import { Grid, Card, CardContent, Typography, Button, Box, Chip, Stack } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import HistoryIcon from '@mui/icons-material/History';

const orders = [
  { id: '#1234', status: 'In Progress', table: 5, items: 3, total: 45.99 },
  { id: '#1235', status: 'Ready', table: 3, items: 2, total: 27.50 },
  { id: '#1236', status: 'Completed', table: 7, items: 4, total: 68.75 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress': return 'warning';
    case 'Ready': return 'success';
    case 'Completed': return 'info';
    default: return 'default';
  }
};

export default function OrdersPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Today's Orders</Typography>
            <Typography variant="h4">24</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Completed</Typography>
            <Typography variant="h4">18</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>In Progress</Typography>
            <Typography variant="h4">6</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Total Revenue</Typography>
            <Typography variant="h4">$892.50</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Active Orders */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Active Orders
            </Typography>
            <Stack spacing={2}>
              {orders.map((order) => (
                <Box key={order.id} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1">{order.id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status) as any}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>Table {order.table}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{order.items} items</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>${order.total}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<RestaurantIcon />}
                fullWidth
              >
                New Order
              </Button>
              <Button
                variant="outlined"
                startIcon={<TableRestaurantIcon />}
                fullWidth
              >
                View Tables
              </Button>
              <Button
                variant="outlined"
                startIcon={<KitchenIcon />}
                fullWidth
              >
                Kitchen Display
              </Button>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                fullWidth
              >
                Order History
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
} 