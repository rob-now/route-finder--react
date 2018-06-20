import React, {Component, Fragment} from 'react';
import GoogleMapsLoader from 'google-maps'
import Form from "./components/Form";
import FormErrorsView from "./components/FormErrorsView";
import DestinationsList from "./components/DestinationsList";
import DirectionsView from "./components/DirectionsView";

const apiKey = 'AIzaSyC_1ShOt4e8e2kogxZ_rR1VEzHdUBnFjMo'
GoogleMapsLoader.KEY = apiKey

class App extends Component {

  state = {
    startingPoint: '',
    destination: '',
    destinations: [
      {
        id: 0,
        location: 'Gdansk, Grunwaldzka 141',
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
    totalDistance: null,
    totalDuration: null,
    totalDistanceAlt: null,
    totalDurationAlt: null,
    optimization: 'shortest',
    displayDirections: false,
    fetchingResult: null,
    fetchingResultAlt: null,
    fetching: false,
    fetchingError: null,
    formError: null
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  addDestination = event => {
    event.preventDefault()

    if (this.state.destination.trim() === '') {
      this.setState({
        formError: new Error('Destination cannot be empty.')
      })
      return
    }

    this.setState(
      ({destinations}) => ({
        destinations: destinations.concat({
          id: (destinations.length > 0 && destinations[destinations.length - 1].id + 1) || 0,
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

  displayDirections = (result, resultAlt) => {
    const {optimization, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt} = this.state
    console.log('Directions in displayDirections:', result, resultAlt, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt)

    GoogleMapsLoader.load(function (google) {
      const directionsDisplay = new google.maps.DirectionsRenderer()
      const directionsPanel = document.getElementById('directionsPanel')
      directionsDisplay.setPanel(directionsPanel)
      if ((optimization === 'shortest' && totalDistance <= totalDistanceAlt) ||
        (optimization === 'fastest' && totalDuration <= totalDurationAlt)) {
        directionsDisplay.setDirections(result)
        console.log('fetchingResult', result)
      } else {
        directionsDisplay.setDirections(resultAlt)
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.startingPoint.trim() === '') {
      this.setState({
        formError: new Error('Starting point cannot be empty.')
      })
      return
    }

    this.setState({
      fetching: true,
      fetchingError: null,
      formError: null
    })

    const {startingPoint, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt} = this.state

    // Creating waypoints Array for Destinations API
    const directionsWaypoints = () =>
      this.state.destinations.map(
        destination =>
          ({
            location: destination.location,
            stopover: destination.stopover
          })
      )

    const calculateDistanceAndDuration = (distance, duration) => {
      this.setState({
        totalDistance: this.state.totalDistance + distance,
        totalDuration: this.state.totalDuration + duration
      })
      // console.log('distance', distance)
    }

    const calculateDistanceAndDurationAlt = (distance, duration) => {
      this.setState({
        totalDistanceAlt: this.state.totalDistanceAlt + distance,
        totalDurationAlt: this.state.totalDurationAlt + duration
      })
      // console.log('distanceAlt', distance)
    }

    const fetchingIsFinished = () =>
      this.setState({
        fetching: false,
        fetchingError: null
      })

    const directionsResult = result => {
      const route = result.routes[0].legs
      route.map(
        leg =>
          calculateDistanceAndDuration(
            Math.round(leg.distance.value / 1000),
            Math.round(leg.duration.value / 60)
          )
      )
    }

    const directionsResultAlt = result => {
      const route = result.routes[0].legs
      route.map(
        leg =>
          calculateDistanceAndDurationAlt(
            Math.round(leg.distance.value / 1000),
            Math.round(leg.duration.value / 60)
          )
      )
    }

    const displayDirections = (result, resultAlt) =>
      this.displayDirections(result, resultAlt)

    const putFetchingResultToState = result =>
      this.setState({
        fetchingResult: result
      })

    const putFetchingResultAltToState = resultAlt =>
      this.setState({
        fetchingResultAlt: resultAlt
      })

    GoogleMapsLoader.load(function (google) {
      const request = {
        origin: startingPoint,
        destination: startingPoint,
        waypoints: directionsWaypoints(),
        optimizeWaypoints: true,
        // provideRouteAlternatives: true,
        avoidHighways: false,
        travelMode: 'DRIVING'
      }
      const requestAlt = {
        ...request,
        avoidHighways: true,
      }

      const directionsService = new google.maps.DirectionsService()

      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          directionsResult(result)
          console.log('Directions:', result, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt)
          putFetchingResultToState(result)

          directionsService.route(requestAlt, function (resultAlt, status) {
            if (status === 'OK') {
              fetchingIsFinished()
              directionsResultAlt(resultAlt)
              console.log('DirectionsAlt:', resultAlt)
              putFetchingResultAltToState(resultAlt)
              displayDirections(result, resultAlt)
            }
          })
        }
      })
    })

    this.setState({
      startingPoint: ''
    })
  }

  render() {
    console.log('totalDistance', this.state.totalDistance, 'totalDuration', this.state.totalDuration)
    return (
      <Fragment>
        <Form
          startingPoint={this.state.startingPoint}
          destination={this.state.destination}
          handleChange={this.handleChange}
          addDestination={this.addDestination}
          handleSubmit={this.handleSubmit}
        />
        <FormErrorsView
          formError={this.state.formError}
        />
        <DestinationsList
          destinations={this.state.destinations}
        />
        <DirectionsView/>
      </Fragment>
    );
  }
}

export default App;
