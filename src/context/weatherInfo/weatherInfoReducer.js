import {
  SEARCH_CITY,
  GET_WEATHER,
  GET_USER_LOCATION,
  CLEAR_USER_LOCATION,
  SET_IS_LOADING
} from '../actions';

// eslint-disable-next-line 
export default (state, action) => {

  switch (action.type) {

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_WEATHER:
      console.log('weatherInfoReducer', action.payload);
      return {
        ...state,
        weatherData: action.payload,
        isLoading: false
      };

    default:
      return state;
  }


};