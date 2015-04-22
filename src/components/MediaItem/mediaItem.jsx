import React from 'react';
import './mediaItem.styl';
import videojs from 'video.js';
import 'videojs-youtube';
import 'videojs-vimeo/vjs.vimeo.js';
import 'vtt.js';

function mapRefs(func) {
  Object.keys(this.refs).map((key) => {
    func(this.refs[key]);
  });
}

function bindVideojs() {
  mapRefs.call(this, function(ref){
    console.log(ref.getDOMNode());
    if(ref.getDOMNode().id){
      videojs(ref.getDOMNode().id);
    }
  });
}

function unbindVideojs() {
  mapRefs.call(this, function(ref){
    let player = ref.getDOMNode().player;
    if(player){
      player.dispose();
    }
  });
}

export default class MediaItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.setState({
      item: this.prerenderItem()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    bindVideojs.call(this);
  }

  componentWillUnmount() {
    unbindVideojs.call(this);
  }

  prerenderItem(){
    var item;
    let height;
    let prefix = 'video';
    var id;
    switch (this.props.item.type){
      case 'youtube':
        id = [prefix, this.props.id].join('');
        height = 504;
        item = <video
          id={id}
          ref={id}
          controls
          height={height}
          width={672}
          preload="auto"
          className="video-js vjs-default-skin slider__content"
          data-setup={JSON.stringify({techOrder: ['youtube'], src: this.props.item.value})}
          />;
        break;
      case 'vimeo':
        height = 504;
        id = [prefix, this.props.id].join('');
        item = <video
          id={id}
          ref={id}
          controls
          height={height}
          width={672}
          preload="auto"
          className="video-js vjs-default-skin slider__content"
          data-setup={JSON.stringify({techOrder: ['vimeo'], src: this.props.item.value})}
          />;
        break;
      default:
        item = <img className="slider__content" src={this.props.item.value}/>;
        break;
    }

    return item;
  }

  render(){
    return <div className={this.props.className}>
      {this.prerenderItem.call(this)}
    </div>;
  }
}

MediaItem.propTypes = {
  item: React.PropTypes.object
};
