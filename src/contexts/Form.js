import React, {Component} from 'react'
import GoogleMapsLoader from 'google-maps'
import {apiKey} from '../api/ApiKey'

GoogleMapsLoader.KEY = apiKey

const FormContext = React.createContext()

export const FormConsumer = FormContext.Consumer

export class FormProvider extends Component {

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
    fetchedResult: null,
    fetchedResultAlt: null,
    fetching: false,
    formError: null,

    handleChange: event =>
      this.setState({
        [event.target.name]: event.target.value
      }),

    addDestination: event => {
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
    },

    removeDestination: destinationId =>
      this.setState(
        ({destinations}) => ({
          destinations: destinations.filter(
            ({id}) => id !== destinationId
          )
        })
      ),

    displayDirections: (result, resultAlt) => {
      const {optimization, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt} = this.state

      GoogleMapsLoader.load(function (google) {
        const directionsDisplay = new google.maps.DirectionsRenderer()
        const directionsPanel = document.getElementById('directionsPanel')
        directionsDisplay.setPanel(directionsPanel)
        if ((optimization === 'shortest' && totalDistance <= totalDistanceAlt) ||
          (optimization === 'fastest' && totalDuration <= totalDurationAlt)) {
          directionsDisplay.setDirections(result)
        } else {
          directionsDisplay.setDirections(resultAlt)
        }
      })
    },

    handleSubmit: event => {
      event.preventDefault()

      const {startingPoint, destinations, totalDistance, totalDistanceAlt, totalDuration, totalDurationAlt} = this.state

      if (startingPoint.trim() === '') {
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

      // Creating waypoints Array for Destinations API
      const directionsWaypoints = () =>
        destinations.map(
          destination =>
            ({
              location: destination.location,
              stopover: destination.stopover
            })
        )

      const calculateDistanceAndDuration = (fetcher, distance, duration) =>
        fetcher === 'firstFetcher' ?
          this.setState({
            totalDistance: totalDistance + distance,
            totalDuration: totalDuration + duration
          }) :
          fetcher === 'altFetcher' ?
            this.setState({
              totalDistanceAlt: totalDistanceAlt + distance,
              totalDurationAlt: totalDurationAlt + duration
            }) :
            undefined

      const fetchingIsFinished = () =>
        this.setState({
          fetching: false,
          fetchingError: null
        })

      const getDistanceAndDurationValues = (fetcher, result) => {
        const route = result.routes[0].legs
        route.map(
          leg =>
            calculateDistanceAndDuration(
              fetcher,
              Math.round(leg.distance.value / 1000),
              Math.round(leg.duration.value / 60)
            )
        )
      }

      const putFetchingResultToState = (fetcher, result) =>
        fetcher === 'firstFetcher' ?
          this.setState({
            fetchedResult: result
          }) :
          fetcher === 'altFetcher' ?
            this.setState({
              fetchedResultAlt: result
            }) :
            undefined

      const displayDirections = (result, resultAlt) =>
        this.state.displayDirections(result, resultAlt)

      GoogleMapsLoader.load(function (google) {
        const request = {
          origin: startingPoint,
          destination: startingPoint,
          waypoints: directionsWaypoints(),
          optimizeWaypoints: true,
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
            const fetcher = 'firstFetcher'
            getDistanceAndDurationValues(fetcher, result)
            putFetchingResultToState(fetcher, result)

            directionsService.route(requestAlt, function (resultAlt, status) {
              if (status === 'OK') {
                const fetcher = 'altFetcher'
                fetchingIsFinished()
                getDistanceAndDurationValues(fetcher, resultAlt)
                putFetchingResultToState(fetcher, resultAlt)
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
  }

  render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
      </FormContext.Provider>
    )
  }
}

export function withForm(Component) {
  function FormAwareComponent(props) {
    return (
      <FormConsumer>
        {state =>
          <Component {...props} {...state}/>}
      </FormConsumer>
    )
  }

  FormAwareComponent.displayName = `FormAware(${Component.displayName || Component.name || 'Component'})`

  return FormAwareComponent
}