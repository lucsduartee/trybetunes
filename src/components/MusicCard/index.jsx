import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
      <MusicaCardStyles>
        <div className="music">
          <p>{music.trackName}</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <div className="custom-checkbox">
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
      </MusicaCardStyles>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

const MusicaCardStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  font-family: 'Epilogue', sans-serif;
  font-weight: 600;
  color: #001813;
  border-top: 1px solid #E1E5EB;

  .music {
    margin-bottom: 16px;
    font-family: 'Epilogue', sans-serif;
  }

  .music p {
    margin: 16px 0;
  }
`;

export default MusicCard;
