import React, {useState} from "react";
import axios from "axios";
import {Box, Grid, InputAdornment, Snackbar} from "@material-ui/core";
import {Alert, Button, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const typeServices = [
    {
        value: 'fixed internet',
        label: 'Fixed internet',
    },
    {
        value: 'mobile phone',
        label: 'Mobile phone',
    },
    {
        value: 'mobile internet',
        label: 'Mobile internet',
    },
];

export default function createService() {
    const [serviceAttr, setServiceAttr] = useState({
        type: '',
        minutes: 0,
        sms: 0,
        internet: 0,
        minutes_fee: 0,
        sms_fee: 0,
        internet_fee: 0
    });

    const [_error, setError] = React.useState({
        error0: false,
        error1: false,
        error2: false,
        error3: false,
        error4: false,
        error5: false,
        error6: false,

        errorAlert: false,
        errorZeroInput: false,
        successAlert: false
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickable') {
            return;
        }
        setError({
            ..._error,
            errorZeroInput: false,
            errorAlert: false,
            successAlert: false,
            error0: false,
            error1: false,
            error2: false,
            error3: false,
            error4: false,
            error5: false,
            error6: false
        });
    }

    function handleSubmit() {

        if (checkValidity()) {

            axios.post('/service/create',
                {
                    type: serviceAttr.type,
                    minutes: serviceAttr.minutes,
                    sms: serviceAttr.sms,
                    internet: serviceAttr.internet,
                    minutes_fee: serviceAttr.minutes_fee,
                    sms_fee: serviceAttr.sms_fee,
                    internet_fee: serviceAttr.internet_fee
                })
                .then(result => {
                    if (result.status === 200) {
                        setError({
                            ..._error,
                            errorAlert: false,
                            error0: false,
                            error1: false,
                            error2: false,
                            error3: false,
                            error4: false,
                            error5: false,
                            error6: false,
                            errorZeroInput: false,
                            successAlert: true
                        });

                    } else if (result.status === 401)
                        setError({..._error, errorAlert: true, errorZeroInput: false})
                }).catch(() => {
                setError({
                    ..._error,
                    errorZeroInput: false,
                    errorAlert: true,
                    error0: false,
                    error1: false,
                    error2: false,
                    error3: false,
                    error4: false,
                    error5: false,
                    error6: false
                });
            })
        }
    }

    function checkValidity() {
        let _error0 = (serviceAttr.type !== 'mobile internet' && serviceAttr.type !== 'fixed internet' && serviceAttr.type !== 'mobile phone');
        let _error1 = Number(serviceAttr.sms) < -1
        let _error2 = Number(serviceAttr.sms_fee) < 0
        let _error3 = Number(serviceAttr.minutes) < -1
        let _error4 = Number(serviceAttr.minutes_fee) < 0
        let _error5 = Number(serviceAttr.internet) < -1
        let _error6 = Number(serviceAttr.internet_fee) < 0
        let _errorZeroInput = false;

        if (Number(serviceAttr.sms) === 0 && Number(serviceAttr.minutes) === 0 && Number(serviceAttr.internet) === 0) {
            _error0 = _error1 = _error2 = _error3 = _error4 = _error5 = _error6 = true;
            _errorZeroInput = true;
        }

        setError({
            ..._error,
            error0: _error0,
            error1: _error1,
            error2: _error2,
            error3: _error3,
            error4: _error4,
            error5: _error5,
            error6: _error6,
            errorZeroInput: _errorZeroInput,
        })

        return (!(_error0 || _error1 || _error2 || _error3 || _error4 || _error5 || _error6))

    }

    function handlerInputChange(e) {
        setServiceAttr({
            ...serviceAttr,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div align={'center'}>
            <Box width='90%' alignContent={"center"} sx={{boxShadow: 3}}>
                <Typography marginBottom={'15px'} align={"center"} variant="h4">Create service</Typography>
                <Box sx={{flexGrow: 1}}>
                    <Grid container item spacing={2}>
                        <Grid container item spacing={2} column direction={'row'}>
                            <Grid item xs>

                                <TextField
                                    id="outlined-select-type-service"
                                    select
                                    required
                                    name="type"
                                    label="Type of service"
                                    sx={{m: 1, width: '25ch'}}
                                    error={_error.error0}
                                    value={serviceAttr.type}
                                    onChange={handlerInputChange}
                                    helperText="Please select type of the service"
                                >
                                    {typeServices.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>
                                <TextField id="outlined-basic" label="SMS quantity" variant="outlined"
                                           name="sms" color="secondary"
                                           type="number"
                                           disabled={(serviceAttr.type) === ('fixed phone') || (serviceAttr.type) === ('')}
                                           sx={{m: 1, width: '25ch'}}
                                           error={_error.error1}
                                           helperText={_error.error1 ? 'SMS quantity not valid' : 'Please insert SMS quantity, -1 for infinity'}
                                           onChange={handlerInputChange}/>
                            </Grid>
                            <Grid item xs>
                                <TextField id="outlined-basic" label="SMS fee" variant="outlined"
                                           name="sms_fee" color="secondary"
                                           type="number"
                                           disabled={Number(serviceAttr.sms) === 0}
                                           sx={{m: 1, width: '25ch'}}
                                           error={_error.error2}

                                           helperText={_error.error2 ? 'SMS fee price not valid' : 'Please insert price of SMS fee'}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                           }}
                                           onChange={handlerInputChange}/>
                            </Grid>

                            <Grid item xs>
                                <TextField id="outlined-basic" label="Minute quantity" variant="outlined"
                                           name="minutes" color="secondary"
                                           type="number"
                                           sx={{m: 1, width: '25ch'}}
                                           disabled={(serviceAttr.type) === ('')}
                                           error={_error.error3}
                                           helperText={_error.error3 ? 'Minute quantity not valid' : 'Please insert minute quantity, -1 for infinity'}
                                           onChange={handlerInputChange}/>
                            </Grid>
                            <Grid item xs>
                                <TextField id="outlined-basic" label="Minutes fee" variant="outlined"
                                           name="minutes_fee" color="secondary"
                                           type="number"
                                           disabled={Number(serviceAttr.minutes) === 0}
                                           sx={{m: 1, width: '25ch'}}
                                           error={_error.error4}

                                           helperText={_error.error4 ? 'Minutes fee price not valid' : 'Please insert price of minutes fee'}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                           }}
                                           onChange={handlerInputChange}/>
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} column direction={'row'}>
                            <Grid item xs>
                                <TextField id="outlined-basic" label="Internet MB" variant="outlined"
                                           name="internet" color="secondary"
                                           type="number"
                                           disabled={(serviceAttr.type) === 'fixed phone' || (serviceAttr.type) === ('')}
                                           sx={{m: 1, width: '25ch'}}
                                           error={_error.error5}
                                           helperText={_error.error5 ? 'Internet MB not valid' : 'Please insert Internet MB, -1 for infinity'}
                                           onChange={handlerInputChange}/>
                            </Grid>
                            <Grid item xs>
                                <TextField id="outlined-basic" label="Internet fee" variant="outlined"
                                           name="internet_fee" color="secondary"
                                           type="number"
                                           disabled={Number(serviceAttr.internet) === 0}
                                           sx={{m: 1, width: '25ch'}}
                                           error={_error.error6}
                                           helperText={_error.error6 ? 'Internet fee price not valid' : 'Please insert price of internet fee'}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                           }}
                                           onChange={handlerInputChange}/>
                            </Grid>

                        </Grid>
                    </Grid>


                    <Button variant="outlined" color="secondary" type="submit"
                            onClick={handleSubmit}>Create</Button>

                </Box>
            </Box>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={_error.errorAlert}
                      autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' severity='error'>Invalid inputs!</Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={_error.successAlert}
                      autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' severity='success'>Service created!</Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={_error.errorZeroInput}
                      autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' severity='error'>Choose at least one service!</Alert>
            </Snackbar>
        </div>
    )
}