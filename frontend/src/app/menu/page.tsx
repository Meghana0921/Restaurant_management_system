'use client';

import { Grid, Card, CardContent, Typography, TextField, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function MenuPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Menu Management
        </Typography>
      </Grid>

      {/* Add New Item Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add New Item
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Item Name"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category"
                margin="normal"
                required
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Add Item
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Categories Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Main Course" secondary="12 items" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Appetizers" secondary="8 items" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Desserts" secondary="6 items" />
              </ListItem>
            </List>
            <Button
              variant="outlined"
              startIcon={<CategoryIcon />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Manage Categories
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth>
                  Import Menu
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth>
                  Export Menu
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth>
                  Print Menu
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<AnalyticsIcon />}
                  fullWidth
                >
                  Menu Analytics
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
} 