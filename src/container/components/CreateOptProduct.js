import React, {useState} from "react";
import axios from "axios";
import {Box, Grid} from "@material-ui/core";
import {Alert, Button, Collapse, TextField, Typography} from "@mui/material";


export default function createOptProduct() {
    const [optionalProd, setOptionalProd] = useState({
        name: '',
        monthly_fee: 0
    });

    const [_error, setError] = React.useState({
        error0: false,
        error1: false,

        errorAlert: false,
        errorMessage: 'Invalid inputs!',
        successAlert: false
    });

    function handleSubmit() {

        if (checkValidity()) {

            axios.post('/product/create',
                {
                    name: optionalProd.name,
                    monthly_fee: optionalProd.monthly_fee,
                    employee: localStorage.getItem('email')
                })
                .then(result => {
                    if (result.status === 200) {
                        setError({
                            ..._error,
                            errorAlert: false,
                            error0: false,
                            error1: false,

                            successAlert: true
                        });
                    }
                }).catch((error) => {
                setError({..._error, successAlert: false, errorAlert: true, error0: false, error1: false, errorMessage: error.response.data.message});
            })
        }
    }

    function checkValidity() {
        let _error0 = (optionalProd.name === '' || optionalProd.name.length > 30);
        let _error1 = Number(optionalProd.monthly_fee) <= 0

        setError({
            ..._error,
            error0: _error0,
            error1: _error1,
        })

        return (!(_error0 || _error1))

    }

    function handlerInputChange(e) {
        setOptionalProd({
            ...optionalProd,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div align={'center'}>
            <Box width='90%' alignContent={"center"} sx={{boxShadow: 3}}>
                <Typography marginBottom={'15px'} align={"center"} variant="h4">Create optional product</Typography>
                <Box sx={{flexGrow: 1}}>
                    <Grid container item spacing={1}>
                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>

                                <TextField
                                    id="outlined-select-name-opt-prod"
                                    required
                                    name="name"
                                    label="Name"
                                    sx={{m: 1, minWidth: '100%'}}
                                    value={optionalProd.name}
                                    onChange={handlerInputChange}
                                    error={_error.error0}
                                    helperText="Please choose a name of the optional product"
                                />
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    id="outlined-select-fee-opt-prod"
                                    required
                                    type="number"
                                    name="monthly_fee"
                                    label="Monthly fee"
                                    sx={{m: 1, minWidth: '50%'}}
                                    value={optionalProd.monthly_fee}
                                    onChange={handlerInputChange}
                                    error={_error.error1}
                                    helperText="Please choose a fee of the optional product"
                                />
                            </Grid>
                        </Grid>

                    </Grid>


                    <Button variant="outlined" color="secondary" type="submit"
                            onClick={handleSubmit}>Create</Button>

                </Box>

                <Collapse in={_error.errorAlert}>
                    <Alert style={{marginTop: '20px'}} severity="error">{_error.errorMessage}</Alert>
                </Collapse>
                <Collapse in={_error.successAlert}>
                    <Alert style={{marginTop: '20px'}} severity="success">Optional product created!</Alert>
                </Collapse>
            </Box>
        </div>
    )
}