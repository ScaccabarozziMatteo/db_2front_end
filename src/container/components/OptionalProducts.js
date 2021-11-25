import { useEffect } from "react";
import "./OptionalProducts.css";

function OptionalProducts(props) {
    
    //console.log(props.optionalproducts)
    return (
    <ul className="list-group">
    {props.optionalproducts.map((products) => (
     <div className="divs">
     <li
        key={products.id} className="lis" >
        {products.name}
      </li>
      </div>
    ))}
  </ul>)
  ;
};

export default OptionalProducts;