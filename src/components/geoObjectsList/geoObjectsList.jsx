import React from 'react';
import Actions from '../../actions/appViewActions.js';
import Scrollbar from '../geminiScrollbar/geminiScrollbar.jsx';
import {Link} from 'react-router';
import './geoObjectsList.styl';

export default class IMediaSlider extends React.Component {

  render(){
		if(!this.props.list.length){
			return null;
		}

    return <section className="geoObjectsList">
			<Scrollbar className="geoObjectsList__content" ref="content">
				<ul>
				{this.props.list.map((el) => {
					return <li><Link key={el.id} to="go" params={{goId: el.id}}>{el.longtitle || el.pagetitle}</Link></li>;
				})}
				</ul>
			</Scrollbar>
    </section>;
  }
}

IMediaSlider.propTypes = {
  list: React.PropTypes.array
};
