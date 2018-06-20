import React, {Component} from 'react'
import {withForm} from '../contexts/Form'

class FormErrorsView extends Component {
  render() {
    return (
      <div>
        {this.props.formError && <p>{this.props.formError.message}</p>}
      </div>
    )
  }
}

export default withForm(FormErrorsView)