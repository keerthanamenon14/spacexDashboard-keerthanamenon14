import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getLaunchDetails} from '../_redux/_actions/LaunchDetailsActions'
import { useState } from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    borderStyle: 'solid'
  },
});

export default function LaunchDetails() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const launchDetailsInfo = useSelector(
    (state) => state.launchdetails
  )
  const launchDetails = launchDetailsInfo.data;
  console.log(launchDetailsInfo)
  useEffect(()=>{
    dispatch(getLaunchDetails())
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No:</TableCell>
            <TableCell align="right">Launched(UTC)</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Orbit</TableCell>
            <TableCell align="right">Launch Status</TableCell>
            <TableCell align="right">Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {launchDetails && launchDetails.map((row) => (
            <TableRow key={row.flight_number}>
              <TableCell align="right">{row.flight_number}</TableCell>
              <TableCell component="th" scope="row">
                {row.launch_date_utc}
              </TableCell>
              <TableCell align="right">{row.launch_site.site_name}</TableCell>
              <TableCell align="right">{row.mission_name}</TableCell>
              <TableCell align="right">{row.rocket.second_stage.orbit}</TableCell>
              <TableCell align="right">{row.launch_success}</TableCell>
              <TableCell align="right">{row.rocket.rocket_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}