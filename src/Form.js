import React, {Component, Fragment} from 'react';
import GoogleMapsLoader from 'google-maps'

const apiKey = 'AIzaSyC_1ShOt4e8e2kogxZ_rR1VEzHdUBnFjMo'
GoogleMapsLoader.KEY = apiKey

class Form extends Component {

  state = {
    startingPoint: '',
    destination: '',
    destinations: [
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
    fetchingError: null,
    formError: null
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  addDestination = () => {
    if (this.state.destination.trim() === '') {
      this.setState({
        formError: new Error('Destination cannot be empty')
      })
      return
    }

    this.setState(
      ({destinations}) => ({
        destinations: destinations.concat({
          id: destinations[destinations.length - 1].id + 1 || 0,
          location: this.state.destination,
          stopover: true
        }),
        destination: '',
        formError: null
      })
    )
  }

  removeDestination = destinationId =>
    this.setState(
      ({destinations}) => ({
        destinations: destinations.filter(
          ({id}) => id !== destinationId
        )
      })
    )

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.startingPoint.trim() === '') {
      this.setState({
        formError: new Error('Starting point cannot be empty')
      })
      return
    }

    this.setState({
      fetching: true,
      fetchingError: null,
      formError: null
    })

    const startingPoint = this.state.startingPoint
    // const destination = this.state.destination

    // Creating waypoints Array from destinations for GoogleMapsLoader
    const waypoints = () =>
      this.state.destinations.map(
        destination =>
          ({
            location: destination.location,
            stopover: destination.stopover
          })
      )

    const fetchingFinished = () =>
      this.setState({
        fetching: false,
        fetchingError: null
      })

    GoogleMapsLoader.load(function (google) {
      const request = {
        origin: startingPoint,
        destination: startingPoint,
        waypoints: waypoints(),
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }
      const directionsService = new google.maps.DirectionsService()
      const directionsDisplay = new google.maps.DirectionsRenderer()
      let directionsPanel = document.getElementById('directionsPanel')
      directionsDisplay.setPanel(directionsPanel)
      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          console.log(result)
          fetchingFinished()
          directionsDisplay.setDirections(result)
        }
      })
    })

    this.setState({
      startingPoint: ''
    })

    // console.log('waypoints created', waypoints())
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
          {this.state.formError && <p>{this.state.formError.message}</p>}
        </div>

        <div>
          <button
            onClick={this.addDestination}
          >
            Add destination
          </button>
          <ul>
            {
              this.state.destinations.map(
                ({id, location}) =>
                  <div key={id}>
                    <li>{location}</li>
                    <button onClick={() => this.removeDestination(id)}>Remove</button>
                  </div>
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
