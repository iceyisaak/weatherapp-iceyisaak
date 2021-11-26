import { useEffect, useReducer } from 'react';
import moment from 'moment';
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
    weatherData: {},
    time: ''
  };
  let city = 'frankfurt';
  let unit = 'metric';

  const [state, dispatch] = useReducer(weatherInfoReducer, initialState);

  // const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=frankfurt&appid=${API_KEY}`;
  const API_ENDPOINT_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;
  const API_ENDPOINT_FORECAST = `https://api.openweathermap.org/data/2.5/onecall`;
  const appID = `&appid=${API_KEY}`;
  const queryLocation = `?q=${city}`;
  let queryUnit = `&units=${unit}`;

  const fetchWeatherInfo = async () => {
    getCurrentWeatherData();
  };

  const getCurrentWeatherData = async () => {
    const response = await fetch(`${API_ENDPOINT_WEATHER}${queryLocation}${queryUnit}${appID}`);
    const data = await response.json();
    console.log('fetchWeatherInfo()', data);
    const location = `?lat=${data.coord.lat}&lon=${data.coord.lon}`;
    console.log(location);

    dispatch({
      type: GET_WEATHER,
      payload: data
    });
  };




  const getUserLocation = (city, { coord }) => {

    if (city) {
      // l
    }

    if ({ coord }) {

    }


  };



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



export default WeatherInfoState;;

/*
1.gutUserLocation()
- City Search or Device Location
2. fetchWeatherData()
*/