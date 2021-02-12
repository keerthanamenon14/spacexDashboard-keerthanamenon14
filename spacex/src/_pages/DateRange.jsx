import {  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges } from 'react-date-range';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {getDateFilter} from '../_redux/_actions/LaunchDetailsActions'
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears
} from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
  button:{
      outline:'none',
      marginBottom:'10px'
  },
  dialogPaper:{
      maxWidth:'700px', 
      height:'450px', 
      marginTop:'30', 
      overflow: 'hidden',
      padding:'30px'
  }
})

export default function DateRange() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [calenderLabel, setCalenderLabel] = useState('Past 6 Months')
  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
    startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
    startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
    lastSixMonths:startOfDay(addDays(new Date(), -180)),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOflastYear: startOfYear(addYears(new Date(), -1)),
    startOfLastTwoYear:startOfYear(addYears(new Date(), -2)),
    endOflastYear: endOfYear(addYears(new Date(), -1)),
    endOflastTwoYear: endOfYear(addYears(new Date(), -1))  
  };
const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
] );

const setDateFilter = (item) =>{
  console.log([item.selection])
  setState([item.selection])
  if(item.selection.label)
  {
    setCalenderLabel(item.selection.label)
  }
  else{
    var x = new Date(item.selection.startDate).toString()
    var y = new Date(item.selection.endDate).toString()
    var date1 = x.split(' ').slice(1, 4).join(' ');
    var date2 = y.split(' ').slice(1, 4).join(' ');
    console.log(date1,date2)
  }
  dispatch(getDateFilter([item.selection]))
}

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: "Past Week",
      range: () => ({
        label:"Past Week",
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek
      })
    },
    {
      label: "Past Month",
      range: () => ({
        label:"Past Month",
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past 3 Months",
      range: () => ({
        label:"Past 3 Months",
        startDate: defineds.startOfLastNintyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past 6 Months",
      range: () => ({
        label:"Past 6 Months",
        startDate: defineds.lastSixMonths,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past Year",
      range: () => ({
        label:"Past Year",
        startDate: defineds.startOflastYear,
        endDate: defineds.endOflastYear
      })
    },
    {
      label: "Past 2 Years",
      range: () => ({
        label:"Past 2 Years",
        startDate: defineds.startOfLastTwoYear,
        endDate: defineds.endOflastTwoYear
      })
    }
  ];
  return customDateObjects;
};

  const staticRanges = [
    // ...defaultStaticRanges,
    ...createStaticRanges(sideBarOptions())
  ];


const [showDatePicker, setShowDatePicker]=useState(false)

const openCalender = () => {
  setShowDatePicker(true)
}

const closeCalender=()=>{
  setShowDatePicker(false)
}

return(
    <Grid container direction='row'>
    <Button
        className={classes.button}
        startIcon={<CalendarTodayIcon/>}
        onClick={()=>openCalender()}
      >
       {calenderLabel}
    </Button>
    <Grid item >
    <Dialog open={showDatePicker}  
    classes={{ paper: classes.dialogPaper }}>
    <DateRangePicker
         style={{width:'250px', maxHeight:'400px'}}
         onChange={item => setDateFilter(item)}
         showSelectionPreview={true}
         moveRangeOnFirstSelection={false}
         months={2}
         ranges={state}
         direction="horizontal"
         inputRanges={[]}
         staticRanges={staticRanges} 
         rdrCalendarWrapper        
     />
     <Grid container justify="center">
     <button onClick={()=>closeCalender()}>Done</button>
     </Grid>
    </Dialog>
    </Grid>
    </Grid>
)
}