import React, { Component } from 'react';
import styled from 'styled-components';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Album from '../Album';
import Loading from '../Loading';
import SearchForm from '../SearchForm';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      albums: [],
      isLoading: false,
      searchedName: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      searchedName: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const {
      state: { searchedName },
    } = this;
    this.setState({ isLoading: true }, async () => {
      const res = await searchAlbumsAPI(searchedName);
      this.setState((state) => ({
        albums: res,
        isLoading: false,
        name: state.searchedName,
        searchedName: '',
      }));
    });
  };

  mapAlbums = (albums, name) => {
    const isValid = albums.length > 0;
    if (!isValid) {
      return <p className="msg-result not-found">Nenhum álbum foi encontrado</p>;
    }
    return (
      <section className="albums-div">
        <p className="msg-result">
          Resultado de álbuns de:
          {` ${name}`}
        </p>
        <div className="album-card">
          {albums.map((album) => (
            <Album key={ album.collectionId } album={ album } />
          ))}
        </div>
      </section>
    );
  };

  render() {
    const {
      state: { name, isLoading, albums, searchedName },
    } = this;
    const isDisabled = searchedName.length >= 2;
    return (
      <SearchBarStyles>
        <SearchForm
          searchedName={ searchedName }
          onHandleChange={ this.handleChange }
          isDisabled={ isDisabled }
          onHandleClick={ this.handleClick }
        />
        {isLoading ? <Loading /> : this.mapAlbums(albums, name)}
      </SearchBarStyles>
    );
  }
}

const SearchBarStyles = styled.div`
  .albums-div {
    display: flex;
    width: 70%;
    height: 100vh;
    gap: 2rem;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .msg-result {
    display: block;
    color: #001813;
    font-size: 1.75rem;
    font-family: 'Epilogue', sans-serif;
  }

  .album-card {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .not-found {
    margin: 0 250px;
  }
`;

export default SearchBar;
