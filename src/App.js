import React, {Component} from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import styled from 'styled-components'

import Navigation from './components/Navigation'
import Error from './components/Error'
import Home from './components/Home'
import Repos from './components/Repos'
import Commits from './components/Commits'

const Div = styled.div `
  margin: auto;
  a{
    color: white;
  }
  a.emoji{
    text-decoration:none;
  }
  .container {
    width: 80%;
    margin: 0 auto;
    padding: 1.3em;
    display: flex;
    flex-direction: column;
    
  }

`;

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Div>
                    <Navigation/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route
                            path="/:user/repos"
                            render={(routeProps) => (<Repos {...routeProps}/>)}
                            exact/>
                        <Route
                            path="/:user/repos/:repo/commits"
                            render={(routeProps) => (<Commits {...routeProps}/>)}/>
                        <Route render={(props) => <Error {...props} message={'Path not found'}/>}/>
                    </Switch>
                </Div>
            </BrowserRouter>
        );
    }
}

export default App;
