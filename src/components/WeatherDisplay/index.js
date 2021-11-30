import { useContext } from "react";
import { WeatherInfoContext } from "../../context/weatherInfo/WeatherInfoContext";

const WeatherDisplay = () => {

  const {
    // weatherData,
    weatherData: {
      name,
      sys,
      weather,
      main
    }

  } = useContext(WeatherInfoContext);


  // console.log('<WeatherDisplay/>');


  return (
    <div>
      <h3>
        {name}, {sys && sys.country}
      </h3>
      <p>
        {weather && weather[0].description}
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
