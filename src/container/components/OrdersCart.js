import React, { useEffect, useState } from "react";
import OptionalProductsCards from "./OptionalProductsCards";
import "./OrdersCart.css"
import OptionalProducts from "./OptionalProducts";
import { useNavigate } from "react-router";
const OrdersCart =(props)=>{

    const [orderId,setOrderId]=useState(props.orderId);
    const [orders,setOrders]=useState([]);
const navigate = useNavigate();

useEffect(()=>{
   // console.log(props.orderId);
   setOrderId(props.orderId);
    console.log("refresh OrdersRejected");
},[props.orderId])

useEffect(()=>{
    // console.log(props.orderId);
    setOrders(props.orders);
     console.log("refresh OrdersRejected");
 },[props.orders])
 

 function  clickHandle(order_id){
     localStorage.setItem("order_id",order_id);
     props.setOrderId(!props.orderId);
     navigate("/pay");
    }
    
    return(



        orders!==[]?
        <div>
        
        
        <ul className="list-group">
        {
        orders.map((order) => (
         <div className="divq" key={order.id}>
         <li
            key={order.id}
            id={order.id}
            className="list-row-cart" activeClassName="active" onClick={()=>clickHandle(order.id)}
          >
            <div  className="name">
                {order.id}
            </div>
            <div  className="name">
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

export default OrdersCart;