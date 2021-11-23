import { NavLink } from "react-router-dom";
import "./Packages.css";
import Services from "./Services";
import OptionalProducts from "./OptionalProducts";

function Packages({packages}) {
    return (
    <ul className="list-group">
    {packages.map((apackage) => (
     <div className="divq">
     <li
        key={apackage.id}
        className="list-row" activeClassName="active" onClick={this.click}
      >
        <NavLink to="/pay" className="name">
            {apackage.name.toUpperCase()}
        </NavLink>
        <div className="list-title" > Serivces:</div>
        <Services services={apackage.services}/>
        <div className="list-title" > Included-product:</div>
        <div className="list-group">
        <OptionalProducts optionalproducts={apackage.optionalProducts}/>
      </div>
      <div className="OH">
        <table>
          <thead>
            <tr>
              <th>
                12 MONTHS PRICE:
              </th>
              <th>
                24 MONTHS PROMO:
              </th>
              <th>
                36 MONTHS PROMO:
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <th>
              {
                apackage.fee12
              }
              </th>
              <th>
              {
                apackage.fee24
              }           
              </th>
              <th>
              {
                apackage.fee36
              }              
              </th>
            </tr>
          </tbody>
        </table>
      </div>
  </li>
      </div>
    ))}
  </ul>)
  ;
};

export default Packages;