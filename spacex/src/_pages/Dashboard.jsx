import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import LaunchDetails from '../_pages/LaunchDetails.jsx'
const DashboardList = ()=>{
    return(
        <Grid 
        container
        direction="column"
        >
            <Grid item
            
            justify="center"
            alignItems="center"
            >
                <h1>SPACE X</h1>
            </Grid>
            <Grid item>
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