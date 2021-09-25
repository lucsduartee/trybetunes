import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import NavBar from '../NavBar';

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
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
        <NavBar />
      </header>
    );
  }
}

export default Header;
