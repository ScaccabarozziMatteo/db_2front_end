import React, { useEffect } from "react";
import Packages from "./Packages";
import OptionalProductsCards from "./OptionalProductsCards";
import OptionalProducts from "./OptionalProducts";
import { useState } from "react";
import "./Riepilogo.css";

const Riepilogo =(props)=>{

    const [validity,setValidity] = useState(12);
    const[products,setProducts] = useState([]);
    const [tot,setTot]=useState();
    useEffect(()=>{
        console.log(localStorage.getItem("date").toString().slice(0,15));
        if(localStorage.getItem("optionalProducts")!==" " && localStorage.getItem("optionalProducts")!=="undefined" && localStorage.getItem("optionalProducts")!==null && localStorage.getItem("optionalProducts")!=='null'){
            setProducts(JSON.parse(localStorage.getItem("optionalProducts")));        
        }
    },[]
)

useEffect(()=>{

    total();
}

)

function handleInputChange(event){
    if(event.target.value<0)
    {
        setValidity(0);
        localStorage.setItem("validity",0);
        total();
        //console.log(localStorage.getItem("validity"));
    }
    else{
        setValidity(event.target.value);
        localStorage.setItem("validity",event.target.value);
        total();
       // console.log(localStorage.getItem("validity"));
    }
    //console.log("tot");
}

function total(){
   const x =localStorage.getItem("validity");
   var fee;
    switch(true){
        default :
            fee= JSON.parse(localStorage.getItem("selectedPackage")).fee12;
            break;
        case x<24:
            fee= JSON.parse(localStorage.getItem("selectedPackage")).fee12;
            break;
        case x<36:
            fee= JSON.parse(localStorage.getItem("selectedPackage")).fee24;
            break;
        case x>35:
            fee= JSON.parse(localStorage.getItem("selectedPackage")).fee36;
            break;
    }
    
    var sP = JSON.parse(localStorage.getItem("optionalProducts"));
    var somma=0;
    for(var i=0; i<sP.length;i ++){
        somma += sP[i].monthly_fee;
    }
    //console.log(somma);
    //console.log((somma + fee)*validity);
    //console.log((somma + fee)*x);
    setTot(((somma + fee)*validity).toFixed(2));
    }


return (

    <div className="container">
        <div>
    <div className="title">
        SELECTED PACKAGE:
    </div>
    {JSON.parse(localStorage.getItem("selectedPackage")).name.toUpperCase()}
       <div>
   </div>
    <div className="title">
        ADDITIONAL PRODUCTS:
    </div>
    <OptionalProducts optionalproducts={products} />
    </div>

    <div className="title">
        STARTING FROM: <div className="container">{localStorage.getItem("date").toString().slice(0,15)}</div>
    </div>
    <div className="putflex">
    <div className="title">
        FOR     <input value={validity} type="number" onChange={handleInputChange} /> MONTHS
    </div>
    <div className="total">
        TOTAL: € {tot}
    </div>
    </div>
    </div>
);

}

export default Riepilogo;