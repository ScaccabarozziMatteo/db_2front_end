import React, {useCallback, useState} from 'react';
import {Alert, Box, Button, Collapse, Divider, IconButton, TextField, Typography} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import CustomizedSwitches from "./navbars/switchEmployee";
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

function Login(props) {

    const navigate=useNavigate();


    const [_state, _setState] = useState({
        email: '',
        username: '',
        password: '',
        open: false,
        typeLogin: 'user',
        title: 'User - Login',
        pathPost: '/user/login'
    })

    const [_error, setError] = useState({
        error1: false,
        error2: false,
        errorAlert: false
    });


    function changeTypeLogin() {
        if (_state.typeLogin === "employee") {
            _setState({
                    ..._state,
                    title: 'User - Login',
                    pathPost: '/user/login',
                    typeLogin: 'user'
                }
            )
        } else {
            _setState({
                    ..._state,
                    title: 'Employee - Login',
                    pathPost: '/employee/login',
                    typeLogin: 'employee'
                }
            )
        }
    }

    function handleOpen(state) {
        _setState({..._state, open: state});
        if (!state)
            setError({..._error, errorAlert: false});
    }

    function handleCallback(childData) {
        _setState({..._state, typeLogin: childData})
        changeTypeLogin();
    }

    function handlerInputChange(e) {
        _setState({
            ..._state,
            [e.target.name]: e.target.value,
        });
    }

    function checkValidity() {
        let _error1 = (_state.email.length < 1 || _state.email.length > 30);
        let _error2 = (_state.password.length < 6 || _state.password.length > 60);


        setError({
            ..._error,
            error1: _error1,
            error2: _error2,
        })

        return (!(_error1 || _error2))

    }

    function handleSubmit() {

        if (checkValidity()) {

            axios.post(_state.pathPost,
                {email: _state.email, password: _state.password})
                .then(result => {
                    if (result.status === 200) {
                        
                        localStorage.setItem("email", _state.email); 
                        localStorage.setItem("username", result.data.username); 
                        localStorage.setItem("user_id", result.data.id);
                        props.setCheckInsolvent(!props.checkInsolvent);
                             // Set email in session storage
                        setError({..._error, errorAlert: false});
                     //   console.log(props.role);
                        props.onLogChange(true);
                        props.reload(true);
                      //  props.reload(true);
                      // console.log(props.role);
                        if (_state.typeLogin === 'user')
                            navigate(props.url);
                        else
                            navigate("/employee/home");

                    } else if (result.status === 401)
                        setError({..._error, errorAlert: true})
                }).catch(() => {
                setError({..._error, errorAlert: true})
            })
        }
    }

    return (
        <React.Fragment>
            <Button color={"inherit"} size={"large"} onClick={() =>
                handleOpen(true)
            }

            >Login</Button>
            <Modal
                open={_state.open}
                onClose={() => handleOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography marginBottom={'15px'} align={"center"} variant="h4">{_state.title}</Typography>

                    <Divider variant="middle"/>
                    <Box
                        sx={{
                            '& > :not(style)': {m: 1, width: '100%', margin: '10px auto 10px auto'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField size={"large"} id="outlined-basic" label="E-mail" variant="outlined"
                                   name="email" color="secondary"
                                   type="email"
                                   required
                                   error={_error.error1}
                                   helperText={_error.error1 ? 'E-mail not valid' : ''}
                                   onChange={handlerInputChange}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                                   name="password" color="secondary"
                                   required
                                   error={_error.error2}
                                   helperText={_error.error2 ? 'Password not valid, please enter characters between 6 and 30' : ''}
                                   onChange={handlerInputChange}/>

                        <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Login</Button>

                        <CustomizedSwitches {..._state} handleCallback={(typeLogin) => handleCallback(typeLogin)}/>
                    </Box>
                    <Collapse in={_error.errorAlert}>
                        <Alert severity="error">Invalid credentials!</Alert>
                    </Collapse>
                </Box>
            </Modal>

        </React.Fragment>
    );
}


export default Login;