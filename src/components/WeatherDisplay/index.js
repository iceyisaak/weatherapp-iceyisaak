import { useContext } from "react";

import WeatherInfoContext from "../../context/weatherInfo/WeatherInfoContext";

const WeatherDisplay = () => {


  const {
    weatherData,
    // userLocation
  } = WeatherInfoContext;

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
