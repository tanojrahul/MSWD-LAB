import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';

const ThemeCustomization = () => {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      }
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      }
    }
  });

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Material-UI Theme Customization
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Select Theme:</Typography>
            <RadioGroup
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value)}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light Theme" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark Theme" />
            </RadioGroup>
          </Box>

          <Box sx={{
            p: 2,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Current Theme: {themeMode.toUpperCase()}
            </Typography>
            <Typography variant="body1" paragraph>
              This is a demonstration of Material-UI theme customization. You can easily switch between different themes to see how the application appearance changes.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Primary Color: {currentTheme.palette.primary.main}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Secondary Color: {currentTheme.palette.secondary.main}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }} >
            <Button variant="contained" color="primary">Primary Action</Button>
            <Button variant="contained" color="secondary">Secondary Action</Button>
            <Button variant="outlined">Outlined Button</Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Theme Features</Typography>
          <ul>
            <li>Automatic color adaptation based on theme mode</li>
            <li>Consistent typography across the application</li>
            <li>Easy to switch between themes</li>
            <li>Customizable color schemes</li>
            <li>Professional appearance in both light and dark modes</li>
          </ul>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ThemeCustomization;
