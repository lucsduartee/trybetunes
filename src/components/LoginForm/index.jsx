import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  };

  fetchUserName = () => {
    const { history } = this.props;
    const { name } = this.state;
    const user = {
      name,
    };
    this.setState(
      { isLoading: true },
      async () => {
        // createUser(user).then(() => history.push('search'));
        await createUser(user);
        history.push('search');
      },
    );
  }

  render() {
    const {
      state: { name, isLoading },
    } = this;

    const MIN_LENGTH = 3;

    const isNameValid = name.length >= MIN_LENGTH;

    if (isLoading) return <Loading />;
    return (
      <Form>
        <form className="form">
          <label htmlFor="inp-name">
            <input
              className="inp"
              data-testid="login-name-input"
              type="text"
              name="name"
              id="inp-name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Nome"
            />
          </label>
          <button
            className="btn"
            data-testid="login-submit-button"
            type="button"
            disabled={ !isNameValid }
            onClick={ () => this.fetchUserName() }
          >
            Entrar
          </button>
        </form>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Form = styled.div`
  width: 43rem;
  margin: 0 auto;
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0 10px 0 10px;
  
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 43rem;
    height: 19rem;
  }

  .btn {
    width: 32.5rem;
    background-color: #003BE5;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    padding: .5rem;
    border: none;
    border-radius: .25rem;
    height: 3rem;
    transition: .7s;
  }

  .btn:hover {
    background-color: #002AA3;
    cursor: pointer;
  }

  .inp {
    width: 32rem;
    height: 2rem;
    padding: .5rem 5px;
    border: 1px solid #bbbbbb;
    border-radius: .25rem;
    margin-bottom: 2rem;
  }
`;

export default LoginForm;
