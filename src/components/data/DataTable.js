import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [];

export default function DataTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item name</TableCell>
                        <TableCell align="right">Platinum&nbsp;value</TableCell>
                        <TableCell align="right">Ducats&nbsp;value</TableCell>
                        <TableCell align="right">Added</TableCell>
                        <TableCell align="right">Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    );
}