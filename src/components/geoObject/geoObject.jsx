import './geoObject.styl';
import React from 'react';
import {Link} from 'react-router';
import IMediaSlider from '../iMediaSlider/imediaSlider.jsx';
import Scrollbar from '../geminiScrollbar/geminiScrollbar.jsx';

export default class geoObject extends React.Component {
  render(){
    if(this.props.Data){
      var {id, pagetitle, longtitle, content, tvs} = this.props.Data;
    }

    if(tvs){
      var {schedule, schedule_time, address, phone} = tvs;
    }

    function createMarkup(markup) {
      return {__html:  markup};
    }

    let ns = 'geoObject';
    return <section className={ns + '__section'}>
      <div className={ns + '__header'}>
        <div className={ns + '__title'}>
          {longtitle || pagetitle}
          <span className={ns + '__address'}>{address}</span>
        </div>
      </div>

      <div className={ns + '__wrapper'}>
        <Link to="app" className={ns + '__close'}></Link>

        <div className={ns + '__slider'}>
          <IMediaSlider/>

          <div className={ns + '__nav'}>
            <a href="#" onClick={this.switchToPhoto} className="geoObject__photo geoObject__item geoObject__item--active">Фото</a>
            <a href="#" onClick={this.switchToPhoto} className="geoObject__video geoObject__item">Видео</a>
            <div className="geoObject__pager">
              1 / 2
            </div>
          </div>

        </div>

        <div className={ns + '__info'}>
          <div className={ns + '__dest'}>
            <span className={ns + '__h'}>{address}</span>
            {phone}
          </div>
          <div className={ns + '__time'}>
            <span className={ns + '__h'}>{schedule_time}</span>
            {schedule}
          </div>
        </div>

        <div className="geoObject__routes">
          <span className={ns + '__routeDesc'}>Как добраться:</span>
          <span className="geoObject__route route__car"><Link to="route" params={{rId: 'route_auto'}}>На авто</Link></span>
          <span className="geoObject__route route__walk"><Link to="route" params={{rId: 'route_walk'}}>Пешком</Link></span>
          <span className="geoObject__route route__bus"><Link to="route" params={{rId: 'route_bus'}}>Транспортом</Link></span>
        </div>

        <Scrollbar>
          <div className={ns + '__content'} dangerouslySetInnerHTML={{__html: String(content)}}></div>
        </Scrollbar>
      </div>
    </section>;
  }
}
