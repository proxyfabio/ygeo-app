import React from 'react';

export default class MapLegendSection extends React.Component {
  render(){
    var icon = this.props.icon;
    if(this.props.active && this.props.activeIcon.match(/.png/)){
      icon = this.props.activeIcon;
    }
    return <li className={'legend__item legend__category' + this.props.active}>
      <a
        className="legend__link"
        href="javascript:void(0)"
        onClick={this.props.onCategoryClick}
      >
        <span className="link__ico"><img src={icon} /></span>
        {this.props.sectionName}
      </a>
    </li>;
  }
}
