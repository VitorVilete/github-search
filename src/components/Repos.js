import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Repos extends Component {

  constructor(props){
      super(props);
      this.state = {
          repos:[],
          user: this.props.user ? this.props.user : 'reactjs'
      }
  }
  componentDidMount(){
      fetch(`https://api.github.com/users/${this.state.user}/repos`)
          .then(res => res.json())
          .then(data => this.setState({repos:data}));
  }
  render() {
    const repoItems = this.state.repos.map(repo => (      
      <div key={repo.id}>
        <h3>{repo.full_name}</h3>
        <p><a href={repo.url}>Repo link</a></p>
        <p><Link to={{ 
              pathname: `/repos/${repo.name}/commits`,
              state:{
                repoName: repo.name
              }
        }}> Commits</Link></p>
        <p>{repo.language}</p>
        <p>{repo.description}</p>
      </div>
    ))
    return (
      <div>
        <h1>Repos from {this.state.user}</h1>
        {repoItems}
      </div>
    )
  }
}

export default Repos;
