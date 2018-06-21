import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './FormView.css'
import FormErrorsView from './FormErrorsView'
import DestinationsList from './DestinationsList'

class FormView extends Component {
  render() {
    return (
      <div className="form__container">
        <div className="form__container--input-text">
          <label className="form__input-label" htmlFor="form__input-startingPoint">Starting point</label>
          <input
            id="form__input-startingPoint"
            className="form__input-text"
            type="text"
            name="startingPoint"
            value={this.props.startingPoint}
            onChange={this.props.handleChange}
          />
          <p className="form__input-description">*Name: "Gdańsk, aleja Grunwaldzka 141" or latitude and longitude value: "54.3812021,18.5979846".</p>
        </div>
        <div className="form__container--input-text">
          <label className="form__input-label" htmlFor="form__input-destination">Destination</label>
          <input
            id="form__input-destination"
            className="form__input-text"
            type="text"
            name="destination"
            value={this.props.destination}
            onChange={this.props.handleChange}
          />
          <p className="form__input-description">*Name: "Gdańsk, aleja Grunwaldzka 141" or latitude and longitude value: "54.3812021,18.5979846".</p>

        </div>
        <button
          className="form__btn btn-add-destination"
          onClick={this.props.addDestination}
        >
          Add destination
        </button>
        <div>
          <input
            id="form__radio-fastest"
            type="radio"
            name="optimization"
            checked={this.props.optimization === 'fastest'}
            value='fastest'
            onChange={this.props.handleChange}
          />
          <label htmlFor="form__radio-fastest">Fastest</label>
          <input
            id="form__radio-shortest"
            type="radio"
            name="optimization"
            checked={this.props.optimization === 'shortest'}
            value="shortest"
            onChange={this.props.handleChange}
          />
          <label htmlFor="form__radio-shortest">Shortest</label>
        </div>
        <button
          className="form__btn btn-submit"
          onClick={this.props.handleSubmit}
        >
          Submit
        </button>
        <FormErrorsView/>
        <DestinationsList/>
      </div>
    )
  }
}

export default withForm(FormView)