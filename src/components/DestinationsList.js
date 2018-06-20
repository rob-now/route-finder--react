import React, {Component} from 'react'

class DestinationsList extends Component {
  render(){
    return (
      <div>
        <ul>
          {
            this.props.destinations.map(
              ({id, location}) =>
                <div key={id}>
                  <li>{location}</li>
                  <button
                    onClick={() => this.removeDestination(id)}
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

export default DestinationsList