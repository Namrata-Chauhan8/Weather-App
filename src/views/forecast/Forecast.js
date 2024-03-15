import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForecast } from "../../redux/action/Actions";
import { imageUrl } from "../../constants/Constants";
import "../../assets/Forecast.scss";

const Forecast = ({ city, isCelsius }) => {
  const dispatch = useDispatch();
  const forecastData = useSelector((state) => state.forecast.forecastData);

  useEffect(() => {
    dispatch(fetchForecast(city));
  }, [dispatch, city]);

  const forecastByDay = (forecastList) => {
    const groupedForecast = {};
    forecastList.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push(forecast);
    });
    return groupedForecast;
  };

  const convertTemperature = (kelvin) => {
    return isCelsius
      ? Math.floor(kelvin - 273.15)
      : Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
  };

  return (
    <div className="container2 mt-5">
      <div className="forecast-grid">
        {Object.keys(forecastByDay(forecastData)).map((date, index) => (
          <div key={index} className="forecast-column">
            <div
              className="card border-info mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">
                <b>{date}</b>
              </div>
              <div className="card-body">
                {forecastByDay(forecastData)[date].map((forecast, id) => (
                  <div key={id} className="card border-info mb-3">
                    <div className="card-header">
                      <b>Time: </b>
                      {forecast.dt_txt.split(" ")[1]}
                    </div>
                    <div className="card-body">
                      <img
                        src={`${imageUrl}${forecast.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="weather-icon"
                      />

                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <b>Description:</b>
                            </td>
                            <td>{forecast.weather[0].description}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Temperature:</b>
                            </td>
                            <td>
                              {convertTemperature(forecast.main.temp)}{" "}
                              {isCelsius ? "°C" : "°F"}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Humidity:</b>
                            </td>
                            <td>{forecast.main.humidity}%</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Wind Speed:</b>
                            </td>
                            <td>{forecast.wind.speed} m/s</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
