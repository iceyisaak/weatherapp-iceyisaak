import { useContext } from 'react';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import { WeatherInfoContext } from '../../context/weatherInfo/WeatherInfoContext';

import style from './home.module.scss';

const Home = () => {

  const {
    hasLocation,
    isLoading
  } = useContext(WeatherInfoContext);

  return (
    <div className={`${style['Home']}`}>
      <header className={`${style['header']}`}>Weatherapp</header>
      {isLoading && <h1>LOADING...</h1>}
      {!hasLocation ?
        <SearchBar /> :
        <WeatherDisplay />
      }
    </div>
  );
};

export default Home;
