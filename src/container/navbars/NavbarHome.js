import React from 'react'
import {Divider, Grid, Stack} from "@mui/material";
import Login from "../Login";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

    const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


class NavbarHome extends React.Component {

    render() {
        return (

            <React.Fragment>
                <Stack divider={<Divider orientation="vertical" flexItem />}
                       direction="row" spacing={3} alignItems="center" alignContent="center">
                    <Login/>
                    <Item>Ciao</Item>
                </Stack>

            </React.Fragment>
        )
    }
};

export default NavbarHome;