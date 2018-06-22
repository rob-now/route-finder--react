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
    destinations: [],
    totalDistance: null,
    totalDuration: null,
    totalDistanceAlt: null,
    totalDurationAlt: null,
    optimization: '',
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
          formError: new Error('Destination cannot be empty')
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

    passFormErrorToContext: formError =>
      this.setState({
        formError
      }),

    handleSubmit: () => {
      const {startingPoint, destinations, optimization} = this.state

      this.setState({
        totalDistance: null,
        totalDuration: null,
        totalDistanceAlt: null,
        totalDurationAlt: null
      })

      if (startingPoint.trim() === '') {
        this.setState({
          formError: new Error('Starting point cannot be empty')
        })
        return
      }

      if (optimization.trim() === '') {
        this.setState({
          formError: new Error('You have to choose route optimization (fast or short)')
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
            totalDistance: this.state.totalDistance + distance,
            totalDuration: this.state.totalDuration + duration
          }) :
          fetcher === 'altFetcher' ?
            this.setState({
              totalDistanceAlt: this.state.totalDistanceAlt + distance,
              totalDurationAlt: this.state.totalDurationAlt + duration
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
              }
            })
          }
        })
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