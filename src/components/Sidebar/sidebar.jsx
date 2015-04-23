'use strict';
import './sidebar.styl';
import React from 'react';
import MapLegendSection from '../MapLegendSection/mapLegendSection.jsx';
import Actions from '../../actions/appViewActions.js';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    };
  }

  handleCategoryClick(sectionId){
    let list = this.state.list;
    let index = list.indexOf(sectionId);
    index === -1 ? list.push(sectionId) : list.splice(index, 1);
    this.setState({list});
    Actions.showActivegeoObjectsCollection({list});
  }

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
      _groups[el.category].legend_icon = el.legend_icon;

    });

    return <aside className="sidebar">
      <nav className="legend">
        <ul className="legend__wrapper">
          <li className="legend__item legend__search">
            <Link className="legend__link" to="search">
              <span><span className="legend__ico"/></span>
              Найти
            </Link>
          </li>
          {Object.keys(_groups).map(function(key){
            let sectionId = _groups[key].id;
            let active = this.state.list.indexOf(sectionId) !== -1 ? ' legend__item--active' : '';

            return <MapLegendSection
              key={key}
              sectionName={key}
              active={active}
              icon={_groups[key].legend_icon}
              onCategoryClick={this.handleCategoryClick.bind(this, sectionId)}
              />;
          }, this)}
        </ul>
      </nav>
    </aside>;
  }
}
