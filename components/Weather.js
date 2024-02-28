import React from "react";
import styles from "../styles/weather.module.css";
import { useState, useEffect } from "react";
import { addWeatherToStore, removeWeatherToStore } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function Weather() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.value);

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const infoWeather = {
    cityName: city,
  };
  const fetchWeatherData = () => {
    if (city === "") {
      alert("write city");
    }
    //1
    fetch(`https://backend-discover.vercel.app/weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoWeather),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          setWeatherData(data.weather);
          dispatch(addWeatherToStore(data.weather));
          console.log(data.weather);
          setCity("");
          setError(null);
        } else {
          setWeatherData(null);
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données météorologiques :",
          error
        );
        setWeatherData(null);
        setError("Erreur de réseau");
      });
  };
  const deleteCity = (cityName) => {
    fetch(`https://backend-discover.vercel.app/weather/${cityName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(infoWeather), // assurez-vous que infoWeather contient les données nécessaires pour supprimer la ville
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete city");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log("City deleted:", data);
        // Update state or perform other actions as necessary
        setCity("");
        setWeatherData("");
        setError(null);
      })
      .catch((error) => {
        console.error("Error deleting city:", error);
      });
  };

  //image icon
  const renderWeatherIcon = () => {
    if (!weatherData) return null;
    // Map weather description to corresponding image/icon
    const weatherIcons = {
      "clear sky": "clear.png",
      "overcast clouds": "Clouds.png",
      "light rain": "Rain.png",
      "few clouds": "Clouds.png",
      "scattered clouds": "Clouds.png",
      "moderate rain": "Rain.png",
      snow: "snow.jpg",
      "broken clouds": "brokenClouds.png",
      "light snow": "lightSnow.png",

      // Add more mappings as needed
    };
    const weatherDescription = weatherData.description.toLowerCase();
    const iconUrl = weatherIcons[weatherDescription];
    return <img className={styles.icon} src={iconUrl} alt="Weather" />;
  };
  const handleRemoveweather = () => {
    dispatch(removeWeatherToStore());
  };
  //color temp
  const getTemperatureColor = () => {
    // Supposons que vous définissez une plage de température pour "chaud" et "froid"
    const temperature = parseInt(weatherData.temp); // Assurez-vous de convertir en entier
    if (temperature > 25) {
      return styles.hotTemperature; // Classe CSS pour la température chaude
    } else if (temperature < 10) {
      return styles.coldTemperature; // Classe CSS pour la température froide
    } else {
      return styles.normalTemperature; // Classe CSS pour la température normale
    }
  };

  return (
    <div className={styles.containerProfil}>
      <div className={styles.meteo}>
        <h2 style={{ color: "white", textShadow: "2px 2px 4px black" }}>
          Give me the meteo
        </h2>
        <input
          placeholder="Nom de la ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onClick={deleteCity}
        />
        <button
          style={{
            color: "white",
            backgroundColor: "#16a085",
            boxShadow: "2px 2px 4px black",
          }}
          title="Obtenir la météo"
          onClick={fetchWeatherData}
        >
          Obtenir Météo
        </button>
        {/*<div className={styles.result}>
          <p>Ville: {User.cityName}</p>
          <p>Conditions: {User.description}</p>

          <p>Temp: {User.temp}</p>
          <p>Temp min: {User.tempMin}</p>
          <p>Temp max: {User.tempMax}</p>
          <button onClick={() => handleRemoveweather()}>Remove</button>
        </div>*/}
        <div>
          {weatherData && (
            <div className={styles.result}>
              <span style={{ color: "#52AB6E" }}>
                Météo pour: {User.username.toUpperCase()}
              </span>
              <p className={styles.textMeteo}>
                Ville: {User.cityName.toUpperCase()}
              </p>
              <p className={styles.textMeteo}>
                Description : {weatherData.description}
              </p>
              {renderWeatherIcon()}
              <p className={`{styles.textMeteo} ${getTemperatureColor()}`}>
                Température : {weatherData.temp}
              </p>

              <p className={`{styles.textMeteo} ${getTemperatureColor()}`}>
                Température minimale : {weatherData.tempMin}
              </p>
              <p className={`{styles.textMeteo} ${getTemperatureColor()}`}>
                Température maximale : {weatherData.tempMax}
              </p>
              {/*
                <button
                  style={{
                    color: "white",
                    backgroundColor: "#16a085",
                    boxShadow: "2px 2px 4px black",
                    width: "45%",
                  }}
                  title="Supprimer la ville"
                  onClick={deleteCity}
                >
                  Supprimer
                </button>
                */}
            </div>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
