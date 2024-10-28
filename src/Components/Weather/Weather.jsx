import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import humidity_icon from "../../assets/humidity.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cac506670dff9e6405026b6a539c7d1b`;
      const response = await fetch(url);
      const data = await response.json();
    //   console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed),
        Location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching data", error);
    }
  };
  useEffect(() => {
    search("Cairo");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input
          onClick={() => search(inputRef.current.value)}
          ref={inputRef}
          type="text"
          placeholder="Search..."
        />
        <img src={search_icon} alt="searchIcon" />
      </div>

      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="clearIcon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="Location">{weatherData.Location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidityIcon" />
              <div>
                <p className="humidity">{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
              <div className="col">
                <img src={wind_icon} alt="windIcon" />
                <div>
                  <p className="wind">{weatherData.windSpeed}km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
