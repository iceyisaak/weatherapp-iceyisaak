import { useState, useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { WeatherInfoContext } from '../../context/weatherInfo/WeatherInfoContext';


const SearchBar = () => {

  const {
    searchLocation,
    getCoords
  } = useContext(WeatherInfoContext);


  const [searchTerm, setSearchTerm] = useState('');

  // console.log(weatherInfoContext);

  // useEffect(() => {
  //   searchLocation();
  // }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    searchLocation(searchTerm);
    setSearchTerm('');
  };


  const onChangeHandler = (searchTerm) => {

    if (searchTerm.trim() !== null) {
      setSearchTerm(searchTerm);
    } else {
      alert('Pls enter your city name.');
    }
  };


  return (
    <form onSubmit={onSubmit}>
      <h2>Search City</h2>
      <input
        type='text'
        placeholder='e.g. Frankfurt'
        onChange={(e) => onChangeHandler(e.target.value)}
        value={searchTerm}
      />
      <button>
        Check Weather
      </button>
      or
      <button
        onClick={getCoords}
      >
        Get My Location
      </button>
    </form>
  );
};

export default SearchBar;;
