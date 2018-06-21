import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import FormView from '../components/FormView'
import RouteSummary from '../components/RouteSummary'

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={FormView}/>
        <Route path="/best-route" component={RouteSummary}/>
      </Fragment>
    )
  }
}

export default Routes