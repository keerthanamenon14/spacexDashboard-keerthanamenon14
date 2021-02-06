import axios from 'axios'
import * as types from '../_constants/constants'


const getLaunchDetailsSuccess = (data) => {
    return {
        type: types.GET_LAUNCH_DETAILS_SUCCESS,
        payload: data
    }
}

const getLaunchDetailsFailure = (error) => {
    return {
        type: types.GET_LAUNCH_DETAILS_FAILURE,
        payload: error
    }
}

export const getLaunchDetails = () =>{
    return (dispatch) =>{
        return axios.get('https://api.spacexdata.com/v3/launches').
        then((response) => {
            const data = response.data
            dispatch(getLaunchDetailsSuccess(data))
        })
        .catch((error) =>{
            const errorMsg = error.response.data.message
            dispatch(getLaunchDetailsFailure(errorMsg))
        })
    }
}