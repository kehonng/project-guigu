import React, { Component } from 'react';
import widtCheckLogin from '$cont/with-check-login';

@widtCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
        home...
      </div>
    )
  }
}
export default Home;