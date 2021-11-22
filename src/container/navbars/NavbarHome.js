import React from 'react'
import {Divider, Stack} from "@mui/material";
import Login from "../Login";
import SignUpUser from "../SignUpUser";


class NavbarHome extends React.Component {

    render() {
        return (

            <React.Fragment>
                <Stack divider={<Divider orientation="vertical" flexItem />}
                       direction="row" spacing={3} alignItems="center" alignContent="center">
                    <Login/>
                    <SignUpUser />
                </Stack>

            </React.Fragment>
        )
    }
}

export default NavbarHome;