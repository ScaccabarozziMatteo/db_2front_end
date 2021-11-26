import React, {useEffect} from "react";
import axios from "axios";
import {Box, TableCell, TableHead} from "@material-ui/core";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

function ReportPage() {

    const [reportData, setReportData] = React.useState([])

    React.useEffect(async () => {

        axios.get("../report/getall").then((result) => {
            setReportData(result.data);
        })

    }, [])

    return (
        <div>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID package</TableCell>
                                <TableCell align="right">Total purchasing</TableCell>
                                <TableCell align="right">Total purchases per package and validity period</TableCell>
                                <TableCell align="right">€ sales</TableCell>
                                <TableCell align="right">€ sales with op. prod.</TableCell>
                                <TableCell align="right">AVG op. prod.</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportData.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )

}

export default ReportPage;