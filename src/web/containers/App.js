import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// dumb components
import Header     from '../components/Header';
import SelectNetwork from '../components/SelectNetwork';

/** The app entry point */
class DashboardApp extends Component {
    render() {
        // injected by connect call
        const { dispatch, data } = this.props;

        return (
            <div className="dashboard-app">
                <Header />
                <SelectNetwork {...this.props} />
            </div>
        );
    }
}

DashboardApp.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        appState: state.app
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(DashboardApp);