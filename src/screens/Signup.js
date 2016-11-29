
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as signupActions from '../reducers/signup/actions';

import firebase from '../lib/firebase';

import {connect} from 'react-redux';

import Helpers from '../lib/utils/helpers';

var Analytics = require('react-native-firebase-analytics');

class Signup extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666',
        navBarNoBorder: true
    };

    static navigatorButtons = {
        rightButtons: [{
            title: 'Next',
            id: 'next'
        }]
    };

    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            first: '',
            last: '',
            email: '',
            firstError: '',
            lastError: '',
            emailError: '',
            windowHeight: Dimensions.get('window').height
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    next() {
        let hasError = false;
        if(!this.state.first.length) {
            this.setState({
                firstError: 'Enter your first name'
            });
            hasError = true;
        }
        if(!this.state.last.length) {
            this.setState({
                lastError: 'Enter your last name'
            });
            hasError = true;
        }
        if(!Helpers.validateEmail(this.state.email)) {
            this.setState({
                emailError: 'Enter a valid email address'
            });
            hasError = true;
        }
        if(!hasError) {
            firebase.app.auth().fetchProvidersForEmail(this.state.email)
                .then((data) => {
                    if(data.length) {
                        this.setState({
                            emailError: 'There is already an account for this email!'
                        })
                    }
                    else {
                        this.props.dispatch(signupActions.updateProperty({
                            first: this.state.first,
                            last: this.state.last,
                            email: this.state.email
                        }));
                        this.props.navigator.push({
                            screen: 'SignupDetails',
                            title: 'Sign Up',
                            backButtonTitle: ''
                        });
                    }

                });
        }
    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'next':
                    this.next();
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

    render() {
        return (
            <View style={{ height: this.state.windowHeight - 100, backgroundColor: '#fff', justifyContent: 'center', padding: 15}}>
                <Text style={styles.helperText}>First Name</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            first: event.nativeEvent.text
                        });
                    }}
                    autoCorrect={false}
                    value={this.state.first}
                    placeholder="John"
                />
                <Text style={styles.error}>{this.state.firstError}</Text>
                <Text style={styles.helperText}>Last Name</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    onChange={(event) => {
                        this.setState({
                            last: event.nativeEvent.text
                        });
                    }}
                    autoCorrect={false}
                    value={this.state.last}
                    placeholder="Doe"
                />
                <Text style={styles.error}>{this.state.lastError}</Text>
                <Text style={styles.helperText}>Email Address</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    onChange={(event) => {
                        this.setState({
                            email: event.nativeEvent.text
                        });
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.email}
                    placeholder="dan@findconvos.com"
                />
                <Text style={styles.error}>{this.state.emailError}</Text>
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
        color: '#3498db',
        marginBottom: 12
    },
    helperText: {
        color: '#888',
        fontSize: 14,
        lineHeight: 25,
        marginBottom: 8
    },
    error: {
        color: 'red'
    }
});

function mapStateToProps(state) {
    return {
        state: state.signup
    };
}

export default connect(mapStateToProps)(Signup);