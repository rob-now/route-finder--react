import React, {Component} from 'react'
import {withForm} from '../contexts/Form'

class RouteSummary extends Component {
  render() {
    return (
      <div>
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
                  <p>Total distance: {this.props.totalDistance} kilometers. Total duration: {this.props.totalDuration} minutes.</p> :
                  <p>Total distance: {this.props.totalDistanceAlt} kilometers. Total duration: {this.props.totalDurationAlt} minutes.</p>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withForm(RouteSummary)