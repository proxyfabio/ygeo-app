import Actions from '../../actions/appViewActions.js';
import React from 'react';
import {RouteHandler} from 'react-router';
import SearchForm from '../SearchForm/searchform.jsx';

import searchStore from '../../stores/searchStore.js';
import SearchGOsStore from '../../stores/searchGeoObjectsStore.js';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      options: [],
      entryValue: ''
    };
  },

  shouldSearch(query) {
    Actions.searchGeoObject(query);
  },

  shouldSelect(query) {
    let router = this.context.router;

    this.mapState(function(el){
      if(el.text === query){
        router.transitionTo('go', {goId: el.id});
      }
    });
  },

  mapState(predicate){
    SearchGOsStore.getState().map((el) => {
      predicate(el);
    });
  },

  componentDidMount() {
    Actions.clickKeybordButton('');
  },

  componentWillMount() {
    SearchGOsStore.addChangeListener(this.onChange);
    searchStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    SearchGOsStore.removeChangeListener(this.onChange);
    searchStore.removeChangeListener(this.onChange);
    // this.setState({
    //   options: []
    // });
  },

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state, nextState);
    return true;
  },

  onChange(){
    var options = [];

    this.mapState(function(el){
      options.push(el.text);
    });

    console.log(this.state);

    this.setState({
      entryValue: searchStore.getState(),
      options: options
    });

    console.log(this.state);
  },

  render(){
    return <section className="quickSearch">
      <div className="quickSearch__image"></div>
      <SearchForm
        options={this.state.options}
        entryValue={this.state.entryValue}
        onFormSubmit={this.shouldSearch}
        onOptionSelect={this.shouldSelect}
      />
    </section>;
  }
});
