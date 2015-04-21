'use strict';
import IMap from '../iMap/imap.jsx';
import React from 'react';
import Sidebar from '../Sidebar/sidebar.jsx';
import './mainsection.styl';

import {RouteHandler} from 'react-router';

export default class IMainSection extends React.Component {
  render(){
    let className = 'mainSection';
    let Places = this.props.Places.results;
    let routerParams = this.context.router.getCurrentParams();
    let routerPath = this.context.router.getCurrentPath();

    if(routerParams.goId || routerPath.match('/go/')){
      className += ' mainSection--inactive';
    }

    return <section className={className}>
      <Sidebar Places={Places}/>
      <IMap Places={Places}/>
      <RouteHandler/>
    </section>;
  }
}

IMainSection.contextTypes = {
  router: React.PropTypes.func
};
