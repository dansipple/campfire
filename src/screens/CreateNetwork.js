
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as networksActions from '../reducers/networks/actions';
import * as appActions from '../reducers/app/actions';

import NetworksController from '../lib/controllers/networks';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class CreateNetwork extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666',
        navBarNoBorder: true
    };

    static navigatorButtons = {
        rightButtons: [{
            title: 'Create',
            id: 'create'
        }]
    };

    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            content: '',
            windowHeight: Dimensions.get('window').height
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    createNetwork() {
        NetworksController.createNetwork(this.props.appState.currentUser._id, this.state.content, false)
            .then((network) => {
                this.props.navigator.push({
                    title: 'Create a Network',
                    screen: 'InviteConfirmation',
                    backButtonTitle: '',
                    backButtonHidden: true,
                    passProps: {
                        network: network
                    }
                });
                Analytics.logEvent('NETWORK_CREATE');
                networksActions.loadNetworks();
            })
    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'create':
                    this.createNetwork();
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

        Analytics.logEvent('MODAL_OPEN', {'id': 'create_network'});
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

    render() {
        return (
            <View style={{ height: this.state.windowHeight - 100, backgroundColor: '#fff', justifyContent: 'center', padding: 15}}>
                <Text style={styles.helperText}>Name your network</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            content: event.nativeEvent.text
                        });
                    }}
                    value={this.state.content}
                    placeholder="Acme Inc."
                />
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
    }
});

function mapStateToProps(state) {
    return {
        state: state.networks,
        appState: state.app
    };
}

export default connect(mapStateToProps)(CreateNetwork);