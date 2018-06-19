import React, {Component, Fragment} from 'react';
import GoogleMapsLoader from 'google-maps'

const apiKey = 'AIzaSyC_1ShOt4e8e2kogxZ_rR1VEzHdUBnFjMo'
GoogleMapsLoader.KEY = apiKey

class Form extends Component {

  state = {
    startingPoint: '',
    destination: '',
    fetching: false,
    error: null
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  handleSubmit = event => {
    event.preventDefault()

    this.setState({
      fetching: true,
      error: null
    })

    const startingPoint = this.state.startingPoint
    const destination = this.state.destination
    const fetchingFinished = () =>
      this.setState({
        fetching: false,
        error: null
      })

    GoogleMapsLoader.load(function (google) {
      const request = {
        origin: startingPoint,
        destination: destination,
        travelMode: 'DRIVING'
      }
      const directionsService = new google.maps.DirectionsService()
      // const directionsDisplay = new google.maps.DirectionsRenderer()
      // directionsDisplay.setPanel(document.getElementById('directionsPanel'))
      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          console.log(result)
          fetchingFinished()
          // directionsDisplay.setDirections(result)
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
        <div id="directionsPanel">
        </div>
      </Fragment>
    );
  }
}

export default Form;
