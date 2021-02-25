import {
  GET_LAUNCH_DETAILS_SUCCESS,
  GET_LAUNCH_DETAILS_FAILURE,
  GET_LAUNCH_FILTER_SUCCESS,
  GET_DATE_FILTER_SUCCESS,
} from "../_constants/constants";

const initialState = {
  loading: true,
  launchFilter: "",
  dateFilter: "",
  data: "",
  error: null,
  menuOptions: {
    clear: "All Launches",
    [[null]]: "Upcoming Launches",
    true: "Successful Launches",
    false: "Failed Launches",
  },
};

export const LaunchDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAUNCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_LAUNCH_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        data: "",
        error: action.payload,
      };
    case GET_LAUNCH_FILTER_SUCCESS:
      return {
        ...state,
        launchFilter: action.payload,
      };
    case GET_DATE_FILTER_SUCCESS:
      return {
        ...state,
        dateFilter: action.payload,
      };
    default:
      return state;
  }
};
