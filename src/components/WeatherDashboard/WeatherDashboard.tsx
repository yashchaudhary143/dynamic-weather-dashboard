import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import WeatherCard from '../WeatherCard/WeatherCard';
import HourlyForecast from '../HourlyForecast/HourlyForecast'
import DailyForecast from '../DailyForecast/DailyForecast'
// Define types for the weather data you will use
type WeatherData = {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
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

type HourlyWeather = {
    dt: number; // Time of the forecasted data, unix, UTC
    temp: number; // Temperature
    feels_like: number; // This temperature parameter accounts for the human perception of weather
    pressure: number; // Atmospheric pressure on the sea level, hPa
    humidity: number; // Humidity, %
    dew_point: number; // Atmospheric temperature below which water droplets begin to condense and dew can form
    clouds: number; // Cloudiness, %
    visibility: number; // Average visibility, metres
    wind_speed: number; // Wind speed
    wind_deg: number; // Wind direction, degrees (meteorological)
    weather: [
      {
        id: number; // Weather condition id
        main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
        description: string; // Weather condition within the group
        icon: string; // Weather icon id
      }
    ];
    pop: number; // Probability of precipitation
  };
  
  type DailyWeather = {
    dt: number; // Time of the forecasted data, unix, UTC
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
    temp: {
      day: number; // Day temperature
      min: number; // Min daily temperature
      max: number; // Max daily temperature
      night: number; // Night temperature
      eve: number; // Evening temperature
      morn: number; // Morning temperature
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number; // Atmospheric pressure on the sea level, hPa
    humidity: number; // Humidity, %
    dew_point: number; // Dew point
    wind_speed: number; // Wind speed
    wind_deg: number; // Wind direction, degrees (meteorological)
    weather: [
      {
        id: number; // Weather condition id
        main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
        description: string; // Weather condition within the group
        icon: string; // Weather icon id
      }
    ];
    clouds: number; // Cloudiness, %
    pop: number; // Probability of precipitation
    rain?: number; // Rain volume for the last 3 hours, mm
    snow?: number; // Snow volume for the last 3 hours, mm
    uvi: number; // UV index
  };
  

type ForecastData = {
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [city, setCity] = useState<string>('London'); // Default city
  const [error, setError] = useState<string | null>(null);
  const fetchCityName = (latitude: number, longitude: number) => {
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        const cityName = data.address.city || data.address.town || data.address.village;
        setCity(cityName);
      })
      .catch(error => {
        setError('Failed to fetch city name');
        console.error(error);
      });
  };

  // Function to get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchCityName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Unable to retrieve your location');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {
    const apiKey = 'd06720ad5843de82bfcbaa12c147ce76'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    // Fetch current weather data
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setError(null); // Clear any errors
  
        // Coordinates are needed for the One Call API
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`;
  
        // Fetch forecast data using the One Call API
        return fetch(oneCallUrl);
      })
      .then(forecastResponse => {
        if (!forecastResponse.ok) {
          throw new Error('Forecast data fetch failed');
        }
        return forecastResponse.json();
      })
      .then(forecastData => {
        setForecastData(forecastData);
      })
      .catch(error => {
        setError('Failed to fetch weather or forecast data');
        console.error(error);
      });
  }, [city]);
  useEffect(() => {
    // Call getUserLocation immediately and then set up the interval
    getUserLocation();
    const locationInterval = setInterval(() => {
      getUserLocation();
    }, 600000); // 3600000 ms = 1 hour

    // Clear the interval when the component is unmounted
    return () => clearInterval(locationInterval);
  }, []);

  // Function to handle city search
  const handleSearch = (selectedCity: string) => {
    setCity(selectedCity);
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {weatherData && (
  <>
    <h2>Current Weather</h2>
    <WeatherCard weatherData={weatherData} />
  </>
)}

{/* Uncomment and use these once you have the components ready */}
{forecastData && (
  <>
    <h2>Hourly Forecast</h2>
    <HourlyForecast hourlyData={forecastData.hourly} />
  </>
)}

{forecastData && (
  <>
    <h2>Daily Forecast</h2>
    <DailyForecast dailyData={forecastData.daily} />
  </>
)}

    </div>
  );
};

export default WeatherDashboard;
