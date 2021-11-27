import { useState, useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import WeatherInfoContext from '../../context/weatherInfo/weatherInfoContext';


const SearchBar = () => {

  const weatherInfoContext = useContext(WeatherInfoContext);
  const [city, setCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');



  // useEffect(() => {
  //   searchLocation();
  // }, []);




  const onSubmit = (e) => {
    e.preventDefault();
    weatherInfoContext.searchLocation(searchTerm);
    setSearchTerm('');
  };


  const onChangeHandler = (e) => {

    setSearchTerm(e.target.value);
  };


  return (
    <form onSubmit={onSubmit}>
      <h2>Search City</h2>
      <input
        type='text'
        placeholder='e.g. Frankfurt'
        value={searchTerm}
        onChange={onChangeHandler}
      />
      <button>
        Check Weather
      </button>
      or
      <button>
        {/* onClick={getUserCoord} */}
        Get My Location
      </button>
    </form>
  );
};

export default SearchBar;;
