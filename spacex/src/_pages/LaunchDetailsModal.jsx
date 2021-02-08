import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

export default function LaunchDetailsModal({open,onClose}) {
return(
    <Grid >
    <Dialog 
     open={open} 
     onClose={onClose} 
     disableBackdropClick
     PaperProps={{style:{width:'700px', height:'800px', marginTop:'30'}}}
     >
        <h1>Hiiii</h1>
        <button onClick={onClose}>close</button>
    </Dialog>
    </Grid>
)
}