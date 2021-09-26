import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import logo from '../logoPositivo.svg';

class Login extends Component {
  render() {
    const { history } = this.props;

    return (
      <LoginDiv>
        <div data-testid="page-login">
          <img src={ logo } alt="Logo do TrybeTunes" />
          <LoginForm history={ history } />
        </div>
      </LoginDiv>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const LoginDiv = styled.div`
  height: 100vh;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 15%;
    margin-bottom: 6.5rem;
  }
`;

export default Login;
