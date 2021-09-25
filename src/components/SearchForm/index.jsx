import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    const { searchedName, onHandleChange, isDisabled, onHandleClick } = this.props;
    return (
      <form>
        <label htmlFor="artist-name">
          Nome do Artista
          <input
            type="text"
            data-testid="search-artist-input"
            name="artist-name"
            id="artist-name"
            onChange={ onHandleChange }
            value={ searchedName }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ !isDisabled }
          type="button"
          onClick={ onHandleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchedName: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};

export default SearchForm;
