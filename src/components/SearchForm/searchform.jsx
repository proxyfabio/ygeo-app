import React from 'react';
import './searchform.styl';
import Alert from '../../utils/alert.js';
import Typeahead from 'react-typeahead/lib/typeahead/index.js';

export default class Search extends React.Component {
  handleEachKey(e){
    let codes = [39, 37, 124, 8];
    if(codes.indexOf(e.keyCode) === -1){
      this.handleSubmit(e);
    }
  }

  handleSubmit(e){
    let data = {
      query: this.getTypeaheadValue()
    };

    this.props.onFormSubmit(data);

    if(e.keyCode === 13){
      e.preventDefault();
    }
  }

  handleOptionSelect(){
    this.props.onOptionSelect(this.getTypeaheadValue());
  }

  getTypeaheadInstance(){
    return this.refs.query;
  }

  getTypeaheadValue(){
    return this.getTypeaheadInstance().refs.entry.getDOMNode().value;
  }

  render(){
    return <form method="post" onSubmit={this.handleSubmit.bind(this)} className="quickSearch__figure">
      <Typeahead
        options={this.props.Options || []}
        name="query"
        ref="query"
        placeholder="Найдется все!"
        onEnter={this.handleSubmit.bind(this)}
        onEachKey={this.handleEachKey.bind(this)}
        onOptionSelected={this.handleOptionSelect.bind(this)}
      />
      <button>Найти</button>
    </form>;
  }
}

Search.propTypes = {
  onFormSubmit: React.PropTypes.func,
  Options: React.PropTypes.array
};
