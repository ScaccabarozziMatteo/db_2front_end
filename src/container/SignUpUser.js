import React, {useState} from "react";
import {Alert, Box, Button, Collapse, Divider, TextField, Typography} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

function SignUpUser() {

    const navigate=useNavigate();

    const [userAttr, setUserAttr] = useState({
        email: '',
        password: '',
        password1: '',
        username: '',
    });

    const [_error, setError] = useState({
        error1: false,
        error2: false,
        error3: false,
        errorAlert: false
    });

    const [open, setOpen] = useState(false);

    function handleSubmit() {

        if (checkValidity()) {

            axios.post('/user/registration',
                {email: userAttr.email, username: userAttr.username, password: userAttr.password})
                .then(result => {
                    if (result.status === 200) {
                        setError({..._error, errorAlert: false, error1: false, error2: false, error3: false});
                        navigate("/login");
                        
                    } else if (result.status === 401)
                        setError({..._error, errorAlert: true})
                }).catch(() => {
                setError({..._error, errorAlert: true, error1: false, error2: false, error3: false});
            })
        }
    }

    function handleOpen(state) {
        setOpen(state);
        if (!state)
            setError({..._error, errorAlert: false, error1: false, error2: false, error3: false});
    }

    function checkValidity() {
        let _error1 = (userAttr.email.length < 1 || userAttr.email.length > 30);
        let _error2 = (userAttr.username.length < 1 || userAttr.username.length > 60);
        let _error3 = (userAttr.password.length < 6 || userAttr.password.length > 60 || userAttr.password !== userAttr.password1 || userAttr.password1.length < 1 || userAttr.password1.length > 60);


        setError({
            ..._error,
            error1: _error1,
            error2: _error2,
            error3: _error3
        })

        return (!(_error1 || _error2 || _error3))

    }

    function handlerInputChange(e) {
        setUserAttr({
            ...userAttr,
            [e.target.name]: e.target.value
        })
    }

    return (
        <React.Fragment>
            <Button color={"inherit"} size={"large"} onClick={() =>
                handleOpen(true)
            }

            >SignUp</Button>
            <Modal
                open={open}
                onClose={() => handleOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography marginBottom={'15px'} align={"center"} variant="h4">User - SignUp</Typography>
                    <Divider variant="middle"/>
                    <Box
                        sx={{
                            '& > :not(style)': {m: 1, width: '100%', margin: '10px auto 10px auto'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="E-mail" variant="outlined"
                                   name="email" color="secondary"
                                   type="email"
                                   required
                                   error={_error.error1}
                                   helperText={_error.error1 ? 'E-mail not valid' : ''}
                                   onChange={handlerInputChange}/>
                        <TextField id="outlined-basic" label="Username" variant="outlined"
                                   name="username" color="secondary"
                                   type="text"
                                   required
                                   error={_error.error2}
                                   helperText={_error.error2 ? 'Username not valid' : ''}
                                   onChange={handlerInputChange}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                                   name="password" color="secondary"
                                   required
                                   error={_error.error3}
                                   helperText={_error.error3 ? 'Password not valid, please enter characters between 6 and 30' : 'Insert characters between 6 and 30'}
                                   onChange={handlerInputChange}/>
                        <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password"
                                   name="password1" color="secondary"
                                   required
                                   error={_error.error3}
                                   helperText={_error.error3 ? 'Password not valid, please insert the same password' : ''}
                                   onChange={handlerInputChange}/>

                        <Button variant="outlined" color="secondary" type="submit"
                                onClick={handleSubmit}>Confirm</Button>


                    </Box>
                    <Collapse in={_error.errorAlert}>
                        <Alert severity="error">Invalid credentials!</Alert>
                    </Collapse>
                </Box>
            </Modal>

        </React.Fragment>
    )
}

export default SignUpUser;