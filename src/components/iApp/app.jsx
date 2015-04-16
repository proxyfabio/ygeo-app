'use strict';
import React from 'react';
import {IMainSection} from '../iMainSection/mainsection.jsx';
import {Header} from '../Header/header.jsx';
import {Footer} from '../Footer/footer.jsx';
import Actions from '../../actions/appViewActions.js';

import {RouteHandler} from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.Places.total};
  }

  render () {
    return (
      <div className='app'>
        <Header/>
        <IMainSection Places={this.props.Places}/>
        <Footer/>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func
};
