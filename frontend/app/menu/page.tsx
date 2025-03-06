'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Button, 
  Tabs, 
  Tab, 
  Badge, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export default function MenuPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        console.log('Fetched menu items:', data);
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleViewCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      const menuItem = menuItems.find(item => item.id === cartItem.id);
      return total + (menuItem?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const cartItems = cart.map(cartItem => {
        const menuItem = menuItems.find(item => item.id === cartItem.id);
        return {
          id: cartItem.id,
          name: menuItem?.name || '',
          quantity: cartItem.quantity,
          price: menuItem?.price || 0
        };
      });

      const orderTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const order = {
        items: cartItems,
        total: orderTotal,
        status: 'pending',
        date: new Date().toISOString(),
        tableNumber: 'T1'
      };

      // Store the order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        ...order,
        id: `ORD${String(existingOrders.length + 1).padStart(3, '0')}`
      };

      // Clear any existing orders with the same ID to avoid duplicates
      const filteredOrders = existingOrders.filter(order => order.id !== newOrder.id);
      
      localStorage.setItem('orders', JSON.stringify([...filteredOrders, newOrder]));

      // Clear the cart
      setCart([]);
      localStorage.removeItem('cart');

      // Close the cart dialog if it's open
      setIsCartOpen(false);

      // Redirect to orders page
      router.push('/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to process checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Our Menu
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={handleViewCart}
          >
            View Cart
          </Button>
          {getTotalItems() > 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              Checkout
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Typography>Loading menu items...</Typography>
      ) : menuItems.length === 0 ? (
        <Typography>No menu items available.</Typography>
      ) : (
        <>
          <Tabs
            value={selectedCategory}
            onChange={(_, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {categories.map(category => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>

          <Grid container spacing={4}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {item.imageUrl && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.imageUrl}
                      alt={item.name}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      ₹{item.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => handleAddToCart(item.id)}
                    >
                      Add to Order
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Cart Dialog */}
      <Dialog
        open={isCartOpen}
        onClose={handleCloseCart}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Your Cart</Typography>
            <Button onClick={handleCloseCart}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography>Your cart is empty</Typography>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((cartItem) => {
                    const menuItem = menuItems.find(item => item.id === cartItem.id);
                    if (!menuItem) return null;
                    return (
                      <TableRow key={cartItem.id}>
                        <TableCell>{menuItem.name}</TableCell>
                        <TableCell align="right">₹{menuItem.price}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Button
                              size="small"
                              onClick={() => handleUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                            >
                              -
                            </Button>
                            {cartItem.quantity}
                            <Button
                              size="small"
                              onClick={() => handleUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                            >
                              +
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          ₹{(menuItem.price * cartItem.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveFromCart(cartItem.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle1">Total:</Typography>
                    </TableCell>
                    <TableCell align="right" colSpan={2}>
                      <Typography variant="subtitle1">₹{calculateTotal().toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleCloseCart}>Continue Shopping</Button>
          {cart.length > 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              Proceed to Checkout
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
} 