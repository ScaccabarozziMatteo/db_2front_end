import { NavLink } from "react-router-dom";
import "./Packages.css";
import Services from "./Services";

const Packages =({packages})=>{
    return (    
    <ul className="list-group">
    {packages.map((apackage) => (
      <li
        key={apackage.id}
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
    ))}
  </ul>)
  ;
};

export default Packages;