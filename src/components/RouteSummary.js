import React, {Component, Fragment} from 'react'
import {withForm} from '../contexts/Form'
import './RouteSummary.css'
import 'font-awesome/css/font-awesome.min.css'

class RouteSummary extends Component {

  componentDidMount() {
    if (this.props.optimization === '') {
      this.props.history.push(`/`)
    }
  }

  handleGoBack = () =>
    this.props.history.push('/')

  makeSummaryTable = (legs, fetcher) =>
    <div>
      <p>Total
        distance: <strong>{fetcher === 'firstFetcher' ? this.props.totalDistance : fetcher === 'secondFetcher' ? this.props.totalDistanceAlt : undefined} km</strong>.
      </p>
      <p>Total
        duration: <strong>{fetcher === 'firstFetcher' ? this.props.totalDuration : fetcher === 'secondFetcher' ? this.props.totalDurationAlt : undefined} min</strong>.
      </p>

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
        <div className="route-summary__table-row route-summary__table-row-highlight">
          <div className="route-summary__table-cell route-summary__table-cell-first">
            {legs && legs[0].start_address}
          </div>
          <div className="route-summary__table-cell">

          </div>
          <div className="route-summary__table-cell">

          </div>
        </div>
        {
          legs && legs.map(
            (leg, index) =>
              <Fragment key={index}>
                <div className="route-summary__table-row-100">
                  {
                    leg.steps.map(
                      (step, index) =>
                        <Fragment key={index}>
                          <div className="route-summary__table-row">
                            <div
                              className="route-summary__table-cell-first-instr"
                            >
                              {step.instructions.replace(/(<div.*?>)|(<.*?>)/gi, '\n')}
                            </div>
                            <div className="route-summary__table-cell-instr">
                              {step.distance.text}
                            </div>
                            <div className="route-summary__table-cell-instr">
                              {step.duration.text}
                            </div>
                          </div>
                        </Fragment>
                    )
                  }
                </div>
                <div className="route-summary__table-row route-summary__table-row-highlight">
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
              </Fragment>
          )
        }
      </div>
    </div>

  render() {
    const fetchedResultLegs = this.props.fetchedResult && this.props.fetchedResult.routes[0].legs
    const fetchedResultAltLegs = this.props.fetchedResultAlt && this.props.fetchedResultAlt.routes[0].legs
    return (
      <Fragment>
        {this.props.fetching && <h2 className="route-summary__loading">Loading content...</h2>}
        {
          this.props.totalDistance &&
          this.props.totalDuration &&
          this.props.totalDistanceAlt &&
          this.props.totalDurationAlt &&
          <div className="route-summary__container">
            <h3>
              <i
                className="fas fa-arrow-circle-left"
                onClick={this.handleGoBack}
              >&nbsp;
              </i>
              <span className="route-summary__title">
              Route summary:
            </span>
            </h3>
            <div className="route-summary__item">
              {
                (this.props.optimization === 'shortest' && this.props.totalDistance <= this.props.totalDistanceAlt) ||
                (this.props.optimization === 'fastest' && this.props.totalDuration <= this.props.totalDurationAlt) ?
                  this.makeSummaryTable(fetchedResultLegs, 'firstFetcher') :
                  this.makeSummaryTable(fetchedResultAltLegs, 'secondFetcher')
              }
            </div>
          </div>
        }
        <div id="directionsPanel">
        </div>
      </Fragment>
    )
  }
}

export default withForm(RouteSummary)