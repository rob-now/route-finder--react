import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './FormView.css'
import FormErrorsView from './FormErrorsView'
import DestinationsList from './DestinationsList'

class FormView extends Component {
  render() {
    return (
      <div className="form__container">
        <div>
          <label htmlFor="form__input-startingPoint">Starting point</label>
          <input
            id="form__input-startingPoint"
            type="text"
            name="startingPoint"
            aria-label="Starting point"
            placeholder="Starting point"
            value={this.props.startingPoint}
            onChange={this.props.handleChange}
          />
        </div>
        <div>
          <label htmlFor="form__input-destination">Destination</label>
          <input
            id="form__input-destination"
            type="text"
            name="destination"
            aria-label="Destination"
            placeholder="Destination"
            value={this.props.destination}
            onChange={this.props.handleChange}
          />
        </div>
        <button
          className="form__btn add-destination"
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
          className="form__btn submit"
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