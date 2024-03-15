import React, { useEffect, useState } from "react";
import { apiKey, errorMessage } from "../../constants/Constants";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import Forecast from "../forecast/Forecast";
import axios from "axios";
import "./Weather.scss";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Gandhinagar");
  const [isCelsius, setIsCelsius] = useState(true);
  const weatherInfo = (cityName) => {
    if (!cityName) {
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(url)
      .then((res) => {
        const temperature = isCelsius
          ? celcius(res.data.main.temp)
          : fahrenheit(res.data.main.temp);
        setWeatherData({
          temperature: temperature,
          humidity: res.data.main.humidity,
          city: res.data.name,
          description: res.data.weather[0].description,
          weatherIcon: res.data.weather[0].icon,
          windSpeed: res.data.wind.speed,
        });
      })
      .catch((error) => {
        console.log("error", error);
        setWeatherData(null);
      });
  };

  useEffect(() => {
    weatherInfo(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchCity = formData.get("search");
    setCity(searchCity);
  };

  const celcius = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  };

  const fahrenheit = (kelvin) => {
    return Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
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
                src={`http://openweathermap.org/img/w/${weatherData.weatherIcon}.png`}
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
                    Fehrenhit
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
