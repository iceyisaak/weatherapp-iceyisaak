import { useContext } from "react";

import WeatherInfoContext from "../../context/weatherInfo/weatherInfoContext";

const WeatherDisplay = () => {

  const weatherInfoContext = useContext(WeatherInfoContext);




  const {
    weatherData
  } = weatherInfoContext;

  const {
    name,
    sys,
    weather,
    main
  } = weatherData;

  return (
    <div>
      <h3>
        {name}, {name && sys.country}
      </h3>
      <p>
        {weather && weather[0].main}
      </p>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weather && weather[0].icon}@2x.png`}
          alt={weather && weather[0].main}
        />

      </div>
      <h1>
        {main && Math.round(main.temp)}°C
      </h1>
    </div>
  );
};

export default WeatherDisplay;
