import React, {Component} from 'react';

class Form extends Component {

  state = {
    startingPoint: '',
    destination: ''
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  handleSubmit = event =>
    event.preventDefault()

  render() {
    return (
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
    );
  }
}

export default Form;
