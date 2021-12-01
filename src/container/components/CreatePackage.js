import React, {useState} from "react";
import axios from "axios";
import {Box, Checkbox, Grid, InputAdornment, ListItemText, OutlinedInput, Select} from "@material-ui/core";
import {Alert, Button, Collapse, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

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

    const [choosenProducts, setChoosenProducts] = React.useState([]);

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

        errorAlert: false,
        errorZeroInput: false,
        successAlert: false,
        errorMessage: 'Error'
    });

    React.useEffect(async () => {

        axios.get("../service/getall").then((result) => {
            setServices(result.data);
        })

        axios.get("../product/getall").then((_products) => {
            setOptionalProducts(_products.data);
        })
    }, [])

    function handleChangeProducts(event) {

        setChoosenProducts(
            // On autofill we get a the stringified value.
            typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        );
    }

    function handleSubmit() {

        if (checkValidity()) {

            const services = [];
            if (typeServices.mobile_internet !== '')
                services.push(typeServices.mobile_internet);
            if (typeServices.mobile_phone !== '')
                services.push(typeServices.mobile_phone);
            if (typeServices.fixed_phone !== '')
                services.push(typeServices.fixed_phone);
            if (typeServices.fixed_internet !== '')
                services.push(typeServices.fixed_internet);

            axios.post('/package/create',
                {
                    name: name,
                    fee12: fees.fee12,
                    fee24: fees.fee24,
                    fee36: fees.fee36,
                    employee: localStorage.getItem("user_id"),
                    services: services,
                    optionalProducts: choosenProducts
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
                            errorZeroInput: false,
                            successAlert: true
                        });

                    } else if (result.status === 401)
                        setError({..._error, errorAlert: true, errorZeroInput: false})
                }).catch((error) => {
                if (error.response.status === 401)
                    setError({
                        ..._error,
                        errorZeroInput: false,
                        errorAlert: true,
                        error0: false,
                        error1: false,
                        error2: false,
                        error3: false,
                        error4: false,
                        errorMessage: 'Invalid inputs!'
                    });
                else
                    setError({
                        ..._error,
                        errorZeroInput: false,
                        errorAlert: true,
                        error0: false,
                        error1: false,
                        error2: false,
                        error3: false,
                        error4: false,
                        errorMessage: error.response.status
                    });
            })
        }
    }

    function checkValidity() {
        let _error0 = (name === '' || name.length > 30);
        let _error1 = (typeServices.fixed_phone === '' && typeServices.mobile_phone === '' && typeServices.mobile_internet === '' && typeServices.fixed_internet === '')
        let _error2 = Number(fees.fee12) <= 0
        let _error3 = Number(fees.fee24) <= 0
        let _error4 = Number(fees.fee36) <= 0

        setError({
            ..._error,
            error0: _error0,
            error1: _error1,
            error2: _error2,
            error3: _error3,
            error4: _error4,
            errorZeroInput: _error1,
        })

        return (!(_error0 || _error1 || _error2 || _error3 || _error4))

    }

    function handlerInputChangeFees(e) {
        setFees({
            ...fees,
            [e.target.name]: e.target.value
        })
    }

    function handleChangeName(e) {
        setName(e.target.value);
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
                <Typography marginBottom={'15px'} align={"center"} variant="h4">Create package</Typography>
                <Collapse in={_error.errorAlert}>
                    <Alert style={{marginTop: '20px'}} severity="error">{_error.errorMessage}</Alert>
                </Collapse>
                <Collapse in={_error.errorZeroInput}>
                    <Alert style={{marginTop: '20px'}} severity="error">Choose at least one service!</Alert>
                </Collapse>
                <Collapse in={_error.successAlert}>
                    <Alert style={{marginTop: '20px'}} severity="success">Package created!</Alert>
                </Collapse>
                <Box sx={{flexGrow: 1}}>
                    <Grid container item spacing={1}>

                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>

                                <TextField
                                    id="outlined-name-service"
                                    error={_error.error0}
                                    required
                                    name="name"
                                    label="Name of service"
                                    sx={{m: 1, width: '40ch'}}
                                    value={name}
                                    onChange={handleChangeName}
                                    helperText={!_error.error0 ? "Please choose a name of the package" : "Insert a valid name"}
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-select-typeservice2"
                                    select
                                    required
                                    name="fixed_phone"
                                    error={_error.error1}
                                    label="Fixed phone service"
                                    sx={{m: 1, minWidth: '100%'}}
                                    value={typeServices.fixed_phone}
                                    onChange={handleAddServices}
                                    helperText={!_error.error1 ? "You can choose one of it" : "Choose at least one service"}

                                ><MenuItem value=''><em>None</em></MenuItem>
                                    {services.map(service => {
                                            if (service.type === 'fixed phone') {
                                                return (
                                                    <MenuItem key={service.id} value={service.id}>
                                                        {'ID: ' + service.id}
                                                        {service.minutes ? ' Minuti: ' + service.minutes + ' minuti, fee: ' + service.minutes_fee + '€ |' : ''}
                                                        {service.internet ? ' Internet: ' + service.internet + 'MB, fee: ' + service.internet_fee + '€ |' : ''}
                                                        {service.sms ? ' SMS: ' + service.sms + ', fee: ' + service.sms_fee + '€' : ''}
                                                    </MenuItem>
                                                )
                                            }
                                        }
                                    )})
                                </TextField>
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    id="outlined-select-typeservice1"
                                    select
                                    required
                                    error={_error.error1}
                                    name="mobile_phone"
                                    label="Mobile phone service"
                                    sx={{m: 1, minWidth: '100%'}}
                                    value={typeServices.mobile_phone}
                                    onChange={handleAddServices}
                                    helperText={!_error.error1 ? "You can choose one of it" : "Choose at least one service"}

                                ><MenuItem value=''><em>None</em></MenuItem>
                                    {services.map(service => {
                                            if (service.type === 'mobile phone') {
                                                return (
                                                    <MenuItem key={service.id} value={service.id}>
                                                        {'ID: ' + service.id}
                                                        {service.minutes ? ' Minuti: ' + service.minutes + ' minuti, fee: ' + service.minutes_fee + '€ |' : ''}
                                                        {service.internet ? ' Internet: ' + service.internet + 'MB, fee: ' + service.internet_fee + '€ |' : ''}
                                                        {service.sms ? ' SMS: ' + service.sms + ', fee: ' + service.sms_fee + '€' : ''}
                                                    </MenuItem>
                                                )
                                            }
                                        }
                                    )})
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-select-typeservice3"
                                    select
                                    required
                                    name="fixed_internet"
                                    label="Fixed internet service"
                                    error={_error.error1}
                                    sx={{m: 1, minWidth: '100%'}}
                                    value={typeServices.fixed_internet}
                                    onChange={handleAddServices}
                                    helperText={!_error.error1 ? "You can choose one of it" : "Choose at least one service"}

                                ><MenuItem value=''><em>None</em></MenuItem>
                                    {services.map(service => {
                                            if (service.type === 'fixed internet') {
                                                return (
                                                    <MenuItem key={service.id} value={service.id}>
                                                        {'ID: ' + service.id}
                                                        {service.minutes ? ' Minuti: ' + service.minutes + ' minuti, fee: ' + service.minutes_fee + '€ |' : ''}
                                                        {service.internet ? ' Internet: ' + service.internet + 'MB, fee: ' + service.internet_fee + '€ |' : ''}
                                                        {service.sms ? ' SMS: ' + service.sms + ', fee: ' + service.sms_fee + '€' : ''}
                                                    </MenuItem>
                                                )
                                            }
                                        }
                                    )})
                                </TextField>
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    id="outlined-select-typeservice4"
                                    select
                                    required
                                    name="mobile_internet"
                                    label="Mobile internet service"
                                    sx={{m: 1, minWidth: '100%'}}
                                    error={_error.error1}
                                    value={typeServices.mobile_internet}
                                    onChange={handleAddServices}
                                    helperText={!_error.error1 ? "You can choose one of it" : "Choose at least one service"}

                                ><MenuItem value=''><em>None</em></MenuItem>
                                    {services.map(service => {
                                            if (service.type === 'mobile internet') {
                                                return (
                                                    <MenuItem key={service.id} value={service.id}>
                                                        {'ID: ' + service.id}
                                                        {service.minutes ? ' Minuti: ' + service.minutes + ' minuti, fee: ' + service.minutes_fee + '€ |' : ''}
                                                        {service.internet ? ' Internet: ' + service.internet + 'MB, fee: ' + service.internet_fee + '€ |' : ''}
                                                        {service.sms ? ' SMS: ' + service.sms + ', fee: ' + service.sms_fee + '€' : ''}
                                                    </MenuItem>
                                                )
                                            }
                                        }
                                    )})
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>

                                <Select
                                    //labelId="outlined-select-products-label"
                                    id="outlined-select-products2"
                                    variant='outlined'
                                    style={{width: '100%'}}
                                    multiple
                                    //sx={{m: 1, width: '25ch'}}
                                    value={choosenProducts}
                                    onChange={handleChangeProducts}
                                    startAdornment={'Optional Products'}
                                >
                                    {optionalProducts.map(product => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {'ID: ' + product.id + ' ' + product.name + ', fee: ' + product.monthly_fee + '€'}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} column direction={'row'}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-fee12"
                                    error={_error.error2}
                                    required
                                    type='number'
                                    name="fee12"
                                    label="Fee for 12 months"
                                    sx={{m: 1, width: '25ch'}}
                                    value={fees.fee12}
                                    onChange={handlerInputChangeFees}
                                    helperText={!_error.error2 ? "Please define the fee for a month" : "Insert a valid fee"}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs>

                                <TextField
                                    id="outlined-fee24"
                                    error={_error.error3}
                                    required
                                    type='number'
                                    name="fee24"
                                    label="Fee for 24 months"
                                    sx={{m: 1, width: '25ch'}}
                                    value={fees.fee24}
                                    onChange={handlerInputChangeFees}
                                    helperText={!_error.error3 ? "Please define the fee for a month" : "Insert a valid fee"}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs>

                                <TextField
                                    id="outlined-fee36"
                                    error={_error.error4}
                                    required
                                    type='number'
                                    name="fee36"
                                    label="Fee for 36 months"
                                    sx={{m: 1, width: '25ch'}}
                                    value={fees.fee36}
                                    onChange={handlerInputChangeFees}
                                    helperText={!_error.error4 ? "Please define the fee for a month" : "Insert a valid fee"}
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Button variant="outlined" color="secondary" type="submit"
                            onClick={handleSubmit}>Create</Button>

                </Box>
            </Box>
        </div>
    )
}