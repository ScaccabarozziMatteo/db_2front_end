import react from "react";
import HorizontalLinearStepper from "../container/components/HorizontalStepper";
import {Navigate} from "react-router-dom";
import Login from "../container/Login";

function Buy() {

    print();

    function print() {
        if (localStorage.getItem("email") !== null)
            return Logged()
        else
            return pleaseLog()

    }

    function pleaseLog() {
        return(
            <div>
                <Login/>
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