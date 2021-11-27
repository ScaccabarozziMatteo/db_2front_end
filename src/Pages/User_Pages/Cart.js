import axios from "axios";
import react, { useEffect, useState } from "react";
import OrdersRejected from "../../container/components/OrdersRejected";
import OrdersCart from "../../container/components/OrdersCart";
import { useLocation } from "react-router";
import {Alert} from "@mui/material";

const Cart = (props) =>{
        const [orderId,setOrderId] = useState(props.orderId); 
         const[orders,setOrders] = useState([]);



        useEffect(()=>{
           // console.log(props.OrderId);
            axios.get("/order/getcart",{params:{
                user_id: localStorage.getItem("user_id")
            }}).then((result)=>{
                setOrders(result.data);
                console.log(result.data);
            })
        },[props.orderId])


        function pleaseLog() {
            return (
                <div>
                    <Alert severity='warning'>In order to see your cart, please click on the LOGIN BUTTON in the top-right and enter you credentials.</Alert>
                </div>
            )
        }
  
    return (
        <div>
       {
       localStorage.getItem("username") !== null && localStorage.getItem("username") !== '' && localStorage.getItem("username") !== 'undefined'?
       
       <div>
       {
       orders!==[]
       ?
       <div>
           <div>
           TO BUY:
           </div>
           <OrdersCart sure={props.orderId} setOrderId={props.setOrderId} orders={orders}/>
       </div>
       :
       <div>
           No order in the cart!
       </div>
       }
       </div>
   :
     pleaseLog()
        }
        </div>
        
     )
}

export default Cart;