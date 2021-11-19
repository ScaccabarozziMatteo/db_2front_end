import React, {useState} from 'react';
// import "./Login.css";
import UserHome from "./UserHome";
import {Alert, Box, Button, Collapse, TextField} from "@mui/material";

const LoginUser = () => {

const [allValues, setAllValues] = useState({
    email: '',
    password: '',
});

const [alert, setAlert] = React.useState(false);

const changeHandler = e => {
   setAllValues({...allValues, [e.target.name]: e.target.value})
}

  const handleSubmit = (event) => {
      event.preventDefault();
      fetch("/user/login", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          name: 'parameters',
          body: JSON.stringify(allValues)
      }).then(response => {
          if (response.status === 200) {
              window.sessionStorage.setItem("email", allValues.email);      // Set email in session storage
              this.props.history.push(UserHome);
              setAlert(false);
          }
          else if (response.status === 409)
              setAlert(true);
      })
  }

  return (
      <React.Fragment>
          <Box
              component="form"
              sx={{
                  '& > :not(style)': {m: 1, width: '25ch'},
              }}
              noValidate
              autoComplete="off"
          >
              <TextField id="standard-basic" label="E-mail" variant="standard"
                         name="email" color="secondary"
                         type="email"
                         onChange={changeHandler}/>
              <TextField id="standard-basic" label="Password" variant="standard" type="password"
                         name="password" color="secondary"
                         onChange={changeHandler}/>

              <Button variant="outlined" color="secondary" onClick={handleSubmit}>Accedi</Button>

          </Box>
          <Collapse in={alert}>
              <Alert severity="error">Not valid credentials!</Alert>
          </Collapse>

      </React.Fragment>
  )
};

export default LoginUser;