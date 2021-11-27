import { useEffect, useReducer } from 'react';
import moment from 'moment';
import weatherInfoContext from './weatherInfoContext';
import weatherInfoReducer from './weatherInfoReducer';
import {
  SEARCH_LOCATION,
  GET_WEATHER,
  GET_USER_LOCATION,
  CLEAR_USER_LOCATION,
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
      lon: '',
      city: '',
      country: ''
    },
    weatherData: {},
  };
  let city = 'frankfurt';
  let unit = 'metric';

  const [state, dispatch] = useReducer(weatherInfoReducer, initialState);

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

    dispatch({
      type: GET_WEATHER,
      payload: data
    });

    console.log('CCCCC');
  };


  const searchLocation = async (searchTerm) => {

    setIsLoading();
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
    // getUserLocation(lat, lon, name, country);

    dispatch({
      type: SEARCH_LOCATION,
      payload: {
        lat: lat,
        lon: lon,
        city: name,
        country: country
      },
    });

    console.log('BBBBB');
  };


  const getUserLocation = (lat, lon, name, country) => {

    if (lat && lon) {
      console.log('lat', lat);
      console.log('lon', lon);
    }

    if (name) {
      console.log('city, country', name, country);
    }



  };



  const setIsLoading = () => {
    dispatch({
      type: SET_IS_LOADING
    });
  };



  // useEffect(() => {
  //   setIsLoading();
  //   fetchWeatherInfo();
  // }, []);

  console.log('state.userLocation', state.userLocation);


  return (
    <weatherInfoContext.Provider
      value={{
        weatherData: state.weatherData,
        userLocation: state.userLocation,
        searchLocation
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