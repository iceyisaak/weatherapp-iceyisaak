import {
  useState,
  createContext
} from 'react';
import { useEffect } from 'react/cjs/react.development';


let API_KEY;

if (process.env.NODE_ENV !== 'production') {
  API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
} else {
  API_KEY = process.env.OPENWEATHERMAP_API_KEY;
}


export const WeatherInfoContext = createContext();

const WeatherInfoContextProvider = ({ children }) => {


  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [hasLocation, setHasLocation] = useState(false);

  let unit = 'metric';

  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=frankfurt&appid=${API_KEY}`;
  const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;
  // const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/onecall`;
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const API_ENDPOINT_GEOCODING = `http://api.openweathermap.org/geo/1.0/direct`;
  const appID = `&appid=${API_KEY}`;
  // const queryLocation = `?q=${city}`;
  let queryUnit = `&units=${unit}`;


  const searchLocation = async (searchTerm) => {

    setIsLoading(true);
    const city = `?q=${searchTerm}`;
    setHasLocation(true);
    const response = await fetch(`${API_ENDPOINT_WEATHER}${city}${queryUnit}${appID}`);
    const data = await response.json();
    // console.log('searchLocation()', data.cod, data.message);

    if (data.cod === 200) {
      console.log('cod === 200');
      setWeatherData(data);
      setLocation(data);
      setIsLoading(false);
    }

    if (data.cod === 404) {
      console.log('cod === 404');
      console.log('ERROR: City Not Found.');
      setIsLoading(false);
    }

  };


  const setLocation = (data) => {

    const weatherLocationObj = {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon
    };

    localStorage.setItem('weatherLocation', JSON.stringify(weatherLocationObj));
  };

  const resetLocation = () => {
    localStorage.removeItem('weatherLocation');
    setHasLocation(false);
  };


  useEffect(() => {
    let weatherLocation = JSON.parse(localStorage.getItem('weatherLocation'));
    if (weatherLocation) {
      searchLocation(weatherLocation.city);
    }
  }, [hasLocation]);


  return (
    <WeatherInfoContext.Provider
      value={{
        weatherData,
        searchLocation,
        isLoading,
        hasLocation,
        resetLocation
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContextProvider;


// // Logic
// 1. getWeatherByCity
 //2 . getWeatherByCoord
