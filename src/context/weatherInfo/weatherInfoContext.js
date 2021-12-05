import { useState, useEffect, createContext } from 'react';


let API_KEY;

if (process.env.NODE_ENV !== 'production') {
  API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
} else {
  API_KEY = process.env.OPENWEATHERMAP_API_KEY;
}


export const WeatherInfoContext = createContext();

const WeatherInfoContextProvider = ({ children }) => {


  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    statusCode: '',
    statusMessage: ''
  });
  const [weatherData, setWeatherData] = useState({});
  const [hasLocation, setHasLocation] = useState(false);

  let unit = 'metric';

  const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;
  // const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/onecall`;
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const appID = `&appid=${API_KEY}`;
  let queryUnit = `&units=${unit}`;


  const searchLocation = async (searchTerm) => {


    if (searchTerm === '') {
      setErrorInfo({
        statusCode: '401',
        statusMessage: 'Please Enter Location'
      });
      return;
    }

    setErrorInfo({
      statusCode: '',
      statusMessage: ''
    });

    setIsLoading(true);
    const city = `?q=${searchTerm}`;
    const response = await fetch(`${API_ENDPOINT_WEATHER}${city}${queryUnit}${appID}`);
    const data = await response.json();

    if (data.cod === 200) {
      setHasLocation(true);
      setWeatherData(data);
      setLocation(data);
      setIsLoading(false);
    } else {
      setErrorInfo({
        statusCode: data.cod,
        statusMessage: data.message
      });
      setIsLoading(false);
    }

  };


  const getCoords = () => {

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      searchPosition(position);
    });
  };


  const searchPosition = async (position) => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const spot = `?lat=${lat}&lon=${lon}`;

    const response = await fetch(`${API_ENDPOINT_WEATHER}${spot}${appID}`);
    const data = await response.json();
    searchLocation(data.name);
    setIsLoading(false);
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
    setIsLoading(false);
    setWeatherData({});
    setErrorInfo({
      statusCode: '',
      statusMessage: ''
    });
  };


  useEffect(() => {
    let weatherLocation = JSON.parse(localStorage.getItem('weatherLocation'));
    if (weatherLocation) {
      searchLocation(weatherLocation.city);
    }
    // eslint-disable-next-line
  }, [hasLocation]);


  return (
    <WeatherInfoContext.Provider
      value={{
        weatherData,
        searchLocation,
        isLoading,
        errorInfo,
        hasLocation,
        resetLocation,
        getCoords
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContextProvider;