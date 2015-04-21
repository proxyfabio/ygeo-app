import './mediaSlider.styl';
import React from 'react';
import MediaItem from '../MediaItem/mediaItem.jsx';
import mediaItemsStore from '../../stores/mediaItemsStore.js';

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function getRouterParam(param) {
  return this.context.router.getCurrentParams()[param];
}

export default class IMediaSlider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      media: [],
      active: 1
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let nextId = getRouterParam.call(this, 'goId');
    if(this.state.id !== nextId){
      this.setState({'id': nextId});
      return false;
    }
    return true;
  }

  componentDidMount() {
    let nextId = getRouterParam.call(this, 'goId');
    if(this.state.id !== nextId){
      this.setState({id: nextId});
    }
  }

  componentWillMount() {
    mediaItemsStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    mediaItemsStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      media: mediaItemsStore.getItem(this.state.id)
    });
  }

  handleClickLeft() {
    let active = this.state.active - 1;
    if(active <= 0){
      active = this.state.media.length;
    }
    this.setState({active});
  }

  handleClickRight() {
    let active = this.state.active + 1;
    if(active > this.state.media.length){
      active = 1;
    }
    this.setState({active});
  }

  render(){
    let media = this.state.media || [];
    if(!media.length){
      return <section></section>;
    }
    // else
    let active = this.state.active;
    return <section className="slider">
      <span className="slider__ruler slider__left" onClick={this.handleClickLeft.bind(this)}>&#x25C4;</span>
      <ReactCSSTransitionGroup className="slider__wrapper" transitionName="example">
        <MediaItem className="slider__item" key={active} id={active} item={media[active - 1]}/>
      </ReactCSSTransitionGroup>
      <span className="slider__ruler slider__right" onClick={this.handleClickRight.bind(this)}>&#x25BA;</span>
    </section>;
  }
}

IMediaSlider.contextTypes = {
  router: React.PropTypes.func
};

IMediaSlider.propTypes = {
  media: React.PropTypes.array,
  id: React.PropTypes.number || React.PropTypes.null
};
