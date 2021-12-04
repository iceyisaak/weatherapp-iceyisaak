import { useState, useEffect, useContext } from "react";
import { WeatherInfoContext } from '../../context/weatherInfo/WeatherInfoContext';


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

    // if (searchTerm === '') {
    //   console.log('Please Enter Location');
    // } else {
    //   console.log(searchTerm);
    searchLocation(searchTerm);
    setSearchTerm('');
  };



  const onChangeHandler = (e) => {
    const location = e.target.value;
    setSearchTerm(location);
    // console.log(searchTerm);
    // setSearchTerm(searchTerm);
  };


  // useEffect(() => {
  //   console.log(searchTerm);
  // }, [searchTerm]);


  return (
    <form onSubmit={onSubmit}>
      <h2>Search City</h2>
      <p>
        {statusCode && statusMessage}
      </p>
      <input
        type='text'
        placeholder='e.g. Frankfurt'
        onChange={onChangeHandler}
        value={searchTerm}
      // required
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
