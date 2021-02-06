import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid'
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
import FooterPagination from './FooterPagination'

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
});

export default function LaunchDetails() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const launchDetailsInfo = useSelector(
      (state) => state.launchdetails.data
    )
  const [launchDetails, setLaunchDetails] = useState()
  const [page, setPage] = useState(1)
  const [rulesPerPage] = useState(12)
  const [currentPage, setcurrentPage] = useState(1)
  const [launchCount, setLaunchCount] = useState()
  const [currentDetail, setCurrentDetail] = useState("")

  //setting current page
  const paginate = (pageNumber) => {
      setcurrentPage(pageNumber);
  };

  const handleChange = (event, value) => {
      setPage(value);
      paginate(value);
  };

  useEffect(()=>{
    dispatch(getLaunchDetails())
  },[])

  useEffect(()=>{
    setLaunchDetails(launchDetailsInfo);
    setLaunchCount(launchDetailsInfo.length)
  },[launchDetailsInfo])

  useEffect(() => {
    const indexOfLastRule = currentPage * rulesPerPage;
    const indexOfFirstRule = indexOfLastRule - rulesPerPage;
    setCurrentDetail(launchDetailsInfo.slice(indexOfFirstRule, indexOfLastRule));
  }, [launchDetailsInfo, currentPage]);

  return (
    <Grid container direction="column">
    <Grid item>
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
          {currentDetail && currentDetail.map((row) => (
            <TableRow >
              <TableCell align="right">{row.flight_number}</TableCell>
              <TableCell component="th" scope="row">
                {row.launch_date_utc}
              </TableCell>
              <TableCell align="right">{row.launch_site.site_name}</TableCell>
              <TableCell align="right">{row.mission_name}</TableCell>
              <TableCell align="right">{row.rocket.second_stage.payloads[0].orbit}</TableCell>
              <TableCell align="right">{row.launch_success}</TableCell>
              <TableCell align="right">{row.rocket.rocket_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
    </Grid>
    <Grid item>
        <FooterPagination
          page={page}
          handleChange={handleChange}
          rulesPerPage={rulesPerPage}
          totalRules={launchCount}
          paginate={paginate}
        />
    </Grid>
    </Grid>
  );
}