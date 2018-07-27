import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header clearfix">
        <h3 className="text-muted">TUX Mining Calculator</h3>
      </div>
    );
  }
}

export default Header;
