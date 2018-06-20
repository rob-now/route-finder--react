import React, {Component, Fragment} from 'react'
import FormView from './components/FormView'
import DirectionsView from './components/DirectionsView'
import {withForm} from './contexts/Form'

class App extends Component {

  render() {
    return (
      <Fragment>
        <FormView/>

        <DirectionsView/>
      </Fragment>
    );
  }
}

export default withForm(App);
