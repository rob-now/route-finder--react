import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './FormView.css'
import FormErrorsView from './FormErrorsView'
import DestinationsList from './DestinationsList'

class FormView extends Component {

  handleClick = event => {
    event.preventDefault()

    if (this.props.startingPoint.trim() === '') {
      this.props.passFormErrorToContext(new Error('Starting point cannot be empty'))
      return
    }

    if (this.props.destinations.length === 0) {
      this.props.passFormErrorToContext(new Error('There are no destinations'))
      return
    }

    this.props.handleSubmit()
    this.props.history.push(`/best-route`)
  }

  render() {
    return (
      <div className="form__container">

        <form onSubmit={this.handleClick}>
          <div className="form__container--input-text">
            <label className="form__input-text-label" htmlFor="form__input-startingPoint">Starting point</label>
            <input
              id="form__input-startingPoint"
              className="form__input-text"
              type="text"
              name="startingPoint"
              value={this.props.startingPoint}
              onChange={this.props.handleChange}
            />
            <p className="form__input-description">*Name: "Gdańsk, aleja Grunwaldzka 141" or latitude and longitude
              value:
              "54.3812021,18.5979846"</p>
          </div>
          <button
            className="form__btn btn-submit"
            onClick={this.handleClick}
          >
            Show best route
          </button>
        </form>

        <form onSubmit={this.props.addDestination}>
          <div className="form__container--input-text">
            <label className="form__input-text-label" htmlFor="form__input-destination">Destination</label>
            <input
              id="form__input-text-destination"
              className="form__input-text"
              type="text"
              name="destination"
              value={this.props.destination}
              onChange={this.props.handleChange}
            />
            <p className="form__input-description">*Name: "Gdańsk, aleja Grunwaldzka 141" or latitude and longitude
              value:
              "54.3812021,18.5979846"</p>

          </div>
          <button
            className="form__btn btn-add-destination"
            onClick={this.props.addDestination}
          >
            Add destination
          </button>
          <p className="form__input-description">*You can add destination to the list of destinations</p>
        </form>

        <div className="form__container--input-radio">
          <p className="form__input-radio-title">Choose route optimization:</p>
          <div className="form__container--input-radio-buttons">
            <input
              id="form__radio-fastest"
              className="form__radio-input"
              type="radio"
              name="optimization"
              checked={this.props.optimization === 'fastest'}
              value='fastest'
              onChange={this.props.handleChange}
            />
            <label className="form__radio-input" htmlFor="form__radio-fastest">Fast</label>
            <input
              id="form__radio-shortest"
              className="form__radio-input"
              type="radio"
              name="optimization"
              checked={this.props.optimization === 'shortest'}
              value="shortest"
              onChange={this.props.handleChange}
            />
            <label className="form__radio-input" htmlFor="form__radio-shortest">Short</label>
          </div>
        </div>

        <FormErrorsView/>
        <DestinationsList/>
      </div>
    )
  }
}

export default withForm(FormView)