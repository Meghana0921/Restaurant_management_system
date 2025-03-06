'use client';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  InputAdornment,
  MenuItem,
  Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaletteIcon from '@mui/icons-material/Palette';
import NotificationsIcon from '@mui/icons-material/Notifications';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SettingsPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
      </Grid>

      {/* Restaurant Profile */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Restaurant Profile
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Restaurant Name"
                defaultValue="Culinary Command"
              />
              <TextField
                fullWidth
                label="Contact Number"
                defaultValue="+1 (555) 123-4567"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                defaultValue="contact@culinarycommand.com"
              />
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                defaultValue="123 Restaurant Street, Foodville, FC 12345"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                defaultValue="A modern restaurant offering delicious cuisine in a comfortable atmosphere."
              />
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
              >
                Save Profile
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Operating Hours */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Operating Hours
              </Typography>
            </Box>
            <Stack spacing={2}>
              {daysOfWeek.map((day) => (
                <Box key={day} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ minWidth: 100 }}>{day}</Typography>
                  <TextField
                    size="small"
                    type="time"
                    defaultValue="09:00"
                    sx={{ width: 120 }}
                  />
                  <Typography sx={{ mx: 1 }}>to</Typography>
                  <TextField
                    size="small"
                    type="time"
                    defaultValue="22:00"
                    sx={{ width: 120 }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Open"
                    sx={{ ml: 2 }}
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Hours
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Quick Settings
              </Typography>
            </Box>
            <Stack spacing={2}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Online Ordering"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Accept Table Reservations"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Send Order Notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Customer Reviews"
              />
              <FormControlLabel
                control={<Switch />}
                label="Maintenance Mode"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Theme Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaletteIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Theme Settings
              </Typography>
            </Box>
            <Stack spacing={3}>
              <TextField
                select
                fullWidth
                label="Primary Color"
                defaultValue="blue"
              >
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="purple">Purple</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="red">Red</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Font Size"
                defaultValue="medium"
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </TextField>
              <Button
                variant="contained"
                startIcon={<PaletteIcon />}
                fullWidth
              >
                Apply Theme
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
} 