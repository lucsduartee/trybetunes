import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  onHandleChange = async (e) => {
    const { props: { onChange, music } } = this;
    onChange(e, music);
  }

  render() {
    const {
      props: { music, isFavorite },
    } = this;
    return (
      <div>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${music.trackId}` }
          htmlFor={ music.trackId }
        >
          Favorita
          <input
            name="isFavorite"
            id={ music.trackId }
            type="checkbox"
            onChange={ this.onHandleChange }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
