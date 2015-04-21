import Actions from '../../actions/appViewActions.js';
import MapLegendItem from '../MapLegendItem/mapLegendItem.jsx';
import React from 'react';

export default class MapLegendSection extends React.Component {

  showGeoCollection(props){
    Actions.showActivegeoObjectsCollection({id: props.SectionId});
  }

  render(){
    return <li className="legend__item legend__category">
      <a
        className="legend__link"
        href="#"
        onClick={this.showGeoCollection.bind(this, this.props)}
      >
        <span className="link__ico"><img src={this.props.icon} /></span>
        {this.props.SectionName}
      </a>
    </li>;
  }
}
