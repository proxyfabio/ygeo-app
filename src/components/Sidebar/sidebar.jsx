'use strict';
import './sidebar.styl';
import React from 'react';
import {MapLegendSection} from '../MapLegendSection/mapLegendSection.jsx';
import {Link} from 'react-router';

export class Sidebar extends React.Component {
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
    });

    return <aside className="sidebar">
      <Link to="search">Искать</Link>
      <h2>Места</h2>
      <section className="mapLegendSection">
        {Object.keys(_groups).map((key) => {
          return <MapLegendSection
            key={key}
            SectionId={_groups[key].id}
            SectionName={key}
            Items={_groups[key].items}
          />;
        })}
      </section>
    </aside>;
  }
}
