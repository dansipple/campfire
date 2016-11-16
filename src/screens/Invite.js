
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';


import {connect} from 'react-redux';

class Invite extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666'
    };


    constructor(props) {
        super(props);

    }
    getNetworkDetails() {
        this.props.dispatch(networksActions.loadNetwork(this.props.network._id));
    }
    componentWillMount() {
        this.getNetworkDetails();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f7f9', alignItems: 'center', paddingTop: 35, padding: 10}}>
                <Text style={[styles.helperText, {marginTop: 15, fontSize: 22, color: '#3498db'}]}>{this.props.state.adminNetwork.name}</Text>
                <Text style={styles.helperText}>Access Code</Text>
                <Text style={styles.accessCode}>{this.props.state.adminNetwork.accessCode}</Text>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    helperText: {
        color: '#888',
        fontSize: 13,
        lineHeight: 25,
        marginBottom: 8,
        textAlign: 'center'
    },
    accessCode: {
        color: '#555',
        fontSize: 22,
        textAlign: 'center'
    },
    stepHeader: {
        fontSize: 17,
        color: '#555',
        paddingBottom: 8
    },
    step: {
        fontSize: 12,
        color: '#666'
    }
});

function mapStateToProps(state) {
    return {
        state: state.networks,
        appState: state.app
    };
}

export default connect(mapStateToProps)(Invite);