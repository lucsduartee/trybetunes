import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Album extends Component {
  render() {
    const {
      props: { album },
    } = this;
    const { artistName, collectionName, collectionId, artworkUrl100 } = album;
    return (
      <div>
        <img src={ artworkUrl100 } alt="Capa do álbum" />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <p>{ collectionName }</p>
        </Link>
        <p>{ artistName }</p>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
