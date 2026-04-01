import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Typography,
  Container,
  Box
} from '@mui/material';

const TrainReservationForm = () => {
  const [formData, setFormData] = useState({
    fromStation: '',
    toStation: '',
    date: '',
    passengers: '1',
    trainClass: 'economy',
    name: '',
    email: '',
    phone: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const stations = ['New Delhi', 'Mumbai Central', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fromStation && formData.toStation && formData.date && formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Train Reservation System
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Journey Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Journey Details</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>From Station</InputLabel>
                <Select
                  name="fromStation"
                  value={formData.fromStation}
                  onChange={handleChange}
                  label="From Station"
                >
                  {stations.map(station => (
                    <MenuItem key={station} value={station}>{station}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>To Station</InputLabel>
                <Select
                  name="toStation"
                  value={formData.toStation}
                  onChange={handleChange}
                  label="To Station"
                >
                  {stations.map(station => (
                    <MenuItem key={station} value={station}>{station}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Travel Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Number of Passengers</InputLabel>
                <Select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  label="Number of Passengers"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Train Class</InputLabel>
                <Select
                  name="trainClass"
                  value={formData.trainClass}
                  onChange={handleChange}
                  label="Train Class"
                >
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="firstclass">First Class</MenuItem>
                  <MenuItem value="ac">AC</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Passenger Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Passenger Details</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Reserve Ticket
                </Button>
                <Button variant="outlined" size="large" onClick={() => setFormData({
                  fromStation: '',
                  toStation: '',
                  date: '',
                  passengers: '1',
                  trainClass: 'economy',
                  name: '',
                  email: '',
                  phone: ''
                })}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {submitted && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#c8e6c9', borderRadius: 1 }}>
            <Typography color="success.main">
              ✓ Reservation submitted successfully! Confirmation email sent to {formData.email}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TrainReservationForm;
