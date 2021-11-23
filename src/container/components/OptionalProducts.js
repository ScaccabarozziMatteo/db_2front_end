import "./OptionalProducts.css";

function OptionalProducts({optionalproducts}) {
    return (
    <ul className="list-group">
    {optionalproducts.map((products) => (
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