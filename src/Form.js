import React, {Component, Fragment} from 'react';
import GoogleMapsLoader from 'google-maps'

const apiKey = 'AIzaSyC_1ShOt4e8e2kogxZ_rR1VEzHdUBnFjMo'
GoogleMapsLoader.KEY = apiKey

class Form extends Component {

  state = {
    startingPoint: '',
    destination: '',
    waypoints: [
      {
        id: 0,
        location: 'Gdansk, Slowackiego',
        stopover: true
      }, {
        id: 1,
        location: 'Gdansk, Lostowicka',
        stopover: true
      }, {
        id: 2,
        location: 'Gdansk, Dworska',
        stopover: true
      }, {
        id: 3,
        location: 'Gdansk, Rakoczego',
        stopover: true
      }, {
        id: 4,
        location: 'Gdansk, Polanki',
        stopover: true
      }
    ],
    fetching: false,
    error: null
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  addDestination = () =>
    this.setState({
      waypoints: this.state.waypoints.concat({
        id: this.state.waypoints.length || 0,
        location: this.state.destination,
        stopover: true
      })
    })

  handleSubmit = event => {
    event.preventDefault()

    this.setState({
      fetching: true,
      error: null
    })

    const startingPoint = this.state.startingPoint
    // const destination = this.state.destination
    const waypoints = this.state.waypoints
    const fetchingFinished = () =>
      this.setState({
        fetching: false,
        error: null
      })

    GoogleMapsLoader.load(function (google) {
      const request = {
        origin: startingPoint,
        destination: startingPoint,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }
      const directionsService = new google.maps.DirectionsService()
      const directionsDisplay = new google.maps.DirectionsRenderer()
      directionsDisplay.setPanel(document.getElementById('directionsPanel'))
      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          console.log(result)
          fetchingFinished()
          directionsDisplay.setDirections(result)
        }
      })
    })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="startingPoint"
            aria-label="Starting point"
            placeholder="Starting point"
            value={this.state.startingPoint}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="destination"
            aria-label="Destination"
            placeholder="Destination"
            value={this.state.destination}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <div>
          <button
            onClick={this.addDestination}
          >
            Add destination
          </button>
          <ul>
            {
              this.state.waypoints.map(
                waypoint =>
                  <li key={waypoint.id}>{waypoint.location}</li>
              )
            }
          </ul>
        </div>
        <div id="directionsPanel">
        </div>
      </Fragment>
    );
  }
}

export default Form;
