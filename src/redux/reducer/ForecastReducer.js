import { FETCH_FORECAST_REQUEST, FETCH_FORECAST_SUCCESS, FETCH_FORECAST_FAILURE } from '../action/ActionTypes.js';

const initialState = {
  forecastData: [],
  loading: false,
  error: ''
};

const ForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORECAST_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecastData: action.payload,
        error: ''
      };
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        forecastData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default ForecastReducer;
