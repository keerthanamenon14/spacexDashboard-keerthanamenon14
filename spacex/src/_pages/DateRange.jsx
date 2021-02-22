import { DateRangePicker, createStaticRanges } from "react-date-range";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getLaunchFilter } from "../_redux/_actions/LaunchDetailsActions";
import { getDateFilter } from "../_redux/_actions/LaunchDetailsActions";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfYear,
  endOfYear,
  addYears,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import queryString from "query-string";
import { history } from "../_redux/_store/history";

const useStyles = makeStyles({
  button: {
    outline: "none",
    marginBottom: "10px",
  },
  dialogPaper: {
    maxWidth: "700px",
    height: "400px",
    marginTop: "30",
    overflow: "hidden",
    padding: "30px",
  },
  doneButton: {
    width: 100,
    backgroundColor: "#4dabf5",
    border: "none",
  },
});

export default function DateRange() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [calenderLabel, setCalenderLabel] = useState("Choose Dates");
  const defineds = {
    startOfLastWeek: startOfDay(addDays(new Date(), -14)),
    endOfLastWeek: startOfDay(addDays(new Date(), -7)),
    startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
    startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
    lastSixMonths: startOfDay(addDays(new Date(), -180)),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOflastYear: startOfYear(addYears(new Date(), -1)),
    startOfLastTwoYear: startOfYear(addYears(new Date(), -2)),
    endOflastYear: endOfYear(addYears(new Date(), -1)),
    endOflastTwoYear: endOfYear(addYears(new Date(), -1)),
  };
  const queryValues = queryString.parse(history.location.search);
  useEffect(() => {
    if (queryValues.label != "null") {
      setCalenderLabel(queryValues.label);
    } else {
      setCalenderLabel(calenderLabel);
    }
  }, []);

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const launchFilterOption = useSelector(
    (state) => state.launchdetails.launchFilter
  );

  useEffect(() => {
    if (launchFilterOption == "All Launches") {
      setCalenderLabel("All Dates");
    }
  }, [launchFilterOption]);

  const setDateFilter = (item) => {
    debugger;
    console.log(item);
    setState([item.selection]);
    if (item.selection.label == "All Dates") {
      dispatch(getLaunchFilter("All Launches"));
      dispatch(getDateFilter(null));
      setCalenderLabel(item.selection.label);
    } else {
      setCalenderLabel(item.selection.label);
      dispatch(getDateFilter([item.selection]));
    }
  };

  const sideBarOptions = () => {
    const customDateObjects = [
      {
        label: "Past Week",
        range: () => ({
          label: "Past Week",
          startDate: defineds.startOfLastWeek,
          endDate: defineds.endOfLastWeek,
        }),
      },
      {
        label: "Past Month",
        range: () => ({
          label: "Past Month",
          startDate: defineds.startOfLastThirtyDay,
          endDate: defineds.endOfToday,
        }),
      },
      {
        label: "Past 3 Months",
        range: () => ({
          label: "Past 3 Months",
          startDate: defineds.startOfLastNintyDay,
          endDate: defineds.endOfToday,
        }),
      },
      {
        label: "Past 6 Months",
        range: () => ({
          label: "Past 6 Months",
          startDate: defineds.lastSixMonths,
          endDate: defineds.endOfToday,
        }),
      },
      {
        label: "Past Year",
        range: () => ({
          label: "Past Year",
          startDate: defineds.startOflastYear,
          endDate: defineds.endOflastYear,
        }),
      },
      {
        label: "Past 2 Years",
        range: () => ({
          label: "Past 2 Years",
          startDate: defineds.startOfLastTwoYear,
          endDate: defineds.endOflastTwoYear,
        }),
      },
      {
        label: "customise",
        range: () => ({
          label: "customise",
          startDate: new Date(),
          endDate: new Date(),
        }),
      },
      {
        label: "Clear",
        range: () => ({
          label: "All Dates",
          startDate: new Date(),
          endDate: startOfYear(addYears(new Date(), -15)),
        }),
      },
    ];
    return customDateObjects;
  };

  const staticRanges = [...createStaticRanges(sideBarOptions())];

  const [showDatePicker, setShowDatePicker] = useState(false);

  const openCalender = () => {
    setShowDatePicker(true);
  };

  const closeCalender = () => {
    setShowDatePicker(false);
  };

  return (
    <Grid container direction="row">
      <Button
        className={classes.button}
        startIcon={<CalendarTodayIcon />}
        onClick={() => openCalender()}
      >
        {calenderLabel}
      </Button>
      <Grid item>
        <Dialog open={showDatePicker} classes={{ paper: classes.dialogPaper }}>
          <DateRangePicker
            style={{ width: "250px", maxHeight: "300px" }}
            onChange={(item) => setDateFilter(item)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            inputRanges={[]}
            staticRanges={staticRanges}
            showDateDisplay={false}
          />
          <Grid container justify="center">
            <button
              onClick={() => closeCalender()}
              className={classes.doneButton}
            >
              <Typography fontSize="1rem">Done</Typography>
            </button>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
}
