import React, { Component } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchBar />
      </div>
    );
  }
}

export default Search;
