import react from "react";
import HorizontalLinearStepper from "../../container/components/HorizontalStepper";
import Login from "../../container/Login";
import {Alert} from "@mui/material";
import React from "react";

function Buy() {

    print();

    function print() {
        if (localStorage.getItem("username") !== null && localStorage.getItem("username") !== '')
            return Logged()
        else
            return pleaseLog()

    }

    function pleaseLog() {
        return (
            <div>
                <Alert severity='warning'>In order to buy something, please click on the LOGIN BUTTON in the top-right and enter
                    you credentials.</Alert>
            </div>
        )
    }

    function Logged() {
        return (
            <div>
                <HorizontalLinearStepper/>
            </div>
        )
    }

    return(
        print()
    )
}

export default Buy;