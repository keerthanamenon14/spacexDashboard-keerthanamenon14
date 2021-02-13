import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid'
import { history } from '../_redux/_store/history'
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
import SkeletonTableList from "../_pages/skeletonList"
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
  const launchDetailsLoading = useSelector(
    (state) => state.launchdetails.loading
  )
  const [launchDetails, setLaunchDetails] = useState()
  const [page, setPage] = useState(1)
  const [rulesPerPage] = useState(8)
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
  console.log(launchDetailsLoading)
  useEffect(()=>{
    dispatch(getLaunchDetails())
  },[])

  function convertDateToLocalDate (str){
    var x = new Date(str).toString()
    var date = x.split(' ').slice(0, 5).join(' ');
    return date

  }

  // function to filter dates between ranges
  function filterDates (dateFilterOption){
    var dateFilteredData = []
    launchDetailsInfo.map((item)=>{
        if(Date.parse(item.launch_date_utc) >= Date.parse(dateFilterOption[0].startDate) && Date.parse(item.launch_date_utc) < Date.parse(dateFilterOption[0].endDate))
        {
          dateFilteredData.push(item)
        }
    })
    return dateFilteredData
  }

  useEffect(()=>{
    if(dateFilterOption)
    {
    if(dateFilterOption[0].startDate || dateFilterOption[0].endDate)
    {
        var array = filterDates(dateFilterOption)
        console.log(array)
        setLaunchDetails(array)
        setLaunchCount(array.length)
    }
    else
    {
      setLaunchDetails(launchDetailsInfo)
      setLaunchCount(launchDetailsInfo.length)
    }
    }
  },[dateFilterOption])

  useEffect(()=>{ 
    console.log(launchFilterOption)
       if(page!=1)
       {
           setPage(1)
       }
      var datanew
      if(launchFilterOption)
      {
            history.push(`/launchstatus=${launchFilterOption}`)
            if(launchFilterOption == 'Successful Launches')
             {
              datanew = launchDetailsInfo.filter(
                 (item) => item.launch_success == true          
             );
             setLaunchDetails(datanew)
             setLaunchCount(datanew.length)
             }
             else if(launchFilterOption === 'All Launches')
             {
              console.log("heyyyyyyyy")
                 setLaunchDetails(launchDetailsInfo)
                 setLaunchCount(launchDetailsInfo.length)
             }
             else if(launchFilterOption == 'Failed Launches')
             {
                 datanew = launchDetailsInfo.filter(
                  (item) => item.launch_success === false 
                  );
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
  },[launchFilterOption])

  // useEffect(()=>{
  // var datanew
  //     if(launchFilterOption && !dateFilterOption)
  //     {
  //       if(launchFilterOption == 'Successful Launches')
  //       {
  //        datanew = launchDetailsInfo.filter(
  //           (item) => item.launch_success == true          
  //       );
  //       setLaunchDetails(datanew)
  //       setLaunchCount(datanew.length)
  //       }
  //       else if(launchFilterOption === 'All Launches')
  //       {
  //        console.log("heyyyyyyyy")
  //           setLaunchDetails(launchDetailsInfo)
  //           setLaunchCount(launchDetailsInfo.length)
  //       }
  //       else if(launchFilterOption == 'Failed Launches')
  //       {
  //           datanew = launchDetailsInfo.filter(
  //            (item) => item.launch_success === false 
  //            );
  //            setLaunchDetails(datanew)
  //            setLaunchCount(datanew.length)
  //        }
  //        else if(launchFilterOption == 'Upcoming Launches')
  //        {
  //             datanew = launchDetailsInfo.filter(
  //             (item) => item.upcoming === true 
  //             );
  //             console.log(datanew)
  //             setLaunchDetails(datanew)
  //             setLaunchCount(datanew.length)
  //        }
  //     }
  //     else if(dateFilterOption && !launchFilterOption)
  //     {
  //       if(dateFilterOption[0].startDate || dateFilterOption[0].endDate)
  //         {
  //            var array = filterDates(dateFilterOption)
  //            console.log(array)
  //            setLaunchDetails(array)
  //            setLaunchCount(array.length)
  //         }
  //         else
  //         {
  //            setLaunchDetails(launchDetailsInfo)
  //            setLaunchCount(launchDetailsInfo.length)
  //         }
  //      }
  //      else if(dateFilterOption && launchFilterOption )
  //      {
  //       if(launchFilterOption == 'Successful Launches')
  //       {
  //        datanew = launchDetailsInfo.filter(
  //           (item) => item.launch_success == true &&
  //           Date.parse(item.launch_date_utc) >= Date.parse(dateFilterOption[0].startDate) 
  //           && Date.parse(item.launch_date_utc) < Date.parse(dateFilterOption[0].endDate)
                     
  //       );
  //       setLaunchDetails(datanew)
  //       setLaunchCount(datanew.length)
  //       }
  //       else if(launchFilterOption === 'All Launches')
  //       {
  //        console.log("heyyyyyyyy")
  //           setLaunchDetails(launchDetailsInfo)
  //           setLaunchCount(launchDetailsInfo.length)
  //       }
  //       else if(launchFilterOption == 'Failed Launches')
  //       {
  //           datanew = launchDetailsInfo.filter(
  //            (item) => item.launch_success === false  &&
  //            Date.parse(item.launch_date_utc) >= Date.parse(dateFilterOption[0].startDate) 
  //            && Date.parse(item.launch_date_utc) < Date.parse(dateFilterOption[0].endDate)
  //            );
  //            setLaunchDetails(datanew)
  //            setLaunchCount(datanew.length)
  //        }
  //        else if(launchFilterOption == 'Upcoming Launches')
  //        {
  //             datanew = launchDetailsInfo.filter(
  //             (item) => item.upcoming === true &&
  //             Date.parse(item.launch_date_utc) >= Date.parse(dateFilterOption[0].startDate) 
  //             && Date.parse(item.launch_date_utc) < Date.parse(dateFilterOption[0].endDate) 
  //             );
  //             console.log(datanew)
  //             setLaunchDetails(datanew)
  //             setLaunchCount(datanew.length)
  //        }
  //      }
  // },[launchFilterOption,dateFilterOption])

  useEffect(()=>{
    if(launchDetailsInfo)
    {
    let tempArray = [];
    tempArray = launchDetailsInfo;
    tempArray.map((item) =>{
      var a = convertDateToLocalDate(item.launch_date_utc)
      item.launch_date_utc = a
    })
    setLaunchDetails(launchDetailsInfo);
    setLaunchCount(launchDetailsInfo.length)
   }
  },[launchDetailsInfo])

  useEffect(() => {
    if(launchDetails){   
      console.log(launchDetails) 
      const indexOfLastRule = currentPage * rulesPerPage;
      const indexOfFirstRule = indexOfLastRule - rulesPerPage;
      console.log(indexOfLastRule,indexOfFirstRule)
      console.log(launchDetails.slice(indexOfFirstRule, indexOfLastRule))
      if(launchDetails.length < rulesPerPage || launchDetails.length < indexOfFirstRule)
      {
        console.log("yes")
        setcurrentPage(1)
        setPage(1)
        setCurrentDetail(launchDetails)
      }
      else
      {
        setCurrentDetail(launchDetails.slice(indexOfFirstRule, indexOfLastRule));
      }
    }
  }, [launchDetails, currentPage,launchFilterOption,dateFilterOption]);

  return (
    <React.Fragment>
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
        {launchDetailsLoading && (
           <SkeletonTableList number={7}/>
        )}
          {currentDetail && currentDetail.map((row, index) => (
            <TableRow key={index}  >
              <TableCell className={classes.tableData}>{row.flight_number}</TableCell>
              <TableCell className={classes.tableData} component="th" scope="row">
                {row.launch_date_utc}
              </TableCell>
              <TableCell className={classes.tableData}>{row.launch_site.site_name}</TableCell>
              <TableCell className={classes.tableData} 
              style={{cursor:'pointer'}}
              onClick={()=>openDetailsModal(row)}>
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
    {currentDetail.length === 0 && launchDetailsLoading === false &&
              <Grid container justify='center' style={{padding:'40px'}} >
              No results found for specific filter
              </Grid>
    }
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
    </React.Fragment>
  );
}