import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import LaunchDetails from '../_pages/LaunchDetails.jsx'
import LaunchFilter from '../_pages/LaunchFilter.jsx'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    seperators:{
      paddingTop:'25px',
      paddingRight: '100px',
      paddingLeft: '100px',
      paddingBottom: '25px'
    }
  });

const DashboardList = ()=>{
    const classes = useStyles();
    return(
        <Grid 
        container
        direction="column"
        alignItems="center"
        justify="center"
        >
            <Grid item>
                <h1>SPACE X</h1>
            </Grid>
            <Grid container justify='space-between' className={classes.seperators}>
                <Grid item>
                    Hi
                </Grid>
                <Grid item>
                   <LaunchFilter/>
                </Grid>
            </Grid>
            <Grid container className={classes.containerData}>
                <LaunchDetails/>
            </Grid>          
        </Grid>
    )
}

export default function Dashboard()
{
    return(
        <DashboardList/>
    )
}