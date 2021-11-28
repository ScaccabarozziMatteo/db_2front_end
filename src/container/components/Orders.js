import React from "react";
import OptionalProductsCards from "./OptionalProductsCards";
import "./Packages.css"
import OptionalProducts from "./OptionalProducts";
import Typography from "@mui/material/Typography";

const OrdersCards = (props) => {
    return (


        props.orders !== [] && props.orders !== null ?
            <div>


                <ul className="list-group">
                    {
                        props.orders.map((order) => (
                            <div className="divq" key={order.id}>
                                <li
                                    key={order.id}
                                    id={order.id}
                                    className="list-row" activeClassName="active"
                                >
                                    <Typography className="nameo"  align={"center"} variant={"h5"}>
                                        Order ID:{order.id}
                                    </Typography>
                                    <div className="name">
                                        {order.aPackage.name.toUpperCase()}
                                    </div>
                                    <div className="name">
                                        <OptionalProducts optionalproducts={order.optionalProducts}/>
                                    </div>
                                </li>
                            </div>)
                        )}

                </ul>
            </div>

            :

            null


    )


}

export default OrdersCards;