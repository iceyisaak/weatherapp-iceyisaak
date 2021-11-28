import {
  useState,
  useEffect,
  createContext
} from 'react';


let API_KEY;

if (process.env.NODE_ENV !== 'production') {
  API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
} else {
  API_KEY = process.env.OPENWEATHERMAP_API_KEY;
}



const WeatherInfoContext = ({ children }) => {

  const weatherInfoContext = createContext();

  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});


  let city = 'frankfurt';
  let unit = 'metric';


  // const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=frankfurt&appid=${API_KEY}`;
  // const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;
  const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/onecall`;
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const API_ENDPOINT_GEOCODING = `http://api.openweathermap.org/geo/1.0/direct`;
  const appID = `&appid=${API_KEY}`;
  const queryLocation = `?q=${city}`;
  let queryUnit = `&units=${unit}`;





  const getWeatherData = async (lat, lon) => {
    // const response = await fetch(`${API_ENDPOINT_WEATHER}${queryLocation}${queryUnit}${appID}`);
    const location = `?lat=${lat}&lon=${lon}`;
    const response = await fetch(`${API_ENDPOINT_WEATHER}${location}${appID}`);
    const data = await response.json();
    console.log('fetchWeatherInfo()', data);
    console.log(location);
    console.log('CCCCC');
  };


  const searchLocation = async (searchTerm) => {

    setIsLoading(true);
    console.log('AAAAA');
    const res = await fetch(`${API_ENDPOINT_GEOCODING}?q=${searchTerm}${appID}`);
    const data = await res.json();
    // setSearchTerm(data);
    // console.log('data', data[0].name);
    console.log('data[0].lat', data[0].lat);
    console.log('data[0].lon', data[0].lon);
    console.log('data[0].name', data[0].name);
    console.log('data[0].country', data[0].country);

    const lat = data[0].lat;
    const lon = data[0].lon;
    const name = data[0].name;
    const country = data[0].country;

    getWeatherData(lat, lon);
    setIsLoading(false);

    console.log('BBBBB');
  };






    return (
      <weatherInfoContext.Provider
        value={{
          weatherData,
          searchLocation,
          isLoading
        }}
      >
        {children}
      </weatherInfoContext.Provider>
    );
  };


  export default WeatherInfoContext;


// // Logic
// 1. getWeatherByCity
 //2 . getWeatherByCoord







