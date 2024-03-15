import React, { useEffect, useState } from "react";
import {  errorMessage ,imageUrl} from "../../constants/Constants";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import { fetchWeather } from "../../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import Forecast from "../forecast/Forecast";
import "../../assets/Weather.scss";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weather.weatherData);
  const [city, setCity] = useState("Gandhinagar");
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    dispatch(fetchWeather(city, isCelsius)); 
  }, [dispatch, city, isCelsius]);    


  useEffect(() => {
    dispatch(fetchWeather(city, isCelsius)); 
  }, [dispatch, city, isCelsius]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchCity = formData.get("search");
    setCity(searchCity);
  };

  

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather">
      <div className="container col-md-5 mt-5">
        <div className="card">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control m-2"
              type="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success m-2" type="submit">
              Search
            </button>
          </form>
          {weatherData && (
            <div className="card-body">
              <img
                src={`${imageUrl}${weatherData.weatherIcon}.png`}
                alt="Weather Icon"
                className="weather-icon"
              />
              <h5 className="weatherCity">{weatherData.city}</h5>
              <p className="weatherDescription">
                <b>Description:</b>
                {weatherData.description}
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-md-between">
                <h6 className="weatherTemp">
                  <b>Temperature:</b> {weatherData.temperature}{" "}
                  {isCelsius ? "°C" : "°F"}
                  <div className="toggler m-3">
                  fahrenheit
                    {isCelsius ? (
                      <BsToggle2On
                        className="toggler m-3"
                        style={{ fontSize: "2em" }}
                        onClick={toggleTemperatureUnit}
                      />
                    ) : (
                      <BsToggle2Off
                        className="toggler m-3"
                        style={{ fontSize: "2em" }}
                        onClick={toggleTemperatureUnit}
                      />
                    )}
                    Celcius
                  </div>
                </h6>
                <h6 className="weatherHumidity">
                  <b>Humidity:</b> {weatherData.humidity}%
                </h6>
                <h6 className="windSpeed">
                  <b>Wind Speed:</b> {weatherData.windSpeed} m/s
                </h6>
              </div>
            </div>
          )}
          {!weatherData && (
            <div className="noData m-5" style={{ color: "red" }}>
              <p>
                <b>{errorMessage}</b>
              </p>
            </div>
          )}
        </div>
      </div>
      {weatherData && <Forecast city={city} isCelsius={isCelsius} />}
    </div>
  );
};

export default Weather;
