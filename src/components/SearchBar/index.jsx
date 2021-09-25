import React, { Component } from 'react';
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
    if (!isValid) return <p>Nenhum álbum foi encontrado</p>;
    return (
      <>
        <p>
          Resultado de álbuns de:
          {` ${name}`}
        </p>
        {albums.map((album) => (
          <Album key={ album.collectionId } album={ album } />
        ))}
      </>
    );
  };

  render() {
    const {
      state: { name, isLoading, albums, searchedName },
    } = this;
    const isDisabled = searchedName.length >= 2;
    return (
      <>
        <SearchForm
          searchedName={ searchedName }
          onHandleChange={ this.handleChange }
          isDisabled={ isDisabled }
          onHandleClick={ this.handleClick }
        />
        <section>
          {isLoading ? <Loading /> : this.mapAlbums(albums, name)}
        </section>
      </>
    );
  }
}

export default SearchBar;
