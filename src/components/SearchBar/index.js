import { useState } from "react";
import { useContext } from "react/cjs/react.development";
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

  console.log('errorInfo: (searchBar)', statusCode, statusMessage);


  const [searchTerm, setSearchTerm] = useState('');


  // console.log(weatherInfoContext);

  // useEffect(() => {
  //   searchLocation();
  // }, []);


  const onSubmit = (e) => {

    e.preventDefault();
    validateSearch(e);
    searchLocation(searchTerm);
    setSearchTerm('');
  };


  const onChangeHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };


  const validateSearch = (e) => {

    if (e.target.value === 0 || e.target.value === null) {
      console.log('ERROR');
    }
  };


  return (
    <form onSubmit={onSubmit}>
      <h2>Search City</h2>
      <p>
        {statusCode && statusMessage}
      </p>
      <input
        type='text'
        placeholder='e.g. Frankfurt'
        onChange={(e) => onChangeHandler(e.target.value)}
        value={searchTerm}
        required
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
