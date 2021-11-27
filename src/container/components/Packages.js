import {NavLink} from "react-router-dom";
import "./Packages.css";
import Services from "./Services";
import OptionalProducts from "./OptionalProducts";
import {useNavigate} from "react-router";

function Packages(props) {

    const navigate = useNavigate();

    function clickHandle(apackage) {

        //console.log(window.location.href);

        localStorage.setItem("selectedPackage", JSON.stringify(apackage));
       // console.log(JSON.parse(localStorage.getItem("selectedPackage")));
        if (window.location.href === "http://localhost:3000/")
            navigate("/buy");
        else {
            props.reloadStepper(JSON.parse(localStorage.getItem("selectedPackage")));
        }
    }

    return (
        <ul className="list-group">
            {props.packages.map((apackage) => (
                <div className="divq" key={apackage.id}>
                    <li
                        key={apackage.id}
                        id={apackage.id}
                        className="list-row" activeClassName="active" onClick={() => clickHandle(apackage)}
                    >
                        <div className="name">
                            {apackage.name.toUpperCase()}
                        </div>
                        <div className="list-title"> Services:</div>
                        <Services services={apackage.services}/>
                        <div className="list-title"> Included-product:</div>
                        <div className="list-group">
                            <OptionalProducts optionalproducts={apackage.optionalProducts}/>
                        </div>
                        <div className="OH">
                            <table className="tablet">
                                <thead className="list-titlet">
                                <tr className="price-row">
                                    <th className="list-titlet">
                                        12 MONTHS PRICE:
                                    </th>
                                    <th className="list-titlet">
                                        24 MONTHS PROMO:
                                    </th>
                                    <th className="list-titlet">
                                        36 MONTHS PROMO:
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="price-row">
                                    <th className="price-tag">
                                        {
                                            apackage.fee12
                                        }€/month
                                    </th>
                                    <th className="price-tag">
                                        {
                                            apackage.fee24
                                        }€/month
                                    </th>
                                    <th className="price-tag">
                                        {
                                            apackage.fee36
                                        }€/month
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