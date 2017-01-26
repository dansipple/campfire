import React, { Component, PropTypes } from 'react';

export default class HelloWorld extends Component {
    render() {
        const { onClick, color } = this.props;
        return (
            <div className="hello-world">Hello World</div>
        );
    }
}

HelloWorld.propTypes = {

}