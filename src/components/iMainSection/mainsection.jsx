'use strict';
import IMap from '../iMap/imap.jsx';
import React from 'react';
import Sidebar from '../Sidebar/sidebar.jsx';
import './mainsection.styl';

import {RouteHandler} from 'react-router';
import {index} from '../../constants/routes.js';

let ns = 'mainSection';

export default class IMainSection extends React.Component {

  handleSectionClick(e){
    if(e.target.className.match(new RegExp(ns))){
      this.context.router.transitionTo(index);
    }
  }

  render(){
    let className = ns;
    let Places = this.props.Places.results;
    let routerParams = this.context.router.getCurrentParams();
    let routerPath = this.context.router.getCurrentPath();

    if(routerParams.goId || routerPath.match('/go/') || routerPath.match('/promo/')){
      className += ' mainSection--inactive';
    }

    return <section className={className} onClick={this.handleSectionClick.bind(this)}>
      <Sidebar Places={Places}/>
      <IMap Places={Places}/>
      <RouteHandler/>
    </section>;
  }
}

IMainSection.contextTypes = {
  router: React.PropTypes.func
};
