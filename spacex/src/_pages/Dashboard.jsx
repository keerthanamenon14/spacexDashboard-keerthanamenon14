import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import LaunchDetails from '../_pages/LaunchDetails.jsx'

const DashboardList = ()=>{
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
            <Grid container>
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