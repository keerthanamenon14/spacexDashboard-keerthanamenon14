import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
    outerContainer:{
        padding : '40px'
    },
    table: {
        width: '100%',
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
    }
}))

export default function LaunchDetailsModal({open,onClose,rowDetails}) {
    console.log(rowDetails)
    const classes= useStyles()
    return(
    <Grid >
    <Dialog 
     open={open} 
     onClose={onClose} 
     disableBackdropClick
     PaperProps={{style:{width:'700px', height:'800px', marginTop:'30', overflow: 'hidden'}}}
     >
        <Grid container direction="column" className={classes.outerContainer}>
            <Grid item container justify='space-between'>
                <h3>LAUNCH NAME</h3>
                <button className={classes.closeButton}><CloseIcon onClick={onClose}/></button>
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