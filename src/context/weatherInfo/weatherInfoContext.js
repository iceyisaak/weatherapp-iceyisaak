import {
  useState,
  createContext
} from 'react';


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
  // const [lat, setLat] = useState(JSON.parse(localStorage.getItem('lat') || []));
  // const [lon, setLon] = useState(JSON.parse(localStorage.getItem('lon') || []));


  // let city = 'frankfurt';
  let unit = 'metric';
  // let lat = 50.1109;
  // let lon = 8.6821;


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
    console.log('searchLocation()');
    setWeatherData(data);
    setLocation(data);
    setIsLoading(false);
  };


  const setLocation = (data) => {
    console.log('city:', data.name);
    console.log('lat:', data.coord.lat);
    console.log('lon:', data.coord.lon);
  };


  return (
    <WeatherInfoContext.Provider
      value={{
        weatherData,
        searchLocation,
        isLoading,
        hasLocation
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
