import React, {useState} from "react";
import axios from "axios";
import {Box, Grid, InputAdornment} from "@material-ui/core";
import {Alert, Button, Collapse, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import async from "async";

const typeServices = [
    {
        value: 'fixed_phone',
        label: 'Fixed phone',
    },
    {
        value: 'fixed_internet',
        label: 'Fixed internet',
    },
    {
        value: 'mobile_phone',
        label: 'Mobile phone',
    },
    {
        value: 'mobile_internet',
        label: 'Mobile internet',
    },
];

export default function createPackage() {

    const [services, setServices] = React.useState([]);

    const [typeServices, setTypeServices] = React.useState({
            fixed_phone: '',
            fixed_internet: '',
            mobile_phone: '',
            mobile_internet: ''
        }
    )

    const [optionalProducts, setOptionalProducts] = React.useState([]);

    const [name, setName] = React.useState('')

    const [fees, setFees] = React.useState({
        fee12: 0,
        fee24: 0,
        fee36: 0,
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

    React.useEffect(async () => {
        axios.get("../service/getall").then((result) => {
            setServices(result.data);
        })
    }, [])

    function handleSubmit() {

        if (checkValidity()) {

            axios.post('/package/create',
                {})
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
        let _error0 = (name === '');
        let _error1 = Number(fees.fee12) <= 0
        let _error2 = Number(fees.fee24) <= 0
        let _error3 = Number(fees.fee36) <= 0
        let _error4 = false
        let _error5 = false
        let _error6 = false
        let _errorZeroInput = false;


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

    function handlerInputChangeFees(e) {
        setFees({
            ...fees,
            [e.target.name]: e.target.value
        })
    }

    function handleChangeName(e) {
        setName(e);
    }

    function handleAddServices(e) {
                setTypeServices({
            ...typeServices,
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
                                    id="outlined-select-currency"
                                    required
                                    name="type"
                                    label="Name of service"
                                    sx={{m: 1, width: '25ch'}}
                                    value={name}
                                    onChange={handleChangeName}
                                    helperText="Please choose a name of the package"
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} column direction={'row'}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    required
                                    name="fixed_phone"
                                    label="Fixed phone service"
                                    sx={{m: 1, width: '25ch'}}
                                    value={typeServices.fixed_phone}
                                    onChange={handleAddServices}
                                    helperText="You can choose one of it"

                                ><MenuItem value=''><em>None</em></MenuItem>
                                    {services.map(service => {
                                            if (service.type === 'fixed phone') {
                                                return (
                                                    <MenuItem key={service.id} value={service.id}>ID:
                                                        {service.id}
                                                        {service.minutes ? 'Minuti: ' + service.minutes + ' Fee: ' + service.minutes_fee : ''}
                                                        {service.internet ? 'Internet: ' + service.internet + ' Fee: ' + service.internet_fee : ''}
                                                        {service.sms ? 'SMS: ' + service.sms + ' Fee: ' + service.sms_fee : ''}
                                                    </MenuItem>
                                                )
                                            }
                                        }
                                    )})
                                </TextField>
                            </Grid>

                        </Grid>


                    </Grid>


                    <Button variant="outlined" color="secondary" type="submit"
                            onClick={handleSubmit}>Create</Button>

                </Box>
                <Collapse in={_error.errorAlert}>
                    <Alert style={{marginTop: '20px'}} severity="error">Invalid inputs!</Alert>
                </Collapse>
                <Collapse in={_error.errorZeroInput}>
                    <Alert style={{marginTop: '20px'}} severity="error">Choose at least one service!</Alert>
                </Collapse>
                <Collapse in={_error.successAlert}>
                    <Alert style={{marginTop: '20px'}} severity="success">Service created!</Alert>
                </Collapse>
            </Box>
        </div>
    )
}