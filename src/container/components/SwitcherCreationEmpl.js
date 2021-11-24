import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CreatePackage from "../components/CreatePackage";
import CreateOptProduct from "../components/CreateOptProduct";
import CreateService from "../components/CreateService";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

function SwitcherCreationEmpl() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
      <div style={{margin: '20px 0 0 0'}} align={'center'}>
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '90%',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Create service" {...a11yProps(0)} />
          <Tab label="Create package" {...a11yProps(1)} />
          <Tab label="Create optional product" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CreateService />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CreatePackage />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CreateOptProduct/>
        </TabPanel>
      </SwipeableViews>
    </Box>
        </div>
  );
} export default SwitcherCreationEmpl;