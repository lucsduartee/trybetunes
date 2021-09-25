import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      isLoading: false,
      albumInfos: {},
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavorites();
  }

  /* Recebi ajuda do Fernando de Oliveira para estruturar essa função */
  handleChange = ({ target }, music) => {
    const toggleAction = target.checked ? addSong : removeSong;
    this.setState({
      isLoading: true,
    },
    async () => {
      await toggleAction(music);
      this.fetchFavorites();
    });
  };

  fetchMusics = () => {
    const { match } = this.props;
    const { params: { id } } = match;
    this.setState(
      { isLoading: true },
      async () => {
        const res = await getMusics(id);
        const [albumInfo, ...tracksArr] = res;
        const { artworkUrl100: albumImg, collectionName, artistName } = albumInfo;
        this.setState({
          musics: tracksArr,
          isLoading: false,
          albumInfos: {
            albumImg,
            collectionName,
            artistName,
          },
        });
      },
    );
  };

  /* Recebi ajuda do Fernando de Oliveira para estruturar essa função */
  fetchFavorites = () => {
    this.setState(
      { isLoading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        this.setState({
          favorites,
          isLoading: false,
        });
      },
    );
  }

  musicSection = (albumInfos, musics, favorites) => {
    const { albumImg, collectionName, artistName } = albumInfos;
    return (
      <section>
        <div>
          <img src={ albumImg } alt="Capa Album" />
          <p data-testid="album-name">{ collectionName }</p>
          <p data-testid="artist-name">{ artistName }</p>
        </div>
        <div>
          {
            musics.map((music) => (
              <MusicCard
                onChange={ this.handleChange }
                key={ music.trackName }
                music={ music }
                isFavorite={ favorites.some((favorite) => (
                  favorite.trackId === music.trackId)) }
              />
            ))
          }
        </div>
      </section>
    );
  }

  render() {
    const { state: { isLoading, musics, albumInfos, favorites } } = this;

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : this.musicSection(albumInfos, musics, favorites) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
