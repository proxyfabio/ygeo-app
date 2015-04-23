import React from 'react';
import './searchform.styl';
import Typeahead from 'react-typeahead/lib/typeahead/index.js';
import Keyboard from '../Keyboard/keyboard.jsx';
import Actions from '../../actions/appViewActions.js';
import {animateRef} from '../../helpers/animationHelpers.js';

export default class Search extends React.Component {

  componentDidMount() {
    animateRef.call(this, 'form', 400, ['block', 'slideUp']);
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

  handleButtonClick(e){
    let value = e.target.value;
    switch(value){
      // esc
      case 27:
        this.props.onFormClose();
        break;
      case 13:
        this.props.onManyOptionsSelect();
        break;
      // space
      case 32:
      // backspace
      case 8:
      // else
      default:
        Actions.clickKeybordButton(value);
        break;
    }

  }

  render(){
    return <form ref="form" method="post" className="quickSearch__section">
      <Typeahead
        ref="query"
        name="query"
        maxVisible={4}
        className='typeahead'
        options={this.props.options}
        entryValue={this.props.entryValue}
        onOptionSelected={this.handleOptionSelect.bind(this)}
      />
      <section className="keyboard">
        <Keyboard
          className="keyboard__section"
          onButtonClick={this.handleButtonClick.bind(this)}
        />
      </section>
    </form>;
  }
}

Search.propTypes = {
  Options: React.PropTypes.array,
  onManyOptionsSelect: React.PropTypes.func,
  onFormClose: React.PropTypes.func
};
