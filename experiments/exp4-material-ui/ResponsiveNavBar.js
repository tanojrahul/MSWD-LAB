import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Badge,
  Avatar,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const ResponsiveNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            My App
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 3 }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Contact</Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <Button
              color="inherit"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
              <MenuItem onClick={handleMenuClose}>Services</MenuItem>
              <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
            </Menu>
          </Box>

          <Badge badgeContent={3} color="error" sx={{ mr: 2 }}>
            <Button color="inherit">
              <NotificationsIcon />
            </Button>
          </Badge>

          <Button color="inherit" sx={{ mr: 1 }}>
            <SettingsIcon />
          </Button>

          <Button color="inherit" onClick={handleUserMenuClick}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff7043' }}>JD</Avatar>
          </Button>

          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveNavBar;
