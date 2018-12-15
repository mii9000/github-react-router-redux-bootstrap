import React, { Component } from 'react'
import { Button, Form, Input } from 'reactstrap'
import { browserhistory } from "react-router"
import './index.css'
import store from "../../state/store"
import * as actions from "../../state/actions"

export class Search extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      value: '',
      valid: true
    }
    this._handleFindClick = this._handleFindClick.bind(this)
    this._handleOnChange = this._handleOnChange.bind(this)
  }

  _handleFindClick(event) {
    if (this.state.value.length == 0) {
      this.setState({...this.state, valid: false})
      return;
    }
    store.dispatch({type: actions.SELECT_USER, payload: this.state.value})
    this.props.history.push(`/${this.state.value}/repositories`)
  }

  _handleOnChange(event) {
    this.setState({ value: event.target.value, valid: true })
  }

  render() {
    return (
      <div className="gh-form-body">
        <div className="container">
          <h1>Find public repositories</h1>
          <Form className="gh-search-form" onSubmit={ e => { e.preventDefault(); }}>
            <Input onChange={this._handleOnChange} 
                   type="text" required placeholder="Enter A Github Username e.g. facebook"
                   className={this.state.valid ? "" : "gh-error"} />
            <Button onClick={this._handleFindClick} color="primary">Find</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Search
