'use client';

import { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
  tableNumber: string;
}

interface User {
  role: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in and get their role
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    
    // Recalculate totals for each order to ensure accuracy
    const ordersWithCorrectTotals = storedOrders.map((order: Order) => ({
      ...order,
      total: order.items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0)
    }));

    // Sort orders by date (newest first)
    ordersWithCorrectTotals.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setOrders(ordersWithCorrectTotals);
    localStorage.setItem('orders', JSON.stringify(ordersWithCorrectTotals));
  }, []);

  const isAdmin = user?.role === 'ROLE_ADMIN';

  const handleViewInvoice = (order: Order) => {
    setSelectedOrder(order);
    setIsInvoiceOpen(true);
  };

  const handleCompleteOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' as const } 
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleCancelOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' as const } 
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const calculateOrderTotal = (order: Order) => {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const Invoice = ({ order }: { order: Order }) => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Invoice #{order.id}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Date: {new Date(order.date).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Table: {order.tableNumber}
      </Typography>
      
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="subtitle1">Total:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1">₹{calculateOrderTotal(order).toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Orders
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push('/menu')}
        >
          Back to Menu
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 4 }}
      >
        <Tab label="Current Orders" />
        <Tab label="Order History" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Table</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter(order => 
                selectedTab === 0 
                  ? order.status === 'pending'
                  : order.status !== 'pending'
              )
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                  <TableCell>{order.tableNumber}</TableCell>
                  <TableCell align="right">₹{calculateOrderTotal(order).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        color: order.status === 'completed' 
                          ? 'success.main' 
                          : order.status === 'cancelled'
                          ? 'error.main'
                          : 'info.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {order.status.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewInvoice(order)}
                      >
                        <ReceiptIcon />
                      </IconButton>
                      {isAdmin && order.status === 'pending' && (
                        <>
                          <Button
                            size="small"
                            color="success"
                            variant="contained"
                            onClick={() => handleCompleteOrder(order.id)}
                          >
                            Complete
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Order Details</Typography>
            <Button onClick={() => setIsInvoiceOpen(false)}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && <Invoice order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
} 