import react from 'react';


function Home() {
    console.log(localStorage.getItem("username"));  // Returns "Bob") ;
    return (
        <div>{localStorage.getItem("username")}
        </div>);
}

export default Home;