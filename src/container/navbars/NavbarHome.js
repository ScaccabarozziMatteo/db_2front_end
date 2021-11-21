import React from 'react'
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import LoginUser from "../LoginUser";
import LoginEmployee from "../LoginEmployee";

class NavbarHome extends React.Component {

    render() {
        return (

            <React.Fragment>
                <Box sx={{
                    flexGrow: 1
                }
                }>
                    <Grid item xs={15}>
                        <Grid item xs={6}>
                            <LoginEmployee/>
                        </Grid>
                        <Grid item xs={9}>
                            <LoginUser/>
                        </Grid>
                    </Grid>
                </Box>
            </React.Fragment>
        )
    }
};

export default NavbarHome;