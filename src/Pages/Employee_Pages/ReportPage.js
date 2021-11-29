import React, {useEffect} from "react";
import axios from "axios";
import {Box, TableCell, TableHead} from "@material-ui/core";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

function ReportPage() {

    const [reportPackages, setReportPackages] = React.useState([])

    React.useEffect(() => {

        axios.get("../packreport/getAll").then((result) => {
            setReportPackages(result.data);
            console.log(result.data)
        })

    }, [])

    return (
        <div>
            <Stack marginTop={'20px'}>
                <Box marginBottom={'50px'}>
                    <h2>Report packages</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                <TableRow>
                                    <TableCell>ID package</TableCell>
                                    <TableCell align="center">Total purchasing</TableCell>
                                    <TableCell align="center">Total purchases 12 months</TableCell>
                                    <TableCell align="center">Total purchases 24 months</TableCell>
                                    <TableCell align="center">Total purchases 36 months</TableCell>
                                    <TableCell align="center">Amount of sales with optional
                                        product</TableCell>
                                    <TableCell align="center">Amount of sales without optional
                                        product</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportPackages.length > 0 ? (
                                        reportPackages.map((row) => (
                                            <TableRow
                                                key={row.aPackage}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell align="center">{row.aPackage}</TableCell>
                                                <TableCell align="center">{row.total_purchase}</TableCell>
                                                <TableCell align="center">{row.purchase_24}</TableCell>
                                                <TableCell align="center">{row.purchase_24_36}</TableCell>
                                                <TableCell align="center">{row.purchase_36}</TableCell>
                                                <TableCell align="center">{row.total_revenue + ' €'}</TableCell>
                                                <TableCell align="center">{row.total_revenue_prod + ' €'}</TableCell>

                                            </TableRow>
                                        )))
                                    : <Typography>Loading...</Typography>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    <h2>Report services</h2>
                    <Stack marginBottom={'50px'} direction={"row"}>
                        <Box width={'50%'}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead style={{background: "grey"}}>
                                        <TableRow>
                                            <TableCell align="center">ID service</TableCell>
                                            <TableCell align="center">Average number of optional products sold
                                                together</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reportPackages.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.calories}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box>
                            <Typography marginLeft={'30px'}>Best seller optional product:</Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box marginBottom={'50px'} width={'60%'}>
                    <h2>Report insolvent users</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                <TableRow>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Surname</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportPackages.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.calories}</TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    <Box marginBottom={'50px'} width={'60%'}>
                        <h2>Report suspended orders</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                    <TableRow>
                                        <TableCell align="center">ID service</TableCell>
                                        <TableCell align="center">Average number of optional products sold
                                            together</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportPackages.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box marginBottom={'50px'} width={'60%'}>
                        <h2>Report alerts</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                    <TableRow>
                                        <TableCell align="center">ID alert</TableCell>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Date of last rejection</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportPackages.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Stack>
        </div>
    )

}

export default ReportPage;