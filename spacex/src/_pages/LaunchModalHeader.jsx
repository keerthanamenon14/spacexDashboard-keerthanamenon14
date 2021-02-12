import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    successChip:{
        width:' 70px',
        fontSize:'0.75rem',
        color:'#1b5e20',
        backgroundColor:'#e8f5e9'
      },
      failureChip:{
        width:' 70px',
        fontSize:'0.75rem',
        color:'#e53935',
        backgroundColor:'#ffebee'
      },
      upcomingChip:{
        width:' 70px',
        fontSize:'0.75rem',
        color:'#f57c00',
        backgroundColor:'#fff9c4'
      },
      missionImage:{
        width: '80px',
        height:'70px'
      },
      missionImageBlock:{
        paddingRight: '10px'
      },
      missionDetailsContainer:{
        paddingRight: '10px'
      }
})

export default function LaunchModalHeader({rowData}){
const classes = useStyles();
return(
    <Grid container direction="row">
        <Grid container>
            <Grid item className={classes.missionImageBlock}>
                 <img src={rowData.links.mission_patch_small} 
                 alt="image"
                 className={classes.missionImage}
                 />
            </Grid>
            <Grid item>
            <Grid container direction="column" className={classes.missionDetailsContainer}>
            <Grid item>
                <Typography style={{fontSize:'20px', lineHeight:'1.5'}}>{rowData.mission_name}</Typography>
            </Grid>
            <Grid item style={{fontSize:'15px', lineHeight:'1.5'}}>
                {rowData.rocket.rocket_name}
            </Grid>
            <Grid item>
                CRS-1
            </Grid>
            </Grid>
            </Grid>
            <Grid item>
            {rowData.launch_success && !rowData.upcoming?  
              <Chip  label="Success" className={classes.successChip}/>
              :
              !rowData.upcoming && rowData.launch_success !== 'true' && rowData.launch_success!== 'null'?
              <Chip  label="Failure"  className={classes.failureChip}/>
              :
              rowData.upcoming &&
              <Chip  label="Upcoming"  className={classes.upcomingChip}/>
              } 
            </Grid>
            </Grid>
        </Grid>
)
}