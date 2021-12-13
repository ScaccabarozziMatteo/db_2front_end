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
    const [usersInsolvents, setUsersInsolvents] = React.useState([])
    const [suspendedOrders, setSuspendedOrders] = React.useState([])
    const [alertsReport, setAlertsReport] = React.useState([])
    const [bestProduct, setBestProduct] = React.useState([])


    React.useEffect(() => {

        axios.get("../packreport/getAll").then((result) => {
            setReportPackages(result.data);
        })

        axios.get("../insolventreport/getAll").then((result) => {
            setUsersInsolvents(result.data);
        })

        axios.get("../suspendedorder/getAll").then((result) => {
            setSuspendedOrders(result.data);
        })

        axios.get("../auditingTable/getAll").then((result) => {
            setAlertsReport(result.data);
        })

        axios.get("../productreport/getBest").then((result) => {
            setBestProduct(result.data);
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
                <Box marginBottom={'50px'} maxWidth={'60%'}>
                    <h2>Report optional products for every package</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                <TableRow>
                                    <TableCell align="center">ID package</TableCell>
                                    <TableCell align="center">Average number of optional products</TableCell>
                                    <TableCell align="center">Total number of optional products</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportPackages.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{row.aPackage}</TableCell>
                                        <TableCell align="center">{!isNaN(row.avg_prod) ? row.avg_prod : 0}</TableCell>
                                        <TableCell align="center">{row.total_prod}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box marginBottom={'50px'} maxWidth={'60%'}>
                    <h2>Best seller(s) optional products</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                <TableRow>
                                    <TableCell align="center">ID Optional product</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Total sales</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bestProduct.map((row) => (
                                    <TableRow
                                        key={row.optional_product}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{row.optional_product}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.total_sales}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box marginBottom={'50px'} width={'60%'}>
                    <h2>Report insolvent users</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{background: "grey"}}>
                                <TableRow>
                                    <TableCell align="center">ID User</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Username</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersInsolvents.map((row) => (
                                    <TableRow
                                        key={row.insolvent_user}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center">{row.insolvent_user}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.username}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    <Box marginBottom={'50px'} width={'100%'}>
                        <h2>Report suspended orders</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{background: "grey"}}>
                                    <TableRow>
                                        <TableCell align="center">ID order</TableCell>
                                        <TableCell align="center">Package</TableCell>
                                        <TableCell align="center">Start subscription</TableCell>
                                        <TableCell width={'20%'} align="center">Purchase date</TableCell>
                                        <TableCell align="center">Total cost</TableCell>
                                        <TableCell align="center">User ID</TableCell>
                                        <TableCell align="center">Duration subscription in months</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {suspendedOrders.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="center">{row.aPackage}</TableCell>
                                            <TableCell align="center">{row.start_subs}</TableCell>
                                            <TableCell align="center">{row.timestamp}</TableCell>
                                            <TableCell align="center">{row.total_costs} €</TableCell>
                                            <TableCell align="center">{row.user}</TableCell>
                                            <TableCell align="center">{row.validity}</TableCell>
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
                                        <TableCell align="center">User ID</TableCell>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Date of last rejection</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {alertsReport.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="center">{row.user_id}</TableCell>
                                            <TableCell align="center">{row.username}</TableCell>
                                            <TableCell align="center">{row.amount} €</TableCell>
                                            <TableCell align="center">{row.date_time}</TableCell>
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