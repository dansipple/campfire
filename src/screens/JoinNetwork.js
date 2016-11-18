
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, TextInput, Keyboard, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';

import NetworksController from '../lib/controllers/networks';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class JoinNetwork extends Component {
    static navigatorButtons = {
         rightButtons: [{
            title: 'Join',
            id: 'join'
         }]
    };

    static navigatorStyle = {
        navBarButtonColor: '#777',
        navBarTextColor: '#666',
        navBarNoBorder: true
    };

    constructor(props) {
        super(props);

        this.state = {
            accessCode: '',
            windowHeight: Dimensions.get('window').height,
            error: ''
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'join':
                    this.joinNetwork();
                    break;
                default:
                    console.log('Unhandled event ' + event.id);
                    break;
            }
        }
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({
            windowHeight: newSize
        })
    }

    keyboardWillHide (e) {
        this.setState({
            windowHeight: Dimensions.get('window').height
        });
    }

    joinNetwork() {
        NetworksController.joinNetwork(this.props.appState.currentUser._id, this.state.accessCode)
        .then(() => {
            Analytics.logEvent('NETWORK_JOIN');
            this.props.dispatch(networksActions.loadNetworks());
            this.props.navigator.popToRoot();
        }).catch(() => {
            this.setState({
                error: 'Access denied. Make sure you\'re access code is correct'
            })
        });
    }

    render() {
        return (
            <View style={{ height: this.state.windowHeight - 100, backgroundColor: '#fff', justifyContent: 'center', padding: 15}}>
                <Text style={styles.helperText}>Enter your 5 digit access code</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    maxLength={5}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(event) => {
                        this.setState({
                            accessCode: event.nativeEvent.text
                        });
                    }}
                    value={this.state.accessCode}
                    placeholder="67gaf"
                />
                <Text style={styles.error}>{this.state.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textareaStyle: {
        borderColor: 'transparent',
        backgroundColor: '#fff',
        fontSize: 25,
        lineHeight: 30,
        height: 30,
        color: '#3498db'
    },
    helperText: {
        color: '#888',
        fontSize: 14,
        lineHeight: 25,
        marginBottom: 8
    },
    error: {
        color: '#da3d3d',
        fontSize: 12
    }
});

function mapStateToProps(state) {
    return {
        state: state.networks,
        appState: state.app
    };
}

export default connect(mapStateToProps)(JoinNetwork);