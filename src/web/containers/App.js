import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// dumb components
import Header     from '../components/Header';
import HelloWorld from '../components/HelloWorld';

/** The app entry point */
class ReactNativeWebHelloWorld extends Component {
    render() {
        // injected by connect call
        const { dispatch, color, data } = this.props;

        return (
            <div className="react-native-web">
                <Header />
                <HelloWorld
                    color={color}
                />
            </div>
        );
    }
}

ReactNativeWebHelloWorld.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        appState: state.app
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(ReactNativeWebHelloWorld);