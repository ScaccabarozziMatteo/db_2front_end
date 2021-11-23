import react, {useEffect, useState} from 'react';
import axios from "axios";
import Packages from "../container/components/Packages";
//import Loading from "../components/Loading";

function Home() {

        const [packages,setPackages] = useState([]);

useEffect(() =>{
    axios.get("package/getall").then((result)=>{
        setPackages(result.data);
    })

},[])

    return (
    <div>
        {
            <Packages packages={packages} />
            //packages? <Packages packages={packages} /> : <Loading/>
        }
    </div>
    );
}

export default Home;