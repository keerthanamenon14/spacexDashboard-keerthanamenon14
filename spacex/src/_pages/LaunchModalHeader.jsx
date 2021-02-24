import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import nasa from '../_assets/nasa.png'
import wikipedia from '../_assets/wikipedia.png'
import YouTubeIcon from '@material-ui/icons/YouTube';
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
        width: '90px',
        height:'90px'
      },
      missionImageBlock:{
        paddingRight: '10px'
      },
      missionDetailsContainer:{
        paddingRight: '10px'
      },
      imageStyle:{
        width:'30px',
        marginRight:'10px',
        marginTop:'10px',
        cursor:'pointer'
      }
})

export default function LaunchModalHeader({rowData}){
const classes = useStyles();
return(
    <Grid container direction="row">
        <Grid container>
            <Grid item className={classes.missionImageBlock}>
            {rowData.links.mission_patch_small&&   
                 <img src={rowData.links.mission_patch_small} 
                 alt="image"
                 className={classes.missionImage}
                 />
            }
            </Grid>
            <Grid item>
            <Grid container direction="column" className={classes.missionDetailsContainer}>
            <Grid item>
                <Typography style={{fontSize:'20px', lineHeight:'1.5'}}>{rowData.mission_name}</Typography>
            </Grid>
            <Grid item style={{fontSize:'15px', lineHeight:'1.5'}}>
                {rowData.rocket.rocket_name}
            </Grid>
            <Grid container>
              <Grid item> 
                  <img className={classes.imageStyle} 
                  src={nasa}
                  onClick={()=>window.open(rowData.links.article_link, '_blank')}  
                  >
                  </img>
              </Grid>
              <Grid item>
                {rowData.links.wikipedia&& 
                   <img className={classes.imageStyle} 
                   src={wikipedia}  
                   onClick={()=>window.open(rowData.links.wikipedia, '_blank')}            
                   >
                   </img>   
                }      
               </Grid>
              <Grid item>
                {rowData.links.video_link&&   
                  <YouTubeIcon 
                  onClick={()=>window.open(rowData.links.video_link, '_blank')}
                  className={classes.imageStyle}/>
                }
               </Grid>          
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