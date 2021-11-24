import { useContext } from "react";

import moment from "moment";
import WeatherInfoContext from "../../context/weatherInfo/weatherInfoContext";

const WeatherDisplay = () => {

  const weatherInfoContext = useContext(WeatherInfoContext);

  const getDate = () => {
    const date = new Date();
    let formattedDate = moment(date).format('Do MMM YYYY');

    return formattedDate;
  };

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
      <p>23 NOV 2021</p>
      <h3>
        {name}, {name && sys.country}
      </h3>
      <p>
        {weather && weather[0].main}
      </p>
      <h1>
        {main && Math.round(main.temp)}°C
      </h1>
    </div>
  );
};

export default WeatherDisplay;
