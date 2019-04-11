import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navigation from './components/Navigation'
import Error from './components/Error'
import Home from './components/Home'
import Repos from './components/Repos'
import Commits from './components/Commits'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/repos" component={Repos} exact/>      
          <Route path="/repos/:repo/commits" component={Commits}/>
          <Route component={Error}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
