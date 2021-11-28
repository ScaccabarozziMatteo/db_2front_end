import react, {useEffect, useState} from 'react';
import axios from "axios";
import Packages from "../../container/components/Packages";
import Loading from "../../container/components/Loading";
import OrdersRejected from '../../container/components/OrdersRejected';
import "./Home.css"
function Home(props) {

    const [packages, setPackages] = useState([]);
    const [orderId,setOrderId] = useState(props.orderId); 
    const [rejected,setRejected] = useState([]);
    useEffect(() => {
        axios.get("package/getall").then((result) => {
            setPackages(result.data);
        })

    }, [])



   useEffect(()=>{
      // console.log(props.OrderId);
      localStorage.getItem("user_id")!==""?
       axios.get("/order/getrejected",{params:{
           user_id: localStorage.getItem("user_id")
       }}).then((result)=>{
           setRejected(result.data);
       })
       :
       setRejected([]);
   },[props.orderId, props.checkInsolvent])


    return (
        <div>
            <div>
            {
            props.insolvent===true?
            <div className="cont">
            <div className="tit">
            YOU HAVE SOME INSOLVENT ORDERS IN STANDBY!
            </div>
            <OrdersRejected sure={props.orderId} setOrderId={props.setOrderId} orders={rejected}/>
          </div>
          :
          null 
            }
            </div>
            <div>
            {
                    packages ? 
                    <Packages packages={packages}/> 
                    : 
                    <Loading/>
                }
            </div>
        
        </div>
    );
}

export default Home;