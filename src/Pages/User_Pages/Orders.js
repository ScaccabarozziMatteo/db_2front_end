import axios from "axios";
import react, { useEffect, useState } from "react";
import OrdersRejected from "../../container/components/OrdersRejected";
import OrdersCards from "../../container/components/Orders";
import {Alert} from "@mui/material";
import Typography from "@mui/material/Typography";

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
            })
        },[props.orderId])


        function pleaseLog() {
            return (
                <div>
                    <Alert severity='warning'>In order to see your submitted orders, please click on the LOGIN BUTTON in the top-right and enter you credentials.</Alert>
                </div>
            )
        }
  
    return (
        <div>
       {
       localStorage.getItem("username") !== null && localStorage.getItem("username") !== '' && localStorage.getItem("username") !== 'undefined'?
       
       <div>
       {
           (rejected.length > 0)
       ?
       <div>
           <Typography align={'center'} variant={"h3"}>
           TO BE PAYED
           </Typography>
           <OrdersRejected sure={props.orderId} setOrderId={props.setOrderId} orders={rejected}/>
       </div>
       :
       <div>
           <Alert severity='success'>All your orders have been payed!</Alert>
       </div>
       }
       <div>
       {
       payed.length > 0 ?
       <div>
           <Typography align={'center'} variant={"h3"}>
           PROCESSED ORDERS
           </Typography>
       <div>
       <OrdersCards sure={props.orderId} setOrderId={props.setOrderId} orders={payed}/>               
       </div>
       </div>
       :
       <div>
           <Typography align={'center'} variant={"h3"}>
           PROCESSED ORDERS
           </Typography>
           <Alert severity='info'>No processed order found.</Alert>
           </div>
       }
       </div>
   </div>         
   :
     pleaseLog()
        }
        </div>
        
     )
}

export default Orders;