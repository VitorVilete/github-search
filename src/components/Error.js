import React, {Component} from 'react'

class Error extends Component {
    render() {

        return (
            <div>
                <h3>{this.props.message}
                    <span role="img" aria-label="sad">😟</span>
                </h3>
            </div>
        )
    }
}

export default Error;