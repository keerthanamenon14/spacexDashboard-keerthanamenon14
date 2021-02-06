import {
    GET_LAUNCH_DETAILS_SUCCESS,
    GET_LAUNCH_DETAILS_FAILURE
} from '../_constants/constants'

const initialState = {
    loading: true,
    data: '',
    error: null
}

export const LaunchDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LAUNCH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: true,
                data: action.payload
            }
        case GET_LAUNCH_DETAILS_FAILURE:
            return{
                ...state,
                loading: false,
                data: '',
                error: action.payload
            }
        default:
            return state
    }
}
