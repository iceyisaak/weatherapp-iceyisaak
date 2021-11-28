import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfoContext from './context/weatherInfo/WeatherInfoContext';
import Home from '../src/components/Home';

import '../src/styles/GlobalStyle.scss';

ReactDOM.render(
  <React.StrictMode>
    <WeatherInfoContext>
      <Home />
    </WeatherInfoContext>
  </React.StrictMode>,
  document.getElementById('root')
);