import Actions from '../../actions/appViewActions.js';
import MapLegendItem from '../MapLegendItem/mapLegendItem.jsx';
import React from 'react';

export class MapLegendSection extends React.Component {

  showGeoCollection(props){
    Actions.showActivegeoObjectsCollection({id: props.SectionId});
  }

  render(){
    return <figure className="mapLegendSection__item">
      <h3 className="h3">
        <a href="#" onClick={this.showGeoCollection.bind(this, this.props)}>{this.props.SectionName}</a>
      </h3>

      {this.props.Items.map((el) => {
        return <MapLegendItem key={el.id} GOData={el} />;
      })}

    </figure>;
  }
}
