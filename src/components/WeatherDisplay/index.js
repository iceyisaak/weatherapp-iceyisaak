import { useContext } from "react";

import WeatherInfoState from "../../context/weatherInfo/WeatherInfoState";

const WeatherDisplay = () => {


  const {
    weatherData,
    // userLocation
  } = WeatherInfoState;

  console.log('weatherData', weatherData);


  // const {
  //   lat,
  //   lon,
  //   city,
  //   country
  // } = userLocation;

  return (
    <div>
      <h3>
        {/* {city}, {country} */}
      </h3>
      <p>
        {/* {weatherData && weatherData.current.weather[0].description} */}
      </p>
      <div>
        {/* <img
          src={`http://openweathermap.org/img/wn/${weatherData && weatherData.current.weather[0].icon}@2x.png`}
          alt={weatherData && weatherData.current.main}
        /> */}

      </div>
      <h1>
        {/* {main && Math.round(main.temp)}°C */}
      </h1>
    </div>
  );
};

export default WeatherDisplay;
