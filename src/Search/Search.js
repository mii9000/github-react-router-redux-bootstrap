import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className="gh-form-body">
        <div className="container">
          <h1>Find public repositories</h1>
          <Form className="gh-search-form">
            <Input type="text" placeholder="Enter A Github Username e.g. facebook" />
            <Button color="primary">Find</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Search;
