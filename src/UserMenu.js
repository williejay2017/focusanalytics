import React from 'react';
import {stack as Menu} from 'react-burger-menu';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '26px',
      height: '20px',
      right: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#73AD21'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#73AD21',
      padding: '2.5em 1.5em 0',
      fontSize: '2.15em',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      textDecorationLine: 'none'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    },
    link:{
      textDecoration: "none"
    }
  }


  render() {
    return (
    
      <Menu styles={this.styles} right={true}>
        <a id="contact" style={this.styles.link} className="menu-item" href="/contact">Help</a>
        <a onClick={this.props.handleLogout} style={this.styles.link} className="menu-item" href="">Logout</a>
      </Menu>
    
    );
  }
}

export default UserMenu;