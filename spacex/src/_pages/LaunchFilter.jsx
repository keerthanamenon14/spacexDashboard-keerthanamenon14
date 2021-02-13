import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {getLaunchFilter} from '../_redux/_actions/LaunchDetailsActions'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import Select from '@material-ui/core/Select';
import { ListItemIcon,ListItemText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import LaunchDetails from '../_pages/LaunchDetails.jsx'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    label:{
        top:'23px',
        left:'50px',
        fontSize: '25px'
    }
  }));

export default function LaunchFilter() {
    const classes= useStyles()
    const dispatch = useDispatch()
    const [options, setOptions] = useState('All Launches')

    const handleChange = (event) => {
      console.log(event)
      setOptions(event.target.value);
      dispatch(getLaunchFilter(event.target.value))
    };

    const menuList = ['All Launches','Upcoming Launches','Successful Launches','Failed Launches'];

    return(
    <Grid>
        <FormControl className={classes.formControl}>
         {/* <SortIcon className={classes.label}/> */}
         {/* <InputLabel id="select-label">{options}</InputLabel> */}
         <Select
          labelId="select-label-for-launches"
          id="filterLaunches"
          disableUnderline={true}
          value={options}
          onChange={(event)=>handleChange(event)}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          {menuList.map((item, index)=>
            <MenuItem key={index} value={item}>
            {item}
            </MenuItem>
          )}
        </Select>
        </FormControl>
    </Grid>
    )
}