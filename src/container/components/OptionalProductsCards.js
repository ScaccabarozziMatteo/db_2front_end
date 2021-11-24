import { useEffect } from "react";
import "./Packages.css";
import { useState } from "react";

function OptionalProductsCards(props) {

const [selectedProducts,setSelectedProducts] = useState([]);




function clickHandle(product){
  
setSelectedProducts(selectedProducts => [...selectedProducts, product]);
if(JSON.parse(localStorage.getItem("selectedProducts")!=="")){
var sP = JSON.parse(localStorage.getItem("selectedProducts"));
  localStorage.setItem("selectedProducts", JSON.stringify(sP => [...sP,product]));
}
else{
    localStorage.setItem("selectedProducts", JSON.stringify(product));

}
  console.log(selectedProducts);
  console.log(JSON.parse(localStorage.getItem("selectedProducts")));

}


    return (
    <ul className="list-group">

    {
    props.optionalproducts.map((product) => (
     <div className="divq">
     <li
        key={product.id}
        id={product.id}
        className="list-row" activeClassName="active" onClick={()=>clickHandle(product)}
      >
        <div  className="name">
            {product.name.toUpperCase()}
        </div>
</li>
</div>)
)}

</ul>)

}        


export default OptionalProductsCards;