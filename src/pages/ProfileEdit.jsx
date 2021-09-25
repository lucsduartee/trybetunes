import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
      </div>
    );
  }
}

export default ProfileEdit;
