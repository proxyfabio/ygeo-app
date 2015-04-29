'use strict';
import './header.styl';
import React from 'react';
import IClock from '../iClock/iclock.jsx';
import IWeather from '../iWeather/iWeather.jsx';
import RouteInfo from '../RouteInformer/routeInformer.jsx';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <section className="header__row">
          <IClock className="header__clock" Interval={59000} />
          <IWeather className="header__weather" Interval={600000} />
        </section>
        <RouteInfo className="routeInfo"/>
        <h1 className="header__title">Информационная система</h1>
      </header>
    );
  }
}
