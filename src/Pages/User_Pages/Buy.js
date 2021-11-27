import react from "react";
import HorizontalLinearStepper from "../../container/components/HorizontalStepper";
import Login from "../../container/Login";
import {Alert} from "@mui/material";
import React from "react";

function Buy(props) {

    print();

    function print() {
       // if (localStorage.getItem("username") !== null && localStorage.getItem("username") !== '' && localStorage.getItem("username") !== 'undefined')
            return Logged();
       // else
         //   return pleaseLog()

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
            <div style={{alignItems:'center'}}>
                <HorizontalLinearStepper setOrderId={props.setOrderId} role={props.role} reload={props.reload}/>
            </div>
        )
    }

    return(
        print()
    )
}

export default Buy;