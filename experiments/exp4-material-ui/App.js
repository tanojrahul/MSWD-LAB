import React, { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import TrainReservationForm from './TrainReservationForm';
import ResponsiveNavBar from './ResponsiveNavBar';
import MaterialUIComponents from './MaterialUIComponents';
import ThemeCustomization from './ThemeCustomization';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Exp4App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <ResponsiveNavBar />
      
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="Material-UI experiments"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Train Reservation Form" />
            <Tab label="Responsive NavBar" />
            <Tab label="Common Components" />
            <Tab label="Theme Customization" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <TrainReservationForm />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box>
            <ResponsiveNavBar />
            <Container sx={{ mt: 4 }}>
              <p>Navigation bar demonstrated above. Features include:</p>
              <ul>
                <li>Responsive design (hamburger menu on mobile)</li>
                <li>Notification badge</li>
                <li>User profile dropdown</li>
                <li>Settings icon</li>
              </ul>
            </Container>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <MaterialUIComponents />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <ThemeCustomization />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default Exp4App;
