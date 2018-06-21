import React, {Component} from 'react'
import {withForm} from '../contexts/Form'
import './FormErrorsView.css'

class FormErrorsView extends Component {
  render() {
    return (
      <div className="form-errors__container">
        {this.props.formError && <p className="form-errors__paragraph">{this.props.formError.message}</p>}
      </div>
    )
  }
}

export default withForm(FormErrorsView)