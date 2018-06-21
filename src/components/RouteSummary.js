import React, {Component, Fragment} from 'react'
import {withForm} from '../contexts/Form'
import './RouteSummary.css'

class RouteSummary extends Component {

  componentDidMount() {
    if (this.props.optimization === '') {
      this.props.history.push(`/`)
    }
  }

  render() {
    const fetchedResultLegs = this.props.fetchedResult && this.props.fetchedResult.routes[0].legs
    const fetchedResultAltLegs = this.props.fetchedResultAlt && this.props.fetchedResultAlt.routes[0].legs
    console.log('fetchedResultLegs', fetchedResultLegs, 'fetchedResultAltLegs', fetchedResultAltLegs)
    return (
      <Fragment>
        {
          this.props.totalDistance &&
          this.props.totalDuration &&
          this.props.totalDistanceAlt &&
          this.props.totalDurationAlt &&
          <div className="route-summary__container">
            <p className="route-summary__title">
              Route summary:
            </p>
            <div className="route-summary__item">
              {
                (this.props.optimization === 'shortest' && this.props.totalDistance <= this.props.totalDistanceAlt) ||
                (this.props.optimization === 'fastest' && this.props.totalDuration <= this.props.totalDurationAlt) ?
                  <div>
                  <p>Total distance: {this.props.totalDistance} kilometers. Total
                    duration: {this.props.totalDuration} minutes.</p>
                    <div className="route-summary__table">
                      <div className="route-summary__table-row route-summary__table-heading">
                        <div className="route-summary__table-cell route-summary__table-cell-first">
                          Waypoints
                        </div>
                        <div className="route-summary__table-cell">
                          Distance
                        </div>
                        <div className="route-summary__table-cell">
                          Duration
                        </div>
                      </div>
                      <div className="route-summary__table-row">
                        <div className="route-summary__table-cell route-summary__table-cell-first">
                          Bukowa 2
                        </div>
                        <div className="route-summary__table-cell">

                        </div>
                        <div className="route-summary__table-cell">

                        </div>
                      </div>
                      <div className="route-summary__table-row">
                        <div className="route-summary__table-cell route-summary__table-cell-first">
                          Leśna 15
                        </div>
                        <div className="route-summary__table-cell">
                          17km
                        </div>
                        <div className="route-summary__table-cell">
                          25min
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <p>Total distance: {this.props.totalDistanceAlt} kilometers. Total
                    duration: {this.props.totalDurationAlt} minutes.</p>
              }
            </div>
          </div>
        }
      </Fragment>
    )
  }
}

export default withForm(RouteSummary)