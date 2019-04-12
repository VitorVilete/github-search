import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from "styled-components";

const Header = styled.header `
  background: #7700FF;
`;

class Navigation extends Component {
    render() {
        return (
            <Header>
                <div className="container">
                    <NavLink to="">Github-Search</NavLink>
                    <nav></nav>
                </div>
            </Header>
        )
    }
}

export default Navigation;