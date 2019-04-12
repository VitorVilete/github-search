import React, { Component } from 'react'
import styled from 'styled-components';

const Commit = styled.div`
div {
  width:100%;
}

ul {
  list-style-type: none;
  margin: 0;padding: 0;

  li {
      background: rgb(238, 238, 238);
      padding: 2em;
      border-radius: 4px;
      margin-bottom: 7px;

      p {          
          margin-left: 20px;
      }

      img {
          border-radius: 50%;
          width: 100%;
      }


  }
}
`;


class Commits extends Component {    
  constructor(props){
    super(props);
    this.state = {
      commits:[]
    }    
  }
  
  
  getCommits = () =>{
      this.setState({isLoading: true}, () =>{
        fetch(`https://api.github.com/repos/reactjs/${this.props.location.state.repoName}/commits?per_page=20`)        
            .then(res => res.json())
            .then((res) => {
              const nextCommits = res.map(commit =>({
                  sha: commit.sha,
                  name: commit.commit.author.name,
                  email: commit.commit.author.email,
                  date: commit.commit.author.date,
                  message: commit.commit.message
              }));

              this.setState({
                commits:[
                  ...this.state.commits,
                  ...nextCommits
                ]
              })
            })
            .catch((err) => {
              this.setState({
                error: err.message
              });
            })
      })
    }
    
    
  componentDidMount(){
    this.getCommits()
  }

  render() {
    const commitItems = this.state.commits.map(commit => (      
        <li key={commit.sha}>
          <h3>{commit.name}</h3>
          <p>{commit.email}</p>
          <p>{commit.date}</p>
          <p>{commit.message}</p>
        </li>
      ))
    return (
    <Commit className="container">
      <h1>Commits from {this.props.location.state.repoName}</h1>
        <ul>
            {commitItems}
        </ul>        
    </Commit>

    )
  }
}

export default Commits;