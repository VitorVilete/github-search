import React, {Component} from 'react'
import styled from 'styled-components';

const Commit = styled.div `
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
    constructor(props) {
        super(props);
        this.state = {
            commits: [],
            search: "",
            repoName: this.props.location.state.repoName
        }
    }

    getCommits = () => {
        const {repoName} = this.state;
        fetch(`https://api.github.com/repos/reactjs/${repoName}/commits?per_page=20`)
            .then(res => res.json())
            .then((res) => {
                const nextCommits = res.map(commit => ({
                    sha: commit.sha,
                    name: commit.commit.author.name,
                    email: commit.commit.author.email,
                    date: new Date(commit.commit.author.date),
                    message: commit.commit.message
                }));
                this.setState({
                    commits: [
                        ...this.state.commits,
                        ...nextCommits
                    ]
                })
            })
            .catch((err) => {
                this.setState({error: err.message});
            })

    }

    componentDidMount() {
        this.getCommits()
    }

    handleChange = event => {
        this.setState({search: event.target.value});
    }

    render() {
        const {commits, search, repoName} = this.state;
        const filteredCommits = commits.filter(commit => {

            if (commit.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            if (commit.email.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            if (commit.message.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            
            return false;
        });

        if (filteredCommits) {
            const commitItems = filteredCommits.map(commit => (
                <li key={commit.sha}>
                    <h3>Author Name:{commit.name}</h3>
                    <p>Author Email: {commit.email}</p>
                    <p>Commit Date: {commit
                            .date
                            .toLocaleString()}</p>
                    <p>Commit Message: {commit.message}</p>
                </li>
            ))
            return (
                <Commit className="container">
                    <h1>Commits from {repoName}</h1>

                    <label>Search</label>
                    <input
                        label="Search Commits"
                        icon="search"
                        name="searchname"
                        onChange={this.handleChange}/>
                    <ul>
                        {commitItems}
                    </ul>
                </Commit>

            )
        } else {
            return (
                <Commit className="container">
                    <h1>No commits found for the repository {repoName}
                        <span role="img" aria-label="sad">😟</span>
                    </h1>
                </Commit>
            )
        }
    }
}

export default Commits;