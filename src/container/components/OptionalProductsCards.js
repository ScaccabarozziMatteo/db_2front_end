import { useEffect } from "react";
import "./Packages.css";
import { useState } from "react";
import { ConstructionOutlined } from "@mui/icons-material";

function OptionalProductsCards(props) {

const [optionalProducts,setoptionalProducts] = useState([]);

function fin(sP, product){
    for( var i = 0; i < sP.length; i++){
        if(sP[i].id===product.id){
            return i;
        }
    }
    return -1;
}

function clickHandle(product){
setoptionalProducts(optionalProducts => [...optionalProducts, product]);


if(localStorage.getItem("optionalProducts")!==" " && localStorage.getItem("optionalProducts")!=="undefined" && localStorage.getItem("optionalProducts")!==null && localStorage.getItem("optionalProducts")!=='null'){
    var sP = JSON.parse(localStorage.getItem("optionalProducts"));
    var i =fin(sP,product);
    console.log(i);
    i>(-1)? sP.splice(i,1) : sP.push(product);
  localStorage.setItem("optionalProducts", JSON.stringify(sP) );

}
else{
    var sP=[];
    sP.push(product);
    localStorage.setItem("optionalProducts", JSON.stringify(sP));
}

props.reload(JSON.parse(localStorage.getItem("optionalProducts")));
//console.log(props.it);
//console.log(JSON.parse(localStorage.getItem("optionalProducts")));
}


    return (
    <ul className="list-group">

    {
    props.optionalproducts.map((product) => (
     <div className="divq" key={product.id}>
     <li
        key={product.id}
        id={product.id}
        className="list-row" activeClassName="active" onClick={()=>clickHandle(product)}
      >
        <div  className="name">
            {product.name.toUpperCase()}
        </div>
        <div className="name">
            {product.monthly_fee}€/month
        </div>
</li>
</div>)
)}

</ul>)

}        


export default OptionalProductsCards;