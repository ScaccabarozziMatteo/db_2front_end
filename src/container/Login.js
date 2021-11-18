import React, {useState} from 'react';
import "./Login.css";
import  { useNavigate } from 'react-router-dom'

const Login = () => {

      let navigate = useNavigate();

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
              navigate('/CustomerHome');
          else if (response.status === 400)
              document.getElementById("formLogin").appendChild()
              console.log(response.status);
      })
  }

  return (
    <form onSubmit={handleSubmit} id="formLogin">
        E-mail
      <input
        type = "email"
        name = "email"
        placeholder = "E-mail"
        onChange = {changeHandler}
      />
        Password
      <input
        type = "password"
        name = "password"
        placeholder = "Password"
        onChange = {changeHandler}
      />
      <button
        type="submit"
      >
        Login
      </button>
    </form>
  )
};

export default Login;