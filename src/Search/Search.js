import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import './Search.css';

class Search extends Component {

  constructor(props){
    super(props)
    this._handleFindClick = this._handleFindClick.bind(this);
  }

  _handleFindClick(event) {
    const usernameEl = document.getElementById('username');
    if (!usernameEl.checkValidity()) {
      document.querySelector('form').reportValidity();
      return;
    }
    this.props.history.push(`/${usernameEl.value}/repositories`);
  }

  render() {
    return (
      <div className="gh-form-body">
        <div className="container">
          <h1>Find public repositories</h1>
          <Form className="gh-search-form">
            <Input id="username" type="text" required placeholder="Enter A Github Username e.g. facebook" />
            <Button onClick={this._handleFindClick} color="primary">Find</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
