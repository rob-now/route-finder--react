import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './DestinationsList.css'
import 'font-awesome/css/font-awesome.min.css'

class DestinationsList extends Component {
  render() {
    return (
      <div className="destinations-list__container">
        <p className="destinations-list__title">List of destinations:</p>
        <ul className="destinations-list__list">
          {
            this.props.destinations.map(
              ({id, location}) =>
                <div key={id} className="destinations-list__list-item-container">
                  <li className="destinations-list__list-item">{location} &nbsp;</li>
                  <i
                    className="fas fa-times fa-sm"
                    onClick={() => this.props.removeDestination(id)}
                  />
                </div>
            )
          }
        </ul>
      </div>
    )
  }
}

export default withForm(DestinationsList)