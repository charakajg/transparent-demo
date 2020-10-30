import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
export default function TUITable({ data, fields, emptyMessage = "No records!" }) {
    const classes = useStyles();

    const records = (data!=null ? data.records : []) || [];
    const actor = (data!=null ? data.actor : {}) || {};
    return (
        (records.length===0) ? 
        <Paper>{emptyMessage}</Paper>:
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                {fields.map((elem,index)=>(<TableCell key={index}>{elem.label}</TableCell>))}
            </TableRow>
            </TableHead>
            <TableBody>
            {records.map((record) => (
                <TableRow key={record.name}>
                    {fields.map((elem,index)=>(<TableCell component="th" scope="row" key={index}>{elem.content(record,actor)}</TableCell>))}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

TUITable.propTypes = {
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string
}