import axios from "axios";
import react, { useEffect, useState } from "react";
import Riepilogo from "../container/components/Riepilogo";
import Loading from "../container/components/Loading";
import "./Pay.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

const Pay = () =>{
    const navigate =useNavigate();
    const [order,setOrder] = useState(0);

    useEffect(()=>{
        console.log(localStorage.getItem("order_id"));
        axios.get("/order/getorder",
        {params: {id: localStorage.getItem("order_id")}}
        ).then((result)=>{
            setOrder(result.data);
            console.log(result);
        });
        console.log(order);

    },[]
    )
    function reject(){
        axios.put("/order/refuse/" + order.id);
        
    }

    return (
        order!==0?
        <div className="divo">
        <Riepilogo selectedPackage={order.aPackage}  validity={order.validity} optionalProducts = {order.optionalProducts} fix={true}/>
        </div>
        :
        <Loading/>
        ,
        <div>
        <Button onClick={reject}>
        SIMULATE REJECTION
        </Button>
        <Button onClick={pay}>
        SIMULATE PAYMENT
        </Button>
        <Button onClick={random}>
        SIMULATE RANDOM
        </Button>
        </div>

        )
}

export default Pay;