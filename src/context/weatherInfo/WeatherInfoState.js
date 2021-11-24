import { useEffect, useReducer } from 'react';
import weatherInfoContext from './weatherInfoContext';
import weatherInfoReducer from './weatherInfoReducer';
import {
  SEARCH_CITY,
  GET_WEATHER,
  GET_USER_LOCATION,
  CLEAR_USER_LOCATIONCLEAR_USER_LOCATION,
  SET_IS_LOADING
} from '../actions';


let API_KEY;

if (process.env.NODE_ENV !== 'production') {
  API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
} else {
  API_KEY = process.env.OPENWEATHERMAP_API_KEY;
}

const WeatherInfoState = ({ children }) => {

  const initialState = {
    isLoading: false,
    userLocation: {
      lat: '',
      lon: ''
    },
    weatherData: {}
  };
  let city = 'frankfurt';
  let unit = 'metric';

  const [state, dispatch] = useReducer(weatherInfoReducer, initialState);

  // const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=frankfurt&appid=${API_KEY}`;
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather`;
  const appID = `&appid=${API_KEY}`;
  const queryLocation = `?q=${city}`;
  let queryUnit = `&units=${unit}`;

  const fetchWeatherInfo = async () => {
    const response = await fetch(`${API_ENDPOINT}${queryLocation}${queryUnit}${appID}`);
    const data = await response.json();
    console.log('fetchWeatherInfo()', data);

    dispatch({
      type: GET_WEATHER,
      payload: data
    });
  };

  // const getWeather = () => {

  // };

  const setIsLoading = () => {
    dispatch({
      type: SET_IS_LOADING
    });
  };

  useEffect(() => {
    setIsLoading();
    fetchWeatherInfo();
  }, []);

  return (
    <weatherInfoContext.Provider
      value={{
        weatherData: state.weatherData
      }}
    >
      {children}
    </weatherInfoContext.Provider>
  );
};



export default WeatherInfoState;
