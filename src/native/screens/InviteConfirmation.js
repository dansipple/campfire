
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';


import {connect} from 'react-redux';

class Invite extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666',
        navBarNoBorder: true
    };

    static navigatorButtons = {
        rightButtons: [{
            title: 'Done',
            id: 'done'
        }]
    };

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'done':
                    this.props.navigator.popToRoot();
                    break;
                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 35, padding: 10}}>
                <Image source={require('../../../img/big-check.png')} />
                <Text style={[styles.helperText, {marginTop: 15, fontSize: 22, color: '#3498db'}]}>{this.props.network.name} has been created!</Text>
                <Text style={styles.helperText}>Access Code</Text>
                <Text style={styles.accessCode}>{this.props.network.accessCode}</Text>

                <View style={{flex: 1, paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <Text style={styles.stepHeader}>Steps for users joining the network</Text>
                    <Text style={styles.step}>1. Download the Convo's App</Text>
                    <Text style={styles.step}>2. Create an account</Text>
                    <Text style={styles.step}>3. Click on 'Join a Network' and enter the access code above</Text>
                </View>
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