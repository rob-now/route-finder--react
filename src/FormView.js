import React, {Component} from 'react'

class FormView extends Component {
  render(){
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
        <button
          onClick={this.props.handleSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default FormView