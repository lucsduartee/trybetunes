import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';

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
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        await toggleAction(music);
        this.fetchFavorites();
      },
    );
  };

  fetchMusics = () => {
    const { match } = this.props;
    const {
      params: { id },
    } = match;
    this.setState({ isLoading: true }, async () => {
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
    });
  };

  /* Recebi ajuda do Fernando de Oliveira para estruturar essa função */
  fetchFavorites = () => {
    this.setState({ isLoading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
        isLoading: false,
      });
    });
  };

  musicSection = (albumInfos, musics, favorites) => {
    const { albumImg, collectionName, artistName } = albumInfos;
    return (
      <AlbumStyle>
        <section className="album-section">
          <div className="card-album">
            <img src={ albumImg } alt="Capa Album" />
            <p className="album-description main" data-testid="album-name">
              {collectionName}
            </p>
            <p className="album-description" data-testid="artist-name">
              {artistName}
            </p>
          </div>
          <div>
            {musics.map((music) => (
              <MusicCard
                onChange={ this.handleChange }
                key={ music.trackName }
                music={ music }
                isFavorite={ favorites.some(
                  (favorite) => favorite.trackId === music.trackId,
                ) }
              />
            ))}
          </div>
        </section>
      </AlbumStyle>
    );
  };

  render() {
    const {
      state: { isLoading, musics, albumInfos, favorites },
    } = this;

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          this.musicSection(albumInfos, musics, favorites)
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const AlbumStyle = styled.div`
  width: 70%;
  margin: 100px auto 50px auto;
  display: flex;
  justify-content: flex-end;
  padding-right: 110px;

  .card-album {
    width: 18rem;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #e1e5eb;
    border-radius: 10px;
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 20%;
  }

  .album-description {
    width: 80%;
    padding: 5px;
    font-weight: bold;
    color: #023031;
  }

  .card-album img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .main {
    font-family: Epilogue, sans-serif;
    font-size: 1.2rem;
  }
`;

export default Album;
