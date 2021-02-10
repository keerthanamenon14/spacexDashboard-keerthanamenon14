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
  },
  upcomingChip:{
    width:' 110px',
    fontSize:'1rem',
    color:'#f57c00',
    backgroundColor:'#fff9c4'
  }
});

export default function LaunchDetails() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const launchDetailsInfo = useSelector(
      (state) => state.launchdetails.data
  )
  const launchFilterOption = useSelector(
      (state) => state.launchdetails.launchFilter
  )
  const dateFilterOption = useSelector(
    (state) => state.launchdetails.dateFilter
  ) 
  const [launchDetails, setLaunchDetails] = useState()
  const [page, setPage] = useState(1)
  const [rulesPerPage] = useState(10)
  const [currentPage, setcurrentPage] = useState(1)
  const [launchCount, setLaunchCount] = useState()
  const [currentDetail, setCurrentDetail] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [rowDetails, setRowDetails] = useState("")

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

  const openDetailsModal =(row)=>{
    setOpenModal(true);
    setRowDetails(row);
  }

  useEffect(()=>{
    dispatch(getLaunchDetails())
  },[])

  function convertDateToLocalDate (d){
    // var date = new Date(str),
    // mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    // day = ("0" + date.getDate()).slice(-2);
    // return [day,mnth,date.getFullYear()].join("-");
    return d.getFullYear() + "-"+(d.getMonth()+1) +"-"+d.getDate() + ' '+d.toString().split(' ')[4];
  }

  useEffect(()=>{ 
    console.log(dateFilterOption)
    var startDate = convertDateToLocalDate(dateFilterOption[0].startDate)
    var endDate = convertDateToLocalDate(dateFilterOption[0].endDate)
    console.log(startDate,endDate)
    var datanew
    console.log(launchFilterOption)
    if(launchFilterOption)
    {
      if(launchFilterOption == 'Successful Launches')
      {
          datanew = launchDetailsInfo.filter(
          (item) => item.launch_success == true 
           );
          console.log(datanew)
          setLaunchDetails(datanew)
          setLaunchCount(datanew.length)
      }
      else if(launchFilterOption === 'All Launches')
      {
        setLaunchDetails(launchDetailsInfo)
        setLaunchCount(launchDetailsInfo.length)
      }
      else if(launchFilterOption == 'Failed Launches')
      {
        datanew = launchDetailsInfo.filter(
          (item) => item.launch_success === false 
           );
        console.log(datanew)
        setLaunchDetails(datanew)
        setLaunchCount(datanew.length)
      }
      else if(launchFilterOption == 'Upcoming Launches')
      {
        datanew = launchDetailsInfo.filter(
          (item) => item.upcoming === true 
           );
        console.log(datanew)
        setLaunchDetails(datanew)
        setLaunchCount(datanew.length)
      }
    }
  },[launchFilterOption,dateFilterOption])

  useEffect(()=>{
    setLaunchDetails(launchDetailsInfo);
    setLaunchCount(launchDetailsInfo.length)
  },[launchDetailsInfo])

  useEffect(() => {
    if(launchDetails){
      const indexOfLastRule = currentPage * rulesPerPage;
      const indexOfFirstRule = indexOfLastRule - rulesPerPage;
      setCurrentDetail(launchDetails.slice(indexOfFirstRule, indexOfLastRule));
    }
  }, [launchDetails, currentPage,launchFilterOption]);

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
          {currentDetail && currentDetail.map((row, index) => (
            <TableRow key={index}  >
              <TableCell className={classes.tableData}>{row.flight_number}</TableCell>
              <TableCell className={classes.tableData} component="th" scope="row">
                {row.launch_date_utc}
              </TableCell>
              <TableCell className={classes.tableData}>{row.launch_site.site_name}</TableCell>
              <TableCell className={classes.tableData} onClick={()=>openDetailsModal(row)}>
              {row.mission_name}
              </TableCell>
              <TableCell className={classes.tableData}>{row.rocket.second_stage.payloads[0].orbit}</TableCell>
              {row.launch_success && !row.upcoming?  
              <TableCell className={classes.tableData}>
              <Chip  label="Success" className={classes.successChip}/>
              </TableCell>
              :
              !row.upcoming && row.launch_success !== 'true' && row.launch_success!== 'null'?
              <TableCell className={classes.tableData}>
              <Chip  label="Failure"  className={classes.failureChip}/>
              </TableCell>
              :
              row.upcoming &&
              <TableCell className={classes.tableData}>
              <Chip  label="Upcoming"  className={classes.upcomingChip}/>
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
        rowDetails={rowDetails}
        open={openModal}
        onClose={(e) => handleClose()}
      />
    )}
    </Grid>
  );
}