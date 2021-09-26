import React, { Component } from 'react';
import styled from 'styled-components';

class Loading extends Component {
  render() {
    return (
      <LoadingStyles>
        <div>
          <i className="fas fa-spinner" />
          <p>Carregando</p>
        </div>
      </LoadingStyles>
    );
  }
}

const LoadingStyles = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #2FC18C;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .fa-spinner {
    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
