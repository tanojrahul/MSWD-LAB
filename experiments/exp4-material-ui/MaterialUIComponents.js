import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
  Chip,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const MaterialUIComponents = () => {
  const components = [
    { title: 'Card', description: 'Elevated paper container' },
    { title: 'Button', description: 'Interactive button elements' },
    { title: 'TextField', description: 'Text input fields' },
    { title: 'Select', description: 'Dropdown selection' },
    { title: 'Typography', description: 'Text styling' },
    { title: 'Grid', description: 'Layout system' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Common Material-UI Components
      </Typography>

      <Grid container spacing={3}>
        {/* Cards */}
        {components.slice(0, 3).map((comp, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <StarIcon sx={{ color: '#ff9800' }} />
                  <Typography variant="h6">{comp.title}</Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  {comp.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Learn more</Button>
                <Button size="small" startIcon={<FavoriteIcon />}>Like</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Chips */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Chips</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="React" color="primary" variant="outlined" />
              <Chip label="Material-UI" color="secondary" variant="outlined" />
              <Chip label="JavaScript" color="success" variant="outlined" />
              <Chip label="Web Dev" color="warning" variant="outlined" />
            </Box>
          </Paper>
        </Grid>

        {/* List */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6" sx={{ p: 2 }}>Features</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Component-based architecture" secondary="Reusable UI elements" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Responsive design" secondary="Mobile-first approach" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Theme customization" secondary="Easy styling options" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Button Variants</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="error">Error</Button>
              <Button variant="contained" color="warning">Warning</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MaterialUIComponents;
