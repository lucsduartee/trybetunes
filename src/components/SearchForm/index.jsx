import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class SearchForm extends Component {
  render() {
    const { searchedName, onHandleChange, isDisabled, onHandleClick } = this.props;
    return (
      <SearchFormStyles>
        <form autoComplete="off">
          <div className="input-icon">
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist-name"
              id="artist-name"
              onChange={ onHandleChange }
              value={ searchedName }
              placeholder="Nome do artista"
              className="inp"
            />
            <i className="fas fa-search" />
          </div>
          <button
            data-testid="search-artist-button"
            disabled={ !isDisabled }
            type="button"
            onClick={ onHandleClick }
            className="btn"
          >
            Pesquisar
          </button>
        </form>
      </SearchFormStyles>
    );
  }
}

SearchForm.propTypes = {
  searchedName: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

const SearchFormStyles = styled.div`
  margin: 80px auto;
  width: fit-content;
  form {
    width: 38rem;
    display: flex;
    margin-bottom: 2rem;
  }

  .btn {
    width: 8.375rem;
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
    padding: .5rem 5px;
    border: none;
  }

  .input-icon {
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid #bbbbbb;
    border-radius: .25rem;
    margin-right: 1.5rem;
    color: #BBBBBB;

  }
`;

export default SearchForm;
