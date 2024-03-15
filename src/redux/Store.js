import { combineReducers, configureStore } from '@reduxjs/toolkit';
import WeatherReducer from './reducer/WeatherReducer'; 
import ForecastReducer from './reducer/ForecastReducer';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  forecast: ForecastReducer,
});

const store = configureStore({
    reducer: rootReducer,
  });

export default store;
