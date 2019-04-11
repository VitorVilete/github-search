import React, { Component } from 'react'

class Commits extends Component {    
  constructor(props){
    super(props);
    this.state = {
        commits:[]
    }
  }
  componentDidMount(){
    const repoName = this.props.location.state.repoName;
    // const { repoName } = this.props.match.params;
    fetch(`https://api.github.com/repos/reactjs/${repoName}/commits`)        
        .then(res => res.json())
        .then(data => this.setState({commits:data}));
  }
  render() {
    const commitItems = this.state.commits.map(commit => (      
        <div key={commit.sha}>
          <h3>{commit.commit.author.name}</h3>
          <p>{commit.commit.author.email}</p>
          <p>{commit.commit.author.date}</p>
          <p>{commit.commit.message}</p>
        </div>
      ))
    return (
      <div>
        <div>
        {commitItems}
        </div>
      </div>
    )
  }
}

export default Commits;