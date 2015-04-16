'use strict';
import React from 'react';
import Map from '../iMap/imap.jsx';
import {Sidebar} from '../Sidebar/sidebar.jsx';

export class IMainSection extends React.Component {
  render(){
    let Places = this.props.Places.results;

    return <section className="mainSection">
      <Map Places={Places}/>
      <Sidebar Places={Places}/>
    </section>;
  }
}
