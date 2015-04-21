'use strict';
import './sidebar.styl';
import React from 'react';
import MapLegendSection from '../MapLegendSection/mapLegendSection.jsx';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {
  render() {
    var _groups = {};
    this.props.Places.map((el) => {
      if(!_groups.hasOwnProperty(el.category)){
        _groups[el.category] = {};
      }
      if(!_groups[el.category].items){
        _groups[el.category].items = [];
      }
      _groups[el.category].items.push(el);
      _groups[el.category].id = el.category_id;
      _groups[el.category].icon = el.category_icon;

    });

    return <aside className="sidebar">
      <nav className="legend">
        <ul className="legend__wrapper">
          <li className="legend__item legend__search">
            <Link className="legend__link" to="search">Найти</Link>
          </li>
          {Object.keys(_groups).map((key) => {
            return <MapLegendSection
              key={key}
              icon={_groups[key].icon}
              SectionId={_groups[key].id}
              SectionName={key}
            />;
          })}
      </ul>
      </nav>
    </aside>;
  }
}
