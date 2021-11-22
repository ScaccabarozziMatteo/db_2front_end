import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: '',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#800080' : '#800080',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: '',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

  let typeLogin = "user";

class LoginSwitch extends React.Component {

 handleCLick() {
    if (typeLogin === 'user')
      typeLogin = 'employee'
    else
      typeLogin = 'user'
   this.props.handleCallback(typeLogin);
  }

  render() {
    return (
        <FormGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Employee</Typography>
            <FormControlLabel
                control={<MaterialUISwitch sx={{m: 1}} defaultChecked/>}
                label="User"
                onClick={() => this.handleCLick()}
            />
          </Stack>
        </FormGroup>
    );
  }
}
export default LoginSwitch;
