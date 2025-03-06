'use client';

import { Grid, Card, CardContent, Typography, Button, Stack, Box, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';

export default function AnalyticsPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
      </Grid>

      {/* Key Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                $12,345
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <TrendingUpIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  +15%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary">
              vs. Last Month
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Orders
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                256
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <TrendingUpIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  +8%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary">
              vs. Last Month
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Order Value
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                $48.25
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                <TrendingDownIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  -3%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary">
              vs. Last Month
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Customer Satisfaction
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                4.8
              </Typography>
              <StarIcon sx={{ color: 'warning.main' }} />
            </Box>
            <Typography variant="body2" color="textSecondary">
              Based on 128 reviews
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Popular Items */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Popular Items
            </Typography>
            <Stack spacing={2}>
              {[
                { name: 'Classic Burger', orders: 142, percentage: 85 },
                { name: 'Caesar Salad', orders: 98, percentage: 65 },
                { name: 'Margherita Pizza', orders: 87, percentage: 58 },
              ].map((item) => (
                <Box key={item.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.orders} orders</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.percentage}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Peak Hours */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Peak Hours
            </Typography>
            <Stack spacing={2}>
              {[
                { time: '12:00 PM - 2:00 PM', percentage: 32 },
                { time: '6:00 PM - 8:00 PM', percentage: 28 },
                { time: '8:00 PM - 10:00 PM', percentage: 24 },
              ].map((slot) => (
                <Box key={slot.time}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{slot.time}</Typography>
                    <Typography>{slot.percentage}% of orders</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={slot.percentage * 2}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                >
                  Download Report
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  fullWidth
                >
                  Detailed Analytics
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
} 