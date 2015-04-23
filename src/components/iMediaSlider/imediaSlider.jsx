import './mediaSlider.styl';
import React from 'react';
import MediaItem from '../MediaItem/mediaItem.jsx';
import Actions from '../../actions/appViewActions.js';

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class IMediaSlider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: 1,
      mode: 'photo'
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

  getMedia(state){
    return state.get(this.props.id)[this.state.mode];
  }

  handleClickLeft() {
    let media = this.getMedia(this.props.media);
    let active = this.state.active - 1;
    if(active <= 0){
      active = media.length;
    }
    this.setState({active});
  }

  handleClickRight() {
    let media = this.getMedia(this.props.media);
    let active = this.state.active + 1;
    if(active > media.length){
      active = 1;
    }
    this.setState({active});
  }

  render(){
    if(!this.props.id){
      return <section></section>;
    }

    let media = this.getMedia(this.props.media);
    let active = this.state.active;

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

    if(media.length > 1){
      var left = <span className="slider__ruler slider__left" onClick={this.handleClickLeft.bind(this)}>&#x25C4;</span>;
      var right = <span className="slider__ruler slider__right" onClick={this.handleClickRight.bind(this)}>&#x25BA;</span>;
    }

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
          {active} / {media.length}
        </div>
      </div>
    </section>;
  }
}

IMediaSlider.propTypes = {
  media: React.PropTypes.object,
  id: React.PropTypes.number
};
