import React from "react";
import {Alert} from "@mui/lab";

const Logout = () => {

    return (
        localStorage.getItem("email") === null || localStorage.getItem("email") === "" ?
            <div>
                <Alert severity='warning'>You already LOGOUT, to LOGIN again please click on "LOGIN" button in the
                    top-right corner!</Alert>
            </div> :
            <div>
                <Alert severity='warning'>In order to LOGOUT, please click on your name in the top-right corner!</Alert>
            </div>
    )
}

export default Logout;