import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
  } from "../action/ActionTypes.js";
  
  const initialState = {
    loading: false,
    weatherData: null,
    error: ""
  };
  
  const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_WEATHER_SUCCESS:
        return {
          ...state,
          loading: false,
          weatherData: action.payload,
          error: ""
        };
      case FETCH_WEATHER_FAILURE:
        return {
          ...state,
          loading: false,
          weatherData: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default WeatherReducer;
  