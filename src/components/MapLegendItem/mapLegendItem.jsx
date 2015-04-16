import React from 'react';
import {Link} from 'react-router';

export default class MapLegendItem extends React.Component {
  render(){
    let el = this.props.GOData;

    return <section key={el.id} className="mapLegendItem">
      <Link to="go" params={{goId: el.id}} className="mapLegendItem__link">{el.pagetitle}</Link>
    </section>;
  }
}
