import React, {Component} from 'react'
import {withForm} from '../contexts/Form'

class DestinationsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.destinations.map(
              ({id, location}) =>
                <div key={id}>
                  <li>{location}</li>
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