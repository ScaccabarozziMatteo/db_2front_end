import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Collapse, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
    position: 'absolute',
    overflow: 'scroll',
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
        error4: false,
        errorAlert: false
    });

    const [open, setOpen] = useState({});


    function handleSubmit() {

        if (!(_error.error1 || _error.error2 || _error.error3)) {

            axios.post('/user/registration',
                {email: this.state.email, username: this.state.username, password: this.state.password})
                .then(result => {
                    if (result.status === 200) {
                        sessionStorage.setItem("email", this.state.email);      // Set email in session storage
                        this.setAlert(false);
                        this.setErrorZero();
                    } else if (result.status === 401)
                        this.setAlert(true);
                }).catch(() => {
                this.setAlert(true);
            })
        }
    }

    function handleOpen(state) {
        this.setState({'open': state,});
        if (!state) {
            this.setAlert(false)
            this.setErrorZero()
        }
    };

    function setAlert(state) {
        this.setState({'errorAlert': state,});
    }

    function setErrorZero() {
        this.setState({
            error1: false,
            error2: false,
            error3: false,
            error4: false
        })
    }

    function checkValidity() {
        this.setState({
            error1: (this.state.email.length < 1 || this.state.email.length > 30),
            error2: (this.state.username.length < 1 || this.state.username.length > 60),
            error3: (this.state.password.length < 1 || this.state.password.length > 60 || this.state.password !== this.state.password1 || this.state.password1.length < 1 || this.state.password1.length > 60),
        });
    }

    function handlerInputChange(e, _this) {
        _this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state.email)
        this.checkValidity();
    }

    return (
        <React.Fragment>
            <Button onClick={() =>
                this.handleOpen(true)
            }

            >SignUp User</Button>
            <Modal
                open={this.state.open}
                onClose={() => this.handleOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1>SignUp - User</h1>
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
                                   error={this.state.error1}
                                   helperText={this.state.error1 ? 'E-mail not valid' : ''}
                                   onChange={(event) => this.handlerInputChange(event, this)}/>
                        <TextField id="outlined-basic" label="Username" variant="outlined"
                                   name="username" color="secondary"
                                   type="text"
                                   required
                                   error={this.state.error2}
                                   helperText={this.state.error2 ? 'Username not valid' : ''}
                                   onChange={(event) => this.handlerInputChange(event, this)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                                   name="password" color="secondary"
                                   required
                                   error={this.state.error3}
                                   helperText={this.state.error3 ? 'Password not valid, please enter characters between 6 and 30' : 'Insert characters between 6 and 30'}
                                   onChange={(event) => this.handlerInputChange(event, this)}/>
                        <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password"
                                   name="password1" color="secondary"
                                   required
                                   error={this.state.error3}
                                   helperText={this.state.error3 ? 'Password not valid, please insert the same password' : ''}
                                   onChange={(event) => this.handlerInputChange(event, this)}/>

                        <Button variant="outlined" color="secondary" type="submit"
                                onClick={() => this.handleSubmit(this)}>Confirm</Button>


                    </Box>
                    <Collapse in={this.state.errorAlert}>
                        <Alert severity="error">Not valid credentials!</Alert>
                    </Collapse>
                </Box>
            </Modal>

        </React.Fragment>
    )
}

export default SignUpUser;