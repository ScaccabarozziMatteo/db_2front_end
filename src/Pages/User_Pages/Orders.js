import axios from "axios";
import react, { useEffect, useState } from "react";
import OrdersRejected from "../../container/components/OrdersRejected";
import OrdersCards from "../../container/components/Orders";
import { useLocation } from "react-router";

const Orders = (props) =>{
        const [orderId,setOrderId] = useState(props.orderId); 
         const[payed,setPayed] = useState([]);
         const [rejected,setRejected] = useState([]);

        useEffect(()=>{
        //console.log(props.orderId);
            setOrderId(props.orderId);
            axios.get("/order/getpayed",
            {params: {user_id: localStorage.getItem("user_id")}}).then((result)=>{
                setPayed(result.data);
                //console.log("refresh");
            })
        },[props.orderId])

        useEffect(()=>{
           // console.log(props.OrderId);
            axios.get("/order/getrejected",{params:{
                user_id: localStorage.getItem("user_id")
            }}).then((result)=>{
                setRejected(result.data);
                //console.log(result)
            })
        },[props.orderId])

    return (
        <div>
            {
            rejected!==[]
            ?
            <div>
                <div>
                TO BE PAYED:
                </div>
                <OrdersRejected sure={props.orderId} setOrderId={props.setOrderId} orders={rejected}/>
            </div>
            :
            <div>
                All bought orders have been payed!
            </div>
            }
            <div>
            {
            payed!==[] ?
            <div>
            <div>
            PROCESSED ORDERS:
            </div>
            <div>
            <OrdersCards sure={props.orderId} setOrderId={props.setOrderId} orders={payed}/>               
            </div>
            </div>
            :
            <div>
                No processed order found.
                </div>
            }
            </div>
        </div>
    )
}

export default Orders;