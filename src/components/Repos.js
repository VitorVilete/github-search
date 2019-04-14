import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader';

const Repo = styled.div `
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

const RepoButton = styled.span `
background:#7700FF;
color: "white";
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #7700FF;
border-radius: 3px;
`

class Repos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            user: this.props.user,
            isLoading: false
        }
    }
    componentDidMount() {
        fetch(`https://api.github.com/users/${this.state.user}/repos`)
            .then(res => res.json())
            .then(data => this.setState({repos: data}));
    }

    render() {
        const {repos, user, isLoading} = this.state;

        let result;

        if (isLoading) {
            result = <Loader></Loader>;
        } else {
            if (repos) {
                const repoItems = repos.map(repo => (
                    <li key={repo.id}>
                        <h3>{repo.name}</h3>
                        <p>Star Count: {repo.stargazers_count}
                            <span role="img" aria-label="star">⭐</span>
                        </p>
                        <p>Repository Link:
                            <a className='emoji' href={repo.url}>
                                <span role="img" aria-label="link">🔗</span>
                            </a>
                        </p>
                        <Link
                            to={{
                            pathname: `/repos/${repo.name}/commits`,
                            state: {
                                repoName: repo.name
                            }
                        }}>
                            <RepoButton>
                                Commits
                            </RepoButton>
                        </Link>
                        <p>
                            <strong>Language:</strong>
                            {repo.language}</p>
                        {repo.description && <p>
                            <strong>Description:</strong>
                            {repo.description}
                        </p>
}
                    </li>
                ))

                result = <React.Fragment>
                    <Repo className="container">
                        <h1>Repos from {user}</h1>
                        <ul>
                            {repoItems}
                        </ul>
                    </Repo>
                </React.Fragment>
            } else {
                result = <React.Fragment>
                    <Repo className="container">
                        <h1>No repos found for the user {user}
                            <span role="img" aria-label="sad">😟</span>
                        </h1>
                    </Repo>
                </React.Fragment>
            }

        }
        return (
            <React.Fragment>
                {result}
            </React.Fragment>
        )
    }
}

Repos.defaultProps = {
    user: 'reactjs'
}

export default Repos;
