// https://github.com/kauffecup/react-native-web-hello-world

import React, { Component, PropTypes } from 'react';
import { Provider }             from 'react-redux';
import App from './App';
import DevTools                 from './DevTools';

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <div>
                    <App />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};