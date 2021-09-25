import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './Switcher';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switcher />
      </BrowserRouter>
    );
  }
}

export default App;
