import Actions from '../../actions/appViewActions.js';
import React from 'react';
import {RouteHandler} from 'react-router';
import SearchForm from '../SearchForm/searchform.jsx';
import {animateRef} from '../../helpers/animationHelpers.js';

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

  componentDidMount() {
    animateRef.call(this, 'search', 100, ['absolute', 'slideDown']);
  },

  shouldSelect(query) {
    let router = this.context.router;

    this.mapState(function(el){
      if(el.text === query){
        router.transitionTo('go', {goId: el.id});
      }
    });
  },

  shouldSelectMany() {
    let ids = [];
    this.mapState(function(el){
      ids.push(el.id);
    });
    if(!ids.length){
      return;
    }
    this.context.router.transitionTo('/map/:ids', {ids: ids.join(',')});
  },

  shouldClose() {
    this.context.router.transitionTo('/');
  },

  mapState(predicate){
    SearchGOsStore.getState().map((el) => {
      predicate(el);
    });
  },

  componentWillMount() {
    searchStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    searchStore.removeChangeListener(this.onChange);
  },

  onChange(){
    var options = [];

    this.mapState(function(el){
      options.push(el.text);
    });

    this.setState({
      entryValue: searchStore.getState(),
      options: options
    });
  },

  render(){
    return <section className="quickSearch">
      <div ref="search" className="quickSearch__image"></div>
      <SearchForm
        options={this.state.options}
        entryValue={this.state.entryValue}
        onFormSubmit={this.shouldSearch}
        onFormClose={this.shouldClose}
        onOptionSelect={this.shouldSelect}
        onManyOptionsSelect={this.shouldSelectMany}
      />
    </section>;
  }
});
