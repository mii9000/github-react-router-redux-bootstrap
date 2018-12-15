import React, { Component } from 'react'
import { Button, Form, Input } from 'reactstrap'
import './index.css'
import { setUsername, resetState } from '../../state/actionCreators'

export class Search extends Component {

  constructor() {
    super()
    this.state = { 
      value: '',
      valid: true
    }
    this._handleFindClick = this._handleFindClick.bind(this)
    this._handleOnChange = this._handleOnChange.bind(this)
  }

  componentDidMount() {
    resetState()
  }

  _handleFindClick(event) {
    const username = this.state.value
    if (username.length == 0) {
      this.setState({...this.state, valid: false})
      return;
    }
    setUsername(username)
    this.props.history.push(`/${username}/repositories`)
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
                   type="text" placeholder="Enter A Github Username e.g. facebook"
                   className={this.state.valid ? "" : "gh-error"} />
            <Button onClick={this._handleFindClick} color="primary">Find</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Search
