import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link data-testid="link-to-search" to="/search">Search</Link>
          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
