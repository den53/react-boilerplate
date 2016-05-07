//  require custom CSS
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

//  require npm packages
import React, { Component } from 'react';
import 'bootstrap';

// Ad custom components
import Header from './Header.jsx';

/*
var Jumbotron = require('./Jumbotron.jsx');
var PageHome = require('./PageHome.jsx');
var PageAbout = require('./PageAbout.jsx');
var Footer = require('./Footer.jsx');
*/
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <p className="text-center">Add more components here.</p>
        <img className="center-block" src="/img/350x150.png"></img>
      </div>
    );
  }
}
