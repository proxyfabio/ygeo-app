import React from 'react';
import './mediaItem.styl';
import videojs from 'video.js';
import 'videojs-youtube';
import 'vtt.js';

function mapRefs(func) {
  Object.keys(this.refs).map((key) => {
    func(this.refs[key]);
  });
}

function bindVideojs() {
  console.log(this.refs);
  mapRefs.call(this, function(ref){
    videojs(ref.getDOMNode().id);
  });
}

function unbindVideojs() {
  mapRefs.call(this, function(ref){
    ref.getDOMNode().player.dispose();
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
    bindVideojs.call(this);
  }

  componentWillUnmount() {
    unbindVideojs.call(this);
  }

  prerenderItem(){
    var item;
    let prefix = 'video';

    switch (this.props.item.type){
      case 'youtube':
        let id = [prefix, this.props.id].join('');
        item = <video
          id={id}
          ref={id}
          controls
          height={300}
          width={400}
          preload="auto"
          className="video-js vjs-default-skin slider__content"
          data-setup={JSON.stringify({techOrder: ['youtube'], src: this.props.item.value})}
          />;
        break;
      default:
        item = <img className="slider__content" src={this.props.item.value}/>;
        break;
    }

    return item;
  }

  render(){
    console.log(this.props);
    return <div className={this.props.className}>
      {this.prerenderItem.call(this)}
    </div>;
  }
}

MediaItem.propTypes = {
  item: React.PropTypes.object
};
