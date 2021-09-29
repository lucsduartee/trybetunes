import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = (_, music) => {
    this.setState({
      isLoading: true,
    },
    async () => {
      await removeSong(music);
      this.fetchFavorites();
    });
  }

  fetchFavorites = () => {
    this.setState({
      isLoading: true,
    },
    async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favorites,
      });
    });
  };

  renderMusicCard = (favorites) => {
    const isTrue = true;
    return (
      <section className="favorites">
        <h1>Músicas Favoritas:</h1>
        {
          favorites.map((favorite) => (
            <div className="card-favorite" key={ favorite.trackName }>
              <img src={ favorite.artworkUrl100 } alt="asdasd" />
              <MusicCard
                onChange={ this.handleChange }
                music={ favorite }
                isFavorite={ isTrue }
              />
              {console.log(favorite)}
            </div>
          ))
        }
      </section>
    );
  };

  render() {
    const { state: { isLoading, favorites } } = this;
    return (
      <FavoritesStyles>
        <div data-testid="page-favorites">
          <Header />
          { isLoading ? <Loading /> : this.renderMusicCard(favorites) }
        </div>
      </FavoritesStyles>
    );
  }
}

const FavoritesStyles = styled.div`
  .favorites {
    width: 40%;
    margin: 100px auto;
  }

  .favorites h1 {
    margin-bottom: 35px;
    display: block;
    color: #001813;
    font-size: 1.75rem;
    font-family: 'Epilogue', sans-serif;
  }

  .card-favorite {
    display: flex;
    background: #E1E5EB;
    justify-content: space-around;
    margin-bottom: 40px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.3);
  }

  .card-favorite img {
    width: 120px;
    border-radius: 50%;
  }
`;

export default Favorites;
