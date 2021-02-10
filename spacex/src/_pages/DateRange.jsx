import {  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges } from 'react-date-range';
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dialog from '@material-ui/core/Dialog';

export default function DateRange() {
  const dispatch = useDispatch()
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
    endOflastTwoYear: endOfYear(addYears(new Date(), -2))  
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
  dispatch(getDateFilter([item.selection]))
}

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: "Past Week",
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek
      })
    },
    {
      label: "Past Month",
      range: () => ({
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past 3 Months",
      range: () => ({
        startDate: defineds.startOfLastNintyDay,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past 6 Months",
      range: () => ({
        startDate: defineds.lastSixMonths,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Past Year",
      range: () => ({
        startDate: defineds.startOflastYear,
        endDate: defineds.endOflastYear
      })
    },
    {
      label: "Past 2 Years",
      range: () => ({
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

const showCal=()=>{
  <openCalender/>
}

const closeCalender=()=>{
  setShowDatePicker(false)
}

return(
    <Grid container direction='row'>
    <button onClick={()=>openCalender()}><CalendarTodayIcon/></button>
    <button><p>Last 6 Months </p></button>
    <Grid item >
    <Dialog open={showDatePicker}  PaperProps={{style:{maxWidth:'1000px', 
    height:'400px', marginTop:'30', 
    overflow: 'hidden', padding:'30px'}}} >
    <DateRangePicker
         onChange={item => setDateFilter(item)}
         showSelectionPreview={true}
         moveRangeOnFirstSelection={false}
         months={2}
         ranges={state}
         direction="horizontal"
         inputRanges={[]}
         staticRanges={staticRanges}        
     />
     <button onClick={()=>closeCalender()}>Done</button>
    </Dialog>
    </Grid>
    </Grid>
)
}