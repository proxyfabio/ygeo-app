import './mediaSlider.styl';
import React from 'react';
import MediaItem from '../MediaItem/mediaItem.jsx';
import Actions from '../../actions/appViewActions.js';

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class IMediaSlider extends React.Component {

  switchToPhoto(){
    Actions.switchGallery({
      type: 'photo',
      active: this.props.activePhoto
    });
  }

  switchToVideo(){
    Actions.switchGallery({
      type: 'video',
      active: this.props.activeVideo
    });
  }

  getMedia(istate){
    return istate.get(this.props.id)[this.props.mode];
  }

  getActive(){
    return this.props.mode === 'video' ? this.props.activeVideo : this.props.activePhoto;
  }

  handleClickLeft() {
    let media = this.getMedia(this.props.media);
    let active = this.getActive() - 1;
    if(active <= 0){
      active = media.length;
    }
    Actions.switchGallery({
      type: this.props.mode,
      active
    });
  }

  handleClickRight() {
    let media = this.getMedia(this.props.media);
    let active = this.getActive() + 1;
    if(active > media.length){
      active = 1;
    }
    Actions.switchGallery({
      type: this.props.mode,
      active
    });
  }

  render(){
    if(!this.props.id){
      return false;
    }

    let media = this.getMedia(this.props.media);
    let active = this.props.mode === 'video' ? this.props.activeVideo : this.props.activePhoto;

    if(media.length > 1){
      var left = <span className="slider__ruler slider__left" onClick={this.handleClickLeft.bind(this)}>&#x25C4;</span>;
      var right = <span className="slider__ruler slider__right" onClick={this.handleClickRight.bind(this)}>&#x25BA;</span>;
    }

    function getActiveClass(type){
      let activeClass = (this.props.mode === type) ? 'geoObject__item--active' : '';
      return [
        'geoObject__item',
        activeClass,
        'geoObject__' + type
      ].join(' ');
    }

    let mediaItem = media[active - 1];
    let name;
    if(mediaItem && mediaItem.name){
      name = <div className="slider__name">{mediaItem.name}</div>;
    }else{
      name = <div/>;
    }

    return <section key={active} className="slider">
      {left}
      <ReactCSSTransitionGroup className="slider__wrapper" transitionName="example">
        {name}
        <MediaItem className="slider__item" key={active} id={active} item={media[active - 1]}/>
      </ReactCSSTransitionGroup>
      {right}
      <div className='geoObject__nav'>
        <a href="javascript:void(0)"
          onClick={this.switchToPhoto.bind(this)}
          className={getActiveClass.call(this, 'photo')}
          >Фото</a>
        <a href="javascript:void(0)"
          onClick={this.switchToVideo.bind(this)}
          className={getActiveClass.call(this, 'video')}
          >Видео</a>
        <div className="geoObject__pager">
          {active} / {media.length}
        </div>
      </div>
    </section>;
  }
}

IMediaSlider.propTypes = {
  media: React.PropTypes.object,
  mode: React.PropTypes.string,
  id: React.PropTypes.number
};
