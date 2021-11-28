import React, {useEffect} from "react";
import Packages from "./Packages";
import OptionalProductsCards from "./OptionalProductsCards";
import OptionalProducts from "./OptionalProducts";
import {useState} from "react";
import "./Riepilogo.css";
import {Input} from "@material-ui/core";

const Riepilogo = (props) => {

    const [validity, setValidity] = useState(props.validity);
    const [products, setProducts] = useState([]);
    let _validity = 0;
    const [tot, setTot] = useState();
    useEffect(() => {
            //console.log(localStorage.getItem("date").toString().slice(0,15));
            if (props.optionalProducts !== " " && props.optionalProducts !== "undefined" && props.optionalProducts !== null && props.optionalProducts !== 'null') {
                setProducts(props.optionalProducts);
            }
        }, []
    )

    useEffect(() => {

            total(localStorage.getItem("validity"));
        }
        , [validity]
    )


    function handleInputChange(event) {
        if (event.target.value < 0) {
            _validity = 0;
            setValidity(0);
            localStorage.setItem("validity", 0);
            total(localStorage.getItem("validity"));
            props.setValidity!==null? props.setValidity(0): null;
            //console.log(props.validity);
        } else {
            setValidity(Math.round(event.target.value));
            _validity = Math.round(event.target.value);
            localStorage.setItem("validity", Math.round(event.target.value));
            props.setValidity!==null? props.setValidity(Math.round(event.target.value)): null;
            total(localStorage.getItem("validity"));
            // console.log(props.validity);
        }
        //console.log("tot");
    }

    function total(val) {
        if(props.selectedPackage!==null){
        const x = val;
        console.log(x);
        let fee;
        switch (true) {
            case x < 24:
                fee = props.selectedPackage.fee12;
                break;
            case x < 36:
                fee = props.selectedPackage.fee24;
                break;
            case x > 35:
                fee = props.selectedPackage.fee36;
                break;
        }

        console.log(fee);
        let sP = (props.optionalProducts);
        let somma = 0;
        for (let i = 0; i < sP.length; i++) {
            somma += sP[i].monthly_fee;
        }
        //console.log(somma);
        //console.log((somma + fee)*validity);
        //console.log((somma + fee)*x);
        setTot(((somma + fee) * validity).toFixed(2));}
        else{
        setTot(0);
        }
    }


    return (

        <div className="container">
            <div>
                <div className="title">
                    SELECTED PACKAGE:
                </div>
                {props.selectedPackage!==null ? props.selectedPackage.name.toUpperCase() : "PURCHASE A PACKAGE TO CONFIRM YOUR ORDER!"}
                <div>
                </div>
                <div className="title">
                    ADDITIONAL PRODUCTS:
                </div>
                <OptionalProducts optionalproducts={products}/>
            </div>

            <div className="title">
                STARTING FROM: <div className="container">{props.date}</div>
            </div>
            <div className="putflex">
                <div className="title">
                    FOR {

                    props.fix === true ?
                        <div>
                            {validity}
                        </div>
                        :
                        <Input value={validity} type="number" variant="outlined" onChange={handleInputChange}/>

                } MONTHS
                </div>
                <div className="total">
                    TOTAL: € {tot}
                </div>
            </div>
        </div>
    );

}

export default Riepilogo;