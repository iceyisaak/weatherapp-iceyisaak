import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';

import { WeatherInfoContext } from '../../context/weatherInfo/WeatherInfoContext';
import { useContext } from 'react';

const Home = () => {

  const {
    hasLocation,
    isLoading
  } = useContext(WeatherInfoContext);

  return (
    <div>
      <h1>Weatherapp</h1>
      {isLoading && <h1>LOADING...</h1>}
      {!hasLocation ?
        <SearchBar /> :
        <WeatherDisplay />
      }
    </div>
  );
};

export default Home;
