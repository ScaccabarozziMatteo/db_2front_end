import React, {useState} from 'react';
import "./Login.css";
import  { Redirect } from 'react-router-dom'

const CustomerHome = () => {

const [allValues, setAllValues] = useState({
    email: '',
    password: '',
});

const changeHandler = e => {
   setAllValues({...allValues, [e.target.name]: e.target.value})
}

  const handleSubmit = (event) => {
      event.preventDefault();
      fetch("/loginEmployee", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          name: 'parameters',
          body: JSON.stringify(allValues)
      }).then(response => {
          if (response.status === 200)
               return <Redirect to='/login'  />
          else if (response.status === 400)
              console.log(response.status);
      })
  }

  return (
    <h1>WE</h1>
  )
};

export default CustomerHome;