import './geoObject.styl';
import React from 'react';
import {Link} from 'react-router';

export default class geoObject extends React.Component {
  render(){
    if(this.props.Data){
      var {pagetitle, longtitle, content} = this.props.Data;
    }

    return <figure className="geoObject__wrapper">
      <div className="geoObject__header">
        <div className="geoObject__title">Информация об объекте {pagetitle}</div>
        <div className="geoObject__close">
          <Link to="app">Закрыть</Link>
        </div>
      </div>
      <div className="geoObject__body">
        <h1 className="geoObject__h1">{longtitle || pagetitle}</h1>
        <p>
          {content}
        </p>
      </div>
      <div className="geoObject__media">
        <p>Тут видео и картинки</p>
      </div>
      <div className="geoObject__footer">
        <div className="geoObject__routes">
          <div className="geoObject__route route__car">На авто</div>
          <div className="geoObject__route route__walk">Пешком</div>
          <div className="geoObject__route route__bus">Общественным транспортом</div>
        </div>
      </div>
    </figure>;
  }
}
