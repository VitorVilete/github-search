import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Loader from './Loader'
import Error from './Error'

const Repo = styled.div `
div {
  width:100%;
}

a {
    color:white;
    text-decoration: none;
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

const SearchSelect = styled.select `     
    border-radius: 4px;
    margin: 10px;
`;

const RepoButton = styled.span `
background:#7700FF;
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
            user: getUser(),
            isLoading: false,
            orderKey: 'name',
            orderBy: 'desc'
        }

        function getUser() {
            return props.user
                ? props.user
                : props.match.params.user;
        }
    }
    componentDidMount() {
        this.getRepos(this.state.user);
    }

    getRepos(user) {
        this.setState({
            isLoading: true
        }, () => {
            fetch(`https://api.github.com/users/${user}/repos`)
                .then(res => res.json())
                .then(data => this.setState({repos: data, isLoading: false}))
                .catch((err) => {
                    this.setState({error: err.message, isLoading: false});
                });
        });
    }    
        compareValues(key, order='asc') {
            return function(a, b) {
              if(!a.hasOwnProperty(key) || 
                 !b.hasOwnProperty(key)) {
                  return 0; 
              }
             
              const varA = (typeof a[key] === 'string') ? 
                a[key].toUpperCase() : a[key];
              const varB = (typeof b[key] === 'string') ? 
                b[key].toUpperCase() : b[key];
                
                
              let comparison = 0;
              if (varA > varB) {
                comparison = 1;
              } else if (varA < varB) {
                comparison = -1;
              }
              return (
                (order === 'desc') ? 
                (comparison * -1) : comparison
              );
            };
          }

    handleChange = event => {        
        if(this.state.repos){
            this.setState({orderKey: event.target.value}, () => {
                this.state.repos.sort(this.compareValues(this.state.orderKey))    
            })
        }
    }

    render() {
        const {repos, user, isLoading, error} = this.state;

        let result;

        if (isLoading) {
            result = <Loader></Loader>;
        } else {
            if (repos.length > 0) {                
                let repoItems = repos.sort(this.compareValues(this.state.orderKey))
                repoItems = repoItems.map(repo => (
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
                            pathname: `/${user}/repos/${repo.name}/commits`,
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
                    <h1>Repositories from {user}</h1>
                    <SearchSelect
                        label="Search Commits"
                        icon="search"
                        name="searchname"
                        onChange={this.handleChange}
                        value={this.state.orderKey}>
                        <option value="name">Name</option>
                        <option value="stargazers_count">Star Count</option>
                        <option value="language">Language</option>                        
                    </SearchSelect>
                    <ul>
                        {repoItems}
                    </ul>
                </React.Fragment>
            } else {
                let errorMessage = `No repositories found for the user ${user}`
                result = <React.Fragment>
                    <Error message={errorMessage}/>
                </React.Fragment>
            }
            if (error) {
                let errorMessage = `Error while trying to fetch the repositories: ${error}`
                result = <React.Fragment>
                    <Error message={errorMessage}/>
                </React.Fragment>
            }

        }
        return (
            <React.Fragment>
                <Repo className="container">
                    {result}
                </Repo>
            </React.Fragment>
        )
    }
}

export default Repos;
