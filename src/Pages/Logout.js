import React from "react";

const Logout = () =>{
    
    return (
    localStorage.getItem("email")===null || localStorage.getItem("email")==="" ?
    <div>
    YOU ALREADY LOGOUT, TO LOG IN AGAIN CLICK ON "LOGIN " IN THE TOP-RIGHT CORNER!
    </div>:
        <div>
        IN ORDER TO LOGOUT, JUST CLICK ON YOUR NAME IN THE TOP-RIGHT CORNER.
    </div>
    )
}

export default Logout;