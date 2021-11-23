import react, { useEffect } from "react";
import Loading from "../components/Loading";
import { useState } from "react";
import axios from "axios";
import Packages from "../components/Packages";

const Home = () =>{
    const [packages,setPackages] = useState([]);

useEffect(() =>{
    axios.get("package/getall").then((result)=>{
        setPackages(result.data);
    })
},[])

    return ( 
    <div>
        {
            packages? <Packages packages={packages} /> : <Loading/>
        }
    </div>
    );
}

export default Home;