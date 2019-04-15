import React, {Component} from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import Error from './Error'

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
            repo: getRepo(),
            user: getUser(),
            limit: 20,
            page:1,
            isLoading: false
        }
        this.handleOnScroll = this.handleOnScroll.bind(this);

        function getUser() {
            return props.user
                ? props.user
                : props.match.params.user;
        }
        function getRepo() {
            return props.repo
                ? props.repo
                : props.match.params.repo;
        }
    }

    getCommits() {
        if (this.state.isLoading) {
            return;
        }
        const {repo, user, limit, page} = this.state;
        this.setState({
            isLoading: true
        }, () => {
            fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=${limit}&page=${page}`)
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
                        ],
                        isLoading: false,
                        page: page + 1
                    })
                })
                .catch((err) => {
                    this.setState({error: err.message, isLoading: false});
                })
        })

    }

    componentDidMount() {
        this.getCommits()
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    handleOnScroll() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom && !this.state.search) {
           this.getCommits()
        }
    }

    handleChange = event => {
        this.setState({search: event.target.value});
    }

    render() {
        const {commits, search, repo, isLoading, error} = this.state;
        const filteredCommits = commits.filter(commit => {

            if (commit.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            if (commit.email.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            if (commit.message.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
                return true;
            
            return false;
        });

        let result;

        if (isLoading && commits.length === 0) {
            result = <Loader></Loader>
        } else {
            if (commits.length > 0) {
                const commitItems = filteredCommits.map(commit => (
                    <li key={commit.sha}>
                        <h3>Author Name: {commit.name}</h3>
                        <p>Author Email: {commit.email}</p>
                        <p>Commit Date: {commit
                                .date
                                .toLocaleString()}</p>
                        <p>Commit Message: {commit.message}</p>
                    </li>
                ))
                result = <React.Fragment>
                    <h1>Commits from {repo}</h1>
                    <label>Search</label>
                    <input
                        label="Search Commits"
                        icon="search"
                        name="searchname"
                        onChange={this.handleChange}/>
                    <ul>
                        {commitItems}
                    </ul>
                </React.Fragment>

            } else {
                let errorMessage = `No commits found for the repository ${repo}`
                result = <React.Fragment>
                    <Error message={errorMessage}/>
                </React.Fragment>
            }

            if (error) {
                let errorMessage = `Error while trying to fetch the commits: ${error}`
                result = <React.Fragment>
                    <Error message={errorMessage}/>
                </React.Fragment>
            }
        }

        return (
            <React.Fragment>
                <Commit className="container">
                    {result}
                </Commit>
            </React.Fragment>

        )

    }
}

export default Commits;