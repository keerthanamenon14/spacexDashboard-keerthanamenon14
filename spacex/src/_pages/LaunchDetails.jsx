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
import LaunchDetailsModal from "../_pages/LaunchDetailsModal.jsx"
import FooterPagination from './FooterPagination'
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  detailsTable:{
    paddingRight: '100px',
    paddingLeft: '100px'
  },
  paginationItem:{
      paddingRight: '100px'
  },
  tableData:{
      fontSize:'1rem',
      textAlign:'center',
      borderBottom:'none'
  },
  successChip:{
    width:' 110px',
    fontSize:'1rem',
    color:'#1b5e20',
    backgroundColor:'#e8f5e9'
  },
  failureChip:{
    width:' 110px',
    fontSize:'1rem',
    color:'#e53935',
    backgroundColor:'#ffebee'
  }
});

export default function LaunchDetails({filterOption}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const launchDetailsInfo = useSelector(
      (state) => state.launchdetails.data
    )
  const [launchDetails, setLaunchDetails] = useState()
  const [page, setPage] = useState(1)
  const [rulesPerPage] = useState(10)
  const [currentPage, setcurrentPage] = useState(1)
  const [launchCount, setLaunchCount] = useState()
  const [currentDetail, setCurrentDetail] = useState("")
  const [openModal, setOpenModal] = useState(false)

  console.log(filterOption)
  //setting current page
  const paginate = (pageNumber) => {
      setcurrentPage(pageNumber);
  };

  const handleChange = (event, value) => {
      setPage(value);
      paginate(value);
  };

  const handleClose=()=>{
    setOpenModal(false)
  }

  const openDetailsModal =()=>{
    setOpenModal(true);
  }

  useEffect(()=>{
    dispatch(getLaunchDetails())
  },[])

  useEffect(()=>{
    if(filterOption==='Successful Launches')
    {
      var a = launchDetailsInfo.filter
        ((item) => item.launch_success == true)
      setCurrentDetail(a)
    }
  },[filterOption])

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
    <Grid item className={classes.detailsTable}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:'#e1f5fe'}}>
            <TableCell className={classes.tableData} >No:</TableCell>
            <TableCell className={classes.tableData}>Launched(UTC)</TableCell>
            <TableCell className={classes.tableData}>Location</TableCell>
            <TableCell className={classes.tableData}>Mission</TableCell>
            <TableCell className={classes.tableData}>Orbit</TableCell>
            <TableCell className={classes.tableData}>Launch Status</TableCell>
            <TableCell className={classes.tableData}>Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentDetail && currentDetail.map((row) => (
            <TableRow  >
              <TableCell className={classes.tableData}>{row.flight_number}</TableCell>
              <TableCell className={classes.tableData} component="th" scope="row">
                {row.launch_date_utc}
              </TableCell>
              <TableCell className={classes.tableData}>{row.launch_site.site_name}</TableCell>
              <TableCell className={classes.tableData} onClick={()=>openDetailsModal()}>
              {row.mission_name}
              </TableCell>
              <TableCell className={classes.tableData}>{row.rocket.second_stage.payloads[0].orbit}</TableCell>
              {row.launch_success ?
              <TableCell className={classes.tableData}>
              <Chip  label="Success" className={classes.successChip}/>
              </TableCell>
              :
              <TableCell className={classes.tableData}>
              <Chip  label="Failure"  className={classes.failureChip}/>
              </TableCell>
              }
              <TableCell className={classes.tableData}>{row.rocket.rocket_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
    </Grid>
    <Grid item className={classes.paginationItem}>
        <FooterPagination
          page={page}
          handleChange={handleChange}
          rulesPerPage={rulesPerPage}
          totalRules={launchCount}
          paginate={paginate}
        />
    </Grid>
    {openModal && (
      <LaunchDetailsModal
        open={openModal}
        onClose={(e) => handleClose()}
      />
    )}
    </Grid>
  );
}