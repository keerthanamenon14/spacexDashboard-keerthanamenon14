import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LaunchModalHeader from "../_pages/LaunchModalHeader.jsx"
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    outerContainer:{
        paddingBottom : '10px'
    },
    table: {
        width: '100',
        lineHeight:'1px'
    },
    sideHeading:{
        width:'40%',
        borderBottom: "none"
    },
    rightData:{
        width:'70',
        borderBottom: "none"
    },
    divider:{
        width:'100%'
    },
    closeButton:{
        outline: 'none',
        backgroundColor:'inherit',
        border:'none',
        cursor:'pointer'
    },
    dialogPaper:{
        width:'800px',
        height:'700px', 
        marginTop:'30', 
        overflow: 'scroll',
        padding : '30px'
    }
}))

export default function LaunchDetailsModal({open,onClose,rowDetails}) {
    const classes= useStyles()
    return(
    <Grid >
    <Dialog 
     open={open} 
     onClose={onClose} 
     disableBackdropClick
     classes={{ paper: classes.dialogPaper }}
     >
        <Grid container direction="column" className={classes.outerContainer}>
            <Grid container justify='space-between'>  
                <Grid item>            
                <LaunchModalHeader rowData={rowDetails}/>
                </Grid>
                <Grid item>
                <button className={classes.closeButton}><CloseIcon onClick={onClose}/></button>
                </Grid> 
            </Grid>
            <Grid item style={{marginBottom:'40px'}}>
                <p>{rowDetails.details}</p>
                <a href={rowDetails.links.wikipedia}  style={{ textDecoration: 'none' }}
                target="_blank" >
                Wikipedia
                </a>
            </Grid>
            <Grid item>
                         <TableContainer >
                         <Table aria-label="modal table" className={classes.table}>
                          <TableBody>
                          <TableRow key={1}  >
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Flight Number</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.flight_number}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Mission Name</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.mission_name}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Rocket Type</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.rocket.rocket_type}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Rocket Name</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.rocket.rocket_name}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Manufacturer</TableCell>
                          <TableCell className={classes.rightData}>{rowDetails.rocket.second_stage.payloads[0].manufacturer}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Nationality</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.rocket.second_stage.payloads[0].nationality}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Launch Date</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.launch_date_utc}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading}>Payload Type</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.rocket.second_stage.payloads[0].payload_type}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Orbit</TableCell>
                          <TableCell className={classes.rightData}>{rowDetails.rocket.second_stage.payloads[0].orbit}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>  
                          <Grid container direction="row">
                          <TableCell className={classes.sideHeading} >Launch Site</TableCell>
                          <TableCell className={classes.rightData}> {rowDetails.launch_site.site_name}</TableCell>
                          <Divider className={classes.divider}/>
                          </Grid>                  
                          </TableRow>
                         </TableBody>
                         </Table>
                         </TableContainer>
            </Grid>         
        </Grid>
    </Dialog>
    </Grid>
)
}