import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfoContextProvider from './context/weatherInfo/WeatherInfoContext';
import Home from '../src/components/Home';

import '../src/styles/GlobalStyle.scss';

ReactDOM.render(
  <React.StrictMode>
    <WeatherInfoContextProvider>
      <Home />
    </WeatherInfoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);