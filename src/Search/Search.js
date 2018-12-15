import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Input } from 'reactstrap'
import './Search.css'
import store from "../Store/store"
import * as actions from "../Reducer/actions"

export class Search extends Component {

  constructor(props) {
    super(props)
    this._handleFindClick = this._handleFindClick.bind(this)
    this.state = { value: '' }
  }

  _handleFindClick(event) {
    //TODO replace checkValidity with props checking
    //TODO set props from input text when button clicked
    //const usernameEl = document.getElementById('username');
    // if (!usernameEl.checkValidity()) {
    //   document.querySelector('form').reportValidity();
    //   return;
    // }
    store.dispatch({type: actions.SELECT_USER, payload: this.state.value})
    //TODO route through redux instead of manual
    //this.props.history.push(`/${username}/repositories`)
  }

  render() {
    return (
      <div className="gh-form-body">
        <div className="container">
          <h1>Find public repositories</h1>
          <Form className="gh-search-form" onSubmit={ e => { e.preventDefault(); }}>
            <Input onChange={ e => this.setState({ value: e.target.value }) } 
                   type="text" required placeholder="Enter A Github Username e.g. facebook" />
            <Button onClick={this._handleFindClick} color="primary">Find</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
