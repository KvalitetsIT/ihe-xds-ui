import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useGetConfigQuery } from "../../feature/CredentialAPI/redux/ConfigApiSlice"



function About() {

    const { data, isSuccess } = useGetConfigQuery()

    if (isSuccess) {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Environmennt variable</TableCell>
                                <TableCell align="left">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.configKey}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.configKey}
                                    </TableCell>
                                    <TableCell align="left">{row.configValue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </>
        )
    }
    else {
        return null;
    }






}

export default About

