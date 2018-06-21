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
                    <p>Total distance: <strong>{this.props.totalDistance} km</strong>.</p>
                    <p>Total duration: <strong>{this.props.totalDuration} min</strong>.</p>

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
                          {fetchedResultLegs[0].start_address}
                        </div>
                        <div className="route-summary__table-cell">

                        </div>
                        <div className="route-summary__table-cell">

                        </div>
                      </div>
                      {
                        fetchedResultLegs.map(
                          leg =>

                            <div className="route-summary__table-row">
                              <div className="route-summary__table-cell route-summary__table-cell-first">
                                {leg.end_address}
                              </div>
                              <div className="route-summary__table-cell">
                                {leg.distance.text}
                              </div>
                              <div className="route-summary__table-cell">
                                {leg.duration.text}
                              </div>
                            </div>
                        )
                      }
                    </div>
                  </div>
                  :
                  <Fragment>
                    <p>Total distance: <strong>{this.props.totalDistanceAlt} km</strong>.</p>
                    <p>Total duration: <strong>{this.props.totalDurationAlt} min</strong>.</p>
                  </Fragment>
              }
            </div>
          </div>
        }
      </Fragment>
    )
  }
}

export default withForm(RouteSummary)