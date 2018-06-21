import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './DestinationsList.css'

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
                  <li className="destinations-list__list-item">{location}</li>
                  <button
                    onClick={() => this.props.removeDestination(id)}
                  >
                    Remove
                  </button>
                </div>
            )
          }
        </ul>
      </div>
    )
  }
}

export default withForm(DestinationsList)