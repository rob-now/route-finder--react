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
            <p className="route-summary__item">
              {/*{this.props.optimization === ''}Total distance: {this.props.}*/}
            </p>
          </div>
        }
      </div>
    )
  }
}

export default withForm(RouteSummary)