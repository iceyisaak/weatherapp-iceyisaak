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
    sys
  } = weatherData;

  return (
    <div>
      <p>{getDate}</p>
      <h3>
        {name}, DE
      </h3>
      <p>
        Windy
      </p>
      <h1>
        9°C
      </h1>
    </div>
  );
};

export default WeatherDisplay;
