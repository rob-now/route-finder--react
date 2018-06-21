import React, {Component, Fragment} from 'react'
import {withForm} from './contexts/Form'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/Routes'

class App extends Component {

  render() {
    return (
      <Fragment>
        <Router>
          <Routes/>
        </Router>
      </Fragment>
    );
  }
}

export default withForm(App);
