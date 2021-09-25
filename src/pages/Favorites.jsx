import React, { Component } from 'react';
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
      <section>
        {
          favorites.map((favorite) => (
            <MusicCard
              onChange={ this.handleChange }
              music={ favorite }
              key={ favorite.trackName }
              isFavorite={ isTrue }
            />
          ))
        }
      </section>
    );
  };

  render() {
    const { state: { isLoading, favorites } } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : this.renderMusicCard(favorites) }
      </div>
    );
  }
}

export default Favorites;
