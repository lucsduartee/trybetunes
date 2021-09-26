import React, { Component } from 'react';
import styled from 'styled-components';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import NavBar from '../NavBar';
import logo from '../../logoNegativo.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = () => {
    this.setState(
      { isLoading: true },
      async () => {
        const req = await getUser();
        const res = req.name;
        this.setState({
          isLoading: false,
          name: res,
        });
      },
    );
  }

  render() {
    const { state: { name, isLoading } } = this;
    if (isLoading) return <Loading />;

    return (
      <HeaderStyle>
        <header data-testid="header-component">
          <div className="logo-user">
            <img src={ logo } alt="TrybeTunes logo" />
            <div className="user">
              <i className="fas fa-user-circle" />
              <p data-testid="header-user-name">{ name }</p>
            </div>
          </div>
          <NavBar />
        </header>
      </HeaderStyle>
    );
  }
}

const HeaderStyle = styled.div`
  background-color: #023031;
  box-sizing: border-box;

  .logo-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 3rem;
    height: 6rem;
  }

  .user {
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 12rem;
    border-radius: 50px;
    margin-top: 1.5rem;
    font-size: 1.1rem;
  }

  .user p {
    width: 60%;
  }

  .fas, .fa-user-circle {
    font-size: 2rem;
    color: #2FC18C;
  }

`;

export default Header;
