import React, {Component} from 'react'
import {withForm} from '../contexts/Form'

class FormView extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          name="startingPoint"
          aria-label="Starting point"
          placeholder="Starting point"
          value={this.props.startingPoint}
          onChange={this.props.handleChange}
        />
        <input
          type="text"
          name="destination"
          aria-label="Destination"
          placeholder="Destination"
          value={this.props.destination}
          onChange={this.props.handleChange}
        />
        <button
          onClick={this.props.addDestination}
        >
          Add destination
        </button>
        <input
          id="radio-fastest"
          type="radio"
          name="optimization"
          checked={this.props.optimization === 'fastest'}
          value='fastest'
          onChange={this.props.handleChange}
        />
        <label htmlFor="radio-fastest">Fastest</label>
        <input
          id="radio-shortest"
          type="radio"
          name="optimization"
          checked={this.props.optimization === 'shortest'}
          value="shortest"
          onChange={this.props.handleChange}
        />
        <label htmlFor="radio-shortest">Shortest</label>
        <button
          onClick={this.props.handleSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default withForm(FormView)