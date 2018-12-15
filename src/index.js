import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Router from "./Router/Router";
import store from "./Store/store";

ReactDOM.render(<Router />, document.getElementById('root'))
