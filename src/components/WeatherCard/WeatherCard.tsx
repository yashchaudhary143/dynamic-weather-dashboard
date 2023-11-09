// src/components/WeatherCard/WeatherCard.tsx
import React from 'react';
import styles from './WeatherCard.module.css'; // Import the CSS module
type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
};

const WeatherCard: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{weatherData.name}</h2>
      </div>
      <div className={styles.cardBody}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
        />
        <p className={styles.temperature}>{weatherData.main.temp.toFixed(1)}°C</p>
        <p className={styles.weatherDescription}>{weatherData.weather[0].description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.details}>
          <p>High: {weatherData.main.temp_max.toFixed(1)}°C</p>
          <p>Low: {weatherData.main.temp_min.toFixed(1)}°C</p>
        </div>
        <div className={styles.details}>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
