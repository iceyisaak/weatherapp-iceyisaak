import { useState, useContext } from "react";
import { WeatherInfoContext } from '../../context/weatherInfo/WeatherInfoContext';
import { MdMyLocation } from 'react-icons/md';

import style from './searchbar.module.scss';

const SearchBar = () => {

  const {
    searchLocation,
    getCoords,
    errorInfo: {
      statusCode,
      statusMessage
    }
  } = useContext(WeatherInfoContext);

  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchLocation(searchTerm);
    setSearchTerm('');
  };

  const onChangeHandler = (e) => {
    const location = e.target.value;
    setSearchTerm(location);
  };


  return (
    <form
      onSubmit={onSubmit}
      className={`${style['form']}`}
    >
      <div className={`${style['form-content']}`}>
        <label htmlFor='search' className={`${style['label']}`}>
          Search City
        </label>
        <div className={`${style['location-input']}`}>
          <input
            type='text'
            name='search'
            placeholder='e.g. Frankfurt'
            onChange={onChangeHandler}
            value={searchTerm}
            className={`${style['input']}`}
          />
          <span>
            <MdMyLocation
              onClick={getCoords}
              className={`${'pointer'} ${style['locator']}`}
            />
          </span>
        </div>
        <p className={`${style['error-msg']}`}>
          {statusCode && statusMessage}
        </p>
        <button className={`${style['btn']} ${'pointer'}`}>
          Check Weather
        </button>
      </div>

    </form >
  );
};

export default SearchBar;
