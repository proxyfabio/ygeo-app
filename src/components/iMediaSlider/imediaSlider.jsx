import './mediaSlider.styl';
import React from 'react';
import MediaItem from '../MediaItem/mediaItem.jsx';
import mediaItemsStore from '../../stores/mediaItemsStore.js';
import Actions from '../../actions/appViewActions.js';

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function getRouterParam(param) {
  return this.context.router.getCurrentParams()[param];
}

export default class IMediaSlider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'photo',
      id: null,
      media: [],
      length: 0,
      active: 1
    };
  }

  switchToPhoto(){
    this.setState({mode: 'photo', active: 1});
    Actions.switchGallery('photo');
  }

  switchToVideo(){
    this.setState({mode: 'video', active: 1});
    Actions.switchGallery('video');
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
    let data = mediaItemsStore.getItem(this.state.id);
    this.setState({
      media: data,
      length: data.length
    });
  }

  handleClickLeft() {
    let active = this.state.active - 1;
    if(active <= 0){
      active = this.state.length;
    }
    this.setState({active});
  }

  handleClickRight() {
    let active = this.state.active + 1;
    if(active > this.state.length){
      active = 1;
    }
    this.setState({active});
  }

  render(){
    let media = this.state.media || [];
    if(!media.length){
      return <section></section>;
    }

    // TODO: make a toggle class helper instead of this odd code
    let classProperty = 'geoObject__item--active';
    var photoActive = '';
    var videoActive = '';
    if(this.state.mode === 'photo'){
      photoActive = classProperty;
      videoActive = '';
    }else {
      videoActive = classProperty;
      photoActive = '';
    }

    if(this.state.length > 1){
      var left = <span className="slider__ruler slider__left" onClick={this.handleClickLeft.bind(this)}>&#x25C4;</span>;
      var right = <span className="slider__ruler slider__right" onClick={this.handleClickRight.bind(this)}>&#x25BA;</span>;
    }

    // else
    let active = this.state.active;
    return <section className="slider">
      {left}
      <ReactCSSTransitionGroup className="slider__wrapper" transitionName="example">
        <MediaItem className="slider__item" key={active} id={active} item={media[active - 1]}/>
      </ReactCSSTransitionGroup>
      {right}
      <div className='geoObject__nav'>
        <a href="javascript:void(0)" onClick={this.switchToPhoto.bind(this)} className={"geoObject__photo geoObject__item " + photoActive}>Фото</a>
        <a href="javascript:void(0)" onClick={this.switchToVideo.bind(this)} className={"geoObject__video geoObject__item " + videoActive}>Видео</a>
        <div className="geoObject__pager">
          {this.state.active} / {media.length}
        </div>
      </div>
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
