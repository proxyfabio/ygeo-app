'use strict';
import './header.styl';
import React from 'react';
import IClock from '../iClock/iclock.jsx';
import IWeather from '../iWeather/iWeather.jsx';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <section className="header__row">
          <IClock className="header__clock" Interval={30000} />
          <IWeather className="header__weather" Interval={1800000} />
        </section>
        <h1 className="header__title">Информационная система</h1>
      </header>
    );
  }
}
