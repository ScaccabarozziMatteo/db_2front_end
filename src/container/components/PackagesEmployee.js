import Services from "./Services";
import OptionalProducts from "./OptionalProducts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PackagesEmployee() {

    const [packages, setPackages] = useState([]);

    useEffect(() => {
            axios.get("../package/getall").then((result) => {
                setPackages(result.data);
            })

        }, []
    )
    return (
        <ul className="list-group">
            {packages.map((apackage) => (
                <div className="divq">
                    <li
                        key={apackage.id}
                        id={apackage.id}
                        className="list-row" activeClassName="active"
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
}