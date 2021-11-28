import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { PinDropSharp } from "@mui/icons-material";
import Login from "../Login";
import SignUpUser from "../SignUpUser";

const FinalStepButton =(props)=>{
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("email")!=="" && localStorage.getItem("email")!==null);
    const [validity,setValidity] = useState(props.validity!==null ? parseInt(props.validity): 0);
console.log(props.validity==='0');
console.log("up");

useEffect(()=>{
    setValidity(parseInt(props.validity));
},[props.validity])

    return(
        isLoggedIn?
        
            <div>
                {
        validity <= 0 || props.package===""?
        <Button  variant="contained" disabled endIcon={<SendIcon />}>
        BUY
       </Button>
        :
        <Button  variant="contained"  endIcon={<SendIcon />} onClick={props.handleConfirm}>
            BUY
        </Button>
              }
              </div>
        :
    <div className="flexdiv">
    <Login checkInsolvent={props.checkInsolvent} setCheckInsolvent={props.setCheckInsolvent} variant="contained"  url="" role={props.role} reload = {props.reload} onLogChange={setIsLoggedIn}/>
    <SignUpUser/>
    </div>

    )


}

export default FinalStepButton;