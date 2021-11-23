import "./OptionalProducts.css";

function OptionalProducts({optionalproducts}) {
    return (
    <ul className="list-group">
    {optionalproducts.map((products) => (
     <div className="divq">
     <li
        key={products.id}
        className="list-row"
      >
        <NavLink to="/pay" className="name">
            {apackage.name.toUpperCase()}
        </NavLink>
        <div className="list-title" > Serivces:</div>
        <Services services={apackage.services}/>
        <div className="list-title" > Included-product:</div>
        <ul >
            <li className="innerlist">
            products here
            ok\
            </li>
            
        </ul>
      </li>
      </div>
    ))}
  </ul>)
  ;
};

export default Packages;