import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Album extends Component {
  render() {
    const {
      props: { album },
    } = this;
    const { artistName, collectionName, collectionId, artworkUrl100 } = album;
    return (
      <AlbumStyles>
        <div className="card-album">
          <img src={ artworkUrl100 } alt="Capa do álbum" />
          <div className="description">
            <Link
              className="link"
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <p>{ collectionName }</p>
            </Link>
            <p>{ artistName }</p>
          </div>
        </div>
      </AlbumStyles>
    );
  }
}

Album.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
};

const AlbumStyles = styled.div`
  .card-album {
    width: 18rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border: 1px solid #E1E5EB;
    border-radius: 10px;
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.3);
  }

  .description {
    width: 80%;
    padding: 10px;
  }

  .link {
    text-decoration: none;
    color: #3D495C;
    font-weight: bold;
  }

  div img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  p {
    color: #3D495C;
  }
`;

export default Album;
