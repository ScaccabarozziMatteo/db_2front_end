import React from 'react';
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";

const indexNavbar = () => {


  return (
    <React.Fragment>
      <Box sx={{flexGrow: 1}}>
        <Grid>
          <Grid item xs={6}>
            <h1>CIAO</h1>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
};

export default indexNavbar;