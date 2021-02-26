import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'

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
        </Grid>
    )
}

export default function Dashboard()
{
    return(
        <DashboardList/>
    )
}