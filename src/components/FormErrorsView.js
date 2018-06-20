import React, {Component} from 'react'

class FormErrorsView extends Component {
  render(){
    return (
      <div>
        {this.props.formError && <p>{this.props.formError.message}</p>}
      </div>
    )
  }
}

export default FormErrorsView