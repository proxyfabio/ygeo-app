import React from 'react';
import SearchForm from '../SearchForm/searchform.jsx';
import Actions from '../../actions/appViewActions.js';
import SearchStore from '../../stores/searchGeoObjectsStore.js';
import routeNames from '../../constants/routes.js';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mapState(predicate){
    SearchStore.getState().map((el) => {
      predicate(el);
    });
  },

  shouldSearch(query){
    Actions.searchGeoObject(query);
  },

  shouldSelect(query){
    let router = this.context.router;

    this.mapState(function(el){
      if(el.text === query){
        router.transitionTo('go', {goId: el.id});
      }
    });
  },

  getInitialState() {
    return {
      Options: []
    };
  },

  componentWillMount() {
    SearchStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    SearchStore.removeChangeListener(this.onChange);
  },

  onChange() {
    var options = [];

    this.mapState(function(el){
      options.push(el.text);
    });

    this.setState({
      'Options': options
    });
  },

  render(){
    return <section className="quickSearch">
      <SearchForm Options={this.state.Options} onOptionSelect={this.shouldSelect} onFormSubmit={this.shouldSearch}></SearchForm>
    </section>;
  }
});
