import React, {useState} from 'react';
import UserHome from "./UserHome";
import {Alert, Box, Button, Collapse, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";

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

const LoginEmployee = () => {

    const [allValues, setAllValues] = useState({
        email: '',
        password: '',
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAlert(false);
    }

    const [alert, setAlert] = React.useState(false);

    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/employee/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            name: 'parameters',
            body: JSON.stringify(allValues)
        }).then(response => {
            if (response.status === 200) {
                window.sessionStorage.setItem("email", allValues.email);      // Set email in session storage
                this.props.history.push(UserHome);
                setAlert(false);
            } else if (response.status === 409)
                setAlert(true);
        })
    }


    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Login Employee</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Login - Employee</h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 2, width: '80%'},
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

                        <Button variant="outlined" color="secondary" onClick={handleSubmit}>Log in</Button>

                    </Box>
                    <Collapse in={alert}>
                        <Alert severity="error">Not valid credentials!</Alert>
                    </Collapse>
                </Box>
            </Modal>

        </React.Fragment>
    )
};

export default LoginEmployee;