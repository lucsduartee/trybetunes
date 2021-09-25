import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import logo from '../logoPositivo.svg';

class Login extends Component {
  render() {
    const { history } = this.props;

    return (
      <div data-testid="page-login">
        <img src={ logo } alt="Logo do TrybeTunes" />
        <LoginForm history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
