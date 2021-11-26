import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { PinDropSharp } from "@mui/icons-material";
import Login from "../Login";
import SignUpUser from "../SignUpUser";

const FinalStepButton =(props)=>{
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("email")!=="" && localStorage.getItem("email")!==null);

    return(
        isLoggedIn?
        <Button  variant="contained" endIcon={<SendIcon />} onClick={props.handleConfirm}>
            BUY
        </Button>
        :
    <div className="flexdiv">
    <Login variant="contained" url="" role={props.role} reload = {props.reload} onLogChange={setIsLoggedIn}/>
    <SignUpUser/>
    </div>

    )


}

export default FinalStepButton;