import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import App from './app.js';

class ardour extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('ardour', () => ardour);
