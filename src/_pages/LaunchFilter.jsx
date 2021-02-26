import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getLaunchFilter,
  getDateFilter,
} from "../_redux/_actions/LaunchDetailsActions";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import queryString from "query-string";
import { history } from "../_redux/_store/history";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  label: {
    top: "23px",
    left: "50px",
    fontSize: "25px",
  },
}));

export default function LaunchFilter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [options, setOptions] = useState("All Launches");
  const queryValues = queryString.parse(history.location.search);
  const dateFilterOption = useSelector(
    (state) => state.launchdetails.dateFilter
  );

  useEffect(() => {
    if (queryValues.launchfilter) {
      setOptions(queryValues.launchfilter);
      dispatch(getLaunchFilter(queryValues.launchfilter));
    }
  }, []);

  useEffect(() => {
    if (dateFilterOption && dateFilterOption == "null") {
      setOptions("All Launches");
    }
  }, [dateFilterOption]);

  const handleChange = (event) => {
    setOptions(event.target.value);
    dispatch(getLaunchFilter(event.target.value));
    if (event.target.value == "All Launches") {
      dispatch(getDateFilter(null));
    }
  };

  const menuList = [
    "All Launches",
    "Upcoming Launches",
    "Successful Launches",
    "Failed Launches",
  ];

  return (
    <Grid>
      <FormControl className={classes.formControl}>
        <Select
          labelId="select-label-for-launches"
          id="filterLaunches"
          disableUnderline={true}
          value={options}
          onChange={(event) => handleChange(event)}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {menuList.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
