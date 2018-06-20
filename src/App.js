import React, {Component, Fragment} from 'react'
import FormView from './components/FormView'
import FormErrorsView from './components/FormErrorsView'
import DestinationsList from './components/DestinationsList'
import DirectionsView from './components/DirectionsView'
import {withForm} from './contexts/Form'

class App extends Component {

  render() {
    return (
      <Fragment>
        <FormView/>
        <FormErrorsView/>
        <DestinationsList/>
        <DirectionsView/>
      </Fragment>
    );
  }
}

export default withForm(App);
