import React from 'react';
import {Alert, Box, Button, Collapse, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";

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

class LoginUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorAlert: false,
            open: false,
        };

        this.handleOpen.bind(this);
        this.handlerInputChange.bind(this);
        this.handleSubmit.bind(this);
        this.setAlert.bind(this);
    }

    setAlert(state) {
        this.setState({'errorAlert': state,});
    }

    handleOpen(state) {
        this.setState({'open': state,});
        if (!state)
            this.setAlert(false)
    };

    handlerInputChange(e, _this) {
        _this.setState({
            [e.target.name]: e.target.value,
        });
    }


    handleSubmit() {
        axios.post("/user/login",
            {email: this.state.email, password: this.state.password})
            .then(result => {
            if (result.status === 200) {
                window.sessionStorage.setItem("email", this.state.email);      // Set email in session storage
                this.setAlert(false);
            } else if (result.status === 401)
                this.setAlert(true);
        }).catch(() => {
            this.setAlert(true);
        })
    }

 render() {
        return (

            <React.Fragment>
                <Button onClick={() =>
                    this.handleOpen(true)
                }

                >Login User</Button>
                <Modal
                    open={this.state.open}
                    onClose={() => this.handleOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h1>User - Login</h1>
                        <Box
                            sx={{
                                '& > :not(style)': {m: 1, width: '100%', margin: '10px auto 10px auto'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="E-mail" variant="standard"
                                       name="email" color="secondary"
                                       type="email"
                                       onChange={(event) => this.handlerInputChange(event, this)}/>
                            <TextField id="standard-basic" label="Password" variant="standard" type="password"
                                       name="password" color="secondary"
                                       onChange={(event) => this.handlerInputChange(event, this)}/>

                            <Button variant="outlined" color="secondary" type="submit" onClick={() => this.handleSubmit(this)}>Login</Button>

                        </Box>
                        <Collapse in={this.state.errorAlert}>
                            <Alert severity="error">Not valid credentials!</Alert>
                        </Collapse>
                    </Box>
                </Modal>

            </React.Fragment>
        );
    }
}


export default LoginUser;