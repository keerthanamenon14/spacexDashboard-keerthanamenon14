import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LaunchDetails from "../_pages/LaunchDetails.jsx";
import LaunchFilter from "../_pages/LaunchFilter.jsx";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import DateRange from "../_pages/DateRange.jsx";
import spaceX from "../_assets/spaceX.png";

const useStyles = makeStyles({
  seperators: {
    paddingTop: "25px",
    paddingRight: "300px",
    paddingLeft: "300px",
    paddingBottom: "25px",
  },
  containerData: {
    paddingTop: "25px",
    paddingRight: "200px",
    paddingLeft: "200px",
    paddingBottom: "25px",
  },
  spaceXImg: {
    width: "550px",
    padding: "20px",
  },
});

const DashboardList = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item>
        <img src={spaceX} className={classes.spaceXImg}></img>
      </Grid>
      <Divider style={{ width: "100%" }} />
      <Grid container justify="space-between" className={classes.seperators}>
        <Grid item>
          <DateRange />
        </Grid>
        <Grid item>
          <LaunchFilter />
        </Grid>
      </Grid>
      <Grid container className={classes.containerData}>
        <LaunchDetails />
      </Grid>
    </Grid>
  );
};

export default function Dashboard() {
  return <DashboardList />;
}
