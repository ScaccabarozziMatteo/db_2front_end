import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Packages from './Packages';
import {useState, useEffect} from 'react';
import OptionalProducts from './OptionalProducts';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import "./HorizontalStepper.css";
import OptionalProductsCards from './OptionalProductsCards';
import Riepilogo from './Riepilogo';
import Login from '../Login';
import FinalStepButton from './finalStepButton';
import {useNavigate} from "react-router";

const steps = ['Select a package', 'Add optional products', 'Check your order'];


export default function HorizontalLinearStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [packages, setPackages] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(JSON.parse(localStorage.getItem("selectedPackage")));
    const [selectedProducts, setSelectedProducts] = useState(JSON.parse(localStorage.getItem("optionalProducts")));
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("email") !== "" && localStorage.getItem("email") !== null);
    const today = new Date();
    const navigate = useNavigate();


    useEffect(() => {
            axios.get("package/getall").then((result) => {
                setPackages(result.data);
            })

        }, []
    )

    useEffect(() => {
            axios.get("product/getall").then((result) => {
                setProducts(result.data);
            })

        }, []
    )

    useEffect(() => {
            localStorage.getItem("date") === null || localStorage.getItem("date") === "" || localStorage.getItem("date") === " " || localStorage.getItem("date") === "undefined" ? localStorage.setItem("date", new Date().toString().slice(0, 15)) : true;
        }, []
    )

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function handleConfirm() {
        const sp = JSON.parse(localStorage.getItem("optionalProducts"));
        var sP = [];
        sp === null ?
            sP = []
            :

            () => {
                for (var i = 0; i < sp.length; i++) {
                    sP[i] = sp[i].id
                }
            }

        //console.log(localStorage.getItem("optionalProducts"));
        //console.log(localStorage.getItem("validity"));
        axios.post("/order/create",
            {
                user: localStorage.getItem("user_id"),
                aPackage: JSON.parse(localStorage.getItem("selectedPackage")).id,
                optionalProducts: sP,
                validity: localStorage.getItem("validity"),
                start_subs: formatDate(localStorage.getItem("date").toString().slice(0, 15))
            }).then((result) => {
            localStorage.setItem("order_id", result.data);
            //console.log(result.data);
        })

        console.log(localStorage.getItem("order_id"));
        navigate("/pay");
    };


    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>

                    {activeStep === 0 ?
                        <div className="selected">
                            <div className="packageDetails">
                                <div className="packNamediv">
                                    You selected: <div
                                    className="packName">{selectedPackage !== null && selectedPackage !== 'null' && selectedPackage !== "undefined" && selectedPackage !== "" ? selectedPackage.name.toUpperCase() + ". " : ""}</div>
                                </div>
                                <div className="dateSelector">
                                    Starting from:
                                    <DayPickerInput dayPickerProps={{disabledDays: {before: new Date()}}}
                                                    onDayChange={day => localStorage.setItem("date", day)}/>
                                </div>
                            </div>
                            <Packages packages={packages} reloadStepper={setSelectedPackage}/>
                        </div>
                        :
                        activeStep === 1 ?
                            <div>
                                You selected: <div
                                className="packName">{selectedProducts !== null && selectedProducts !== 'null' && selectedProducts !== 'undefined' && selectedProducts !== "" ?
                                <div>
                                    <OptionalProducts optionalproducts={selectedProducts}/>
                                </div>
                                : ""}</div>
                                <OptionalProductsCards it={selectedProducts} optionalproducts={products}
                                                       reload={setSelectedProducts}/>
                            </div>
                            :

                            <Riepilogo Riepilogo selectedPackage={JSON.parse(localStorage.getItem("selectedPackage"))}
                                       validity={localStorage.getItem("validity")}
                                       optionalProducts={localStorage.getItem("optionalProducts") !== null && localStorage.getItem("optionalProducts") !== "null" && localStorage.getItem("optionalProducts") !== "" && localStorage.getItem("optionalProducts") !== "undefined" ? JSON.parse(localStorage.getItem("optionalProducts")) : []}
                                       date={localStorage.getItem("date").toString().slice(0, 15)} fix={false}/>
                    }

                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                Skip
                            </Button>
                        )}
                        {activeStep !== steps.length - 1 ?
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                            :
                            <FinalStepButton handleConfirm={handleConfirm} role={props.role} reload={props.reload}/>
                        }
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}