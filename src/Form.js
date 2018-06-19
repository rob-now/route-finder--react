import React, {Component} from 'react';

class Form extends Component {

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
        />
        <input
          type="text"
          name="destination"
          aria-label="Destination"
          placeholder="Destination"
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default Form;
