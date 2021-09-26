import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <NavBarStyles>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link
                className="nav-link"
                data-testid="link-to-search"
                to="/search"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                data-testid="link-to-profile"
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </NavBarStyles>
    );
  }
}

const NavBarStyles = styled.div`
  background-color: #F0F2F5;

  .nav-bar ul {
    display: flex;
    height: 4.875rem;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-bar li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 100%;
    text-align: center; 
    border-right: 2px solid #FFFFFF;
  }

  .nav-link {
    color: #023031;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 550;
    transition: .7s;
  }

  .nav-link:hover {
    color: #2FC18C;
  }
`;

export default NavBar;
