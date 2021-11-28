import React from "react";
import Typography from "@mui/material/Typography";
import {Box, CircularProgress} from "@material-ui/core";

function Loading() {
  return (
    <div
      className="spinner-border text-primary position-absolute top-50 start-50 "
      role="status"
    >
      <Box alignContent={'center'}>
      <Typography style={{margin: '2% 0 0 48%'}} className="visually-hidden">Loading...</Typography>
      <CircularProgress style={{margin: '2% 0 0 50%'}} />
        </Box>
    </div>
  );
};

export default Loading;