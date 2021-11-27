import axios from "axios";
import react, { useEffect, useState } from "react";
import Riepilogo from "../container/components/Riepilogo";
import Loading from "../container/components/Loading";
import "./Pay.css";
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router";

const Pay = (props) =>{
    const navigate =useNavigate();
    const [order,setOrder] = useState(0);
    const [orderId,setOrderId]=useState(props.orderId);    

    useEffect(()=>{
       // console.log(props.orderId)
       // console.log(localStorage.getItem("order_id"));
       setOrderId(props.orderId);
        axios.get("/order/getorder",
        {params: {id: localStorage.getItem("order_id")}}
        ).then((result)=>{
            setOrder(result.data);
            //console.log(result);
        });
       // console.log(order);

    },[props.orderId]
    )
    function reject(){
        axios.put("/order/refuse/" + localStorage.getItem("order_id")).then((response)=>
        {
            props.setOrderId(!props.orderId);
            navigate("/orders");
        })

    }
    function pay(){
        axios.put("/order/payed/" + localStorage.getItem("order_id")).then((response)=>
        {
            props.setOrderId(!props.orderId);
            navigate("/orders");
        });
       
    }  
    
    function simulate(){
        axios.put("/order/simulatePayment/" + localStorage.getItem("order_id")).then((response)=>
        {
            props.setOrderId(!props.orderId);
            navigate("/orders");
        })
    }


    return (
        <div>
        {
        order!==0?
        <div className="divo">
        <Riepilogo sure={props.orderId} selectedPackage={order.aPackage}  validity={order.validity} optionalProducts = {order.optionalProducts} fix={true}/>
        </div>
        :
        <Loading/>
        }

        <div className="butt">
        <Button className="is" variant="contained" onClick={reject}>
        SIMULATE REJECTION
        </Button>
        <Button className="is" variant="contained" onClick={pay}>
        SIMULATE PAYMENT
        </Button>
        <Button className="is" variant="contained" onClick={simulate}>
        SIMULATE RANDOM
        </Button>
        </div>
        </div>

        )

}
export default Pay;