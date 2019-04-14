import React, {Component} from 'react'
import styled, {keyframes} from 'styled-components'

const rotate = keyframes `
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const Rotate = styled.span `
margin:auto;
animation: ${rotate} 2s linear infinite;
padding: 2rem 1rem;
font-size: 1.2rem;
`;
class Loader extends Component {

    render() {
        const load = <Rotate><span role="img" aria-label="loading">🛠️</span></Rotate>
        return (
            <React.Fragment>
                {load}
            </React.Fragment>
        )
    }

}

export default Loader;
