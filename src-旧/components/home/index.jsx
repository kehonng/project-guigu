import React, { Component } from 'react'
import withCheckLogin from '$cont/with-check-login';

@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
        home..
      </div>
    )
  }
}
export default Home;
