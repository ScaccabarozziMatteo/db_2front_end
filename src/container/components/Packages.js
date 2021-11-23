import { NavLink } from "react-router-dom";
import "./Packages.css";
import Services from "./Services";

function Packages({packages}) {
    return (
    <ul className="list-group">
    {packages.map((apackage) => (
     <div className="divq">
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
      </div>
    ))}
  </ul>)
  ;
};

export default Packages;