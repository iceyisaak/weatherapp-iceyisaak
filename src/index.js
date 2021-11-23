import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfoState from './context/weatherInfo/WeatherInfoState';
import Home from '../src/components/Home';

import '../src/styles/GlobalStyle.scss';

ReactDOM.render(
  <React.StrictMode>
    <WeatherInfoState>
      <Home />
    </WeatherInfoState>
  </React.StrictMode>,
  document.getElementById('root')
);