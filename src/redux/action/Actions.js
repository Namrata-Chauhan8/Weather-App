import axios from "axios";
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_FORECAST_REQUEST,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE,
} from "./ActionTypes";
import {
  apiKey,
  apiUrl,
  forecastUrl,
  imageUrl,
} from "../../constants/Constants";

const celcius = (kelvin) => {
  return Math.floor(kelvin - 273.15);
};

const fahrenheit = (kelvin) => {
  return Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
};

const fetchWeatherRequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST,
  };
};

const fetchWeatherSuccess = (weatherData) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: weatherData,
  };
};

const fetchWeatherFailure = (error) => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error,
  };
};

export const fetchWeather = (cityName, isCelsius) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest());
    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}`;
    axios
      .get(url)
      .then((res) => {
        const temperature = isCelsius
          ? celcius(res.data.main.temp)
          : fahrenheit(res.data.main.temp);
        const iconUrl = `${imageUrl}${res.data.weather[0].icon}.png`;
        const weatherData = {
          temperature: temperature,
          humidity: res.data.main.humidity,
          city: res.data.name,
          description: res.data.weather[0].description,
          weatherIcon: res.data.weather[0].icon,
          windSpeed: res.data.wind.speed,
          iconUrl: iconUrl,
        };
        dispatch(fetchWeatherSuccess(weatherData));
      })
      .catch((error) => {
        dispatch(fetchWeatherFailure(error.message));
      });
  };
};

export const fetchForecast = (city) => {
  return (dispatch) => {
    dispatch(fetchForecastRequest());
    const url = `${forecastUrl}?q=${city}&appid=${apiKey}`;
    axios
      .get(url)
      .then((res) => {
        dispatch(fetchForecastSuccess(res.data.list));
      })
      .catch((error) => {
        dispatch(fetchForecastFailure(error.message));
      });
  };
};

const fetchForecastRequest = () => {
  return {
    type: FETCH_FORECAST_REQUEST,
  };
};

const fetchForecastSuccess = (forecastData) => {
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: forecastData,
  };
};

const fetchForecastFailure = (error) => {
  return {
    type: FETCH_FORECAST_FAILURE,
    payload: error,
  };
};
