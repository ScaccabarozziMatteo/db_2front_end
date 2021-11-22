import react from "react";
import ReactSession from 'react-client-session';



const Home = () =>{
    console.log(localStorage.getItem("username"));  // Returns "Bob") ;
    return ( <div>{localStorage.getItem("username")}</div>);
}

export default Home;