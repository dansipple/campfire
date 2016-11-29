
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as signupActions from '../reducers/signup/actions';

import UserController from '../lib/controllers/user';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class SignupComplete extends Component {

    static navigatorStyle = {
        navBarButtonColor: '#666',
        navBarTextColor: '#666',
        navBarNoBorder: true
    };

    static navigatorButtons = {
        rightButtons: [{
            title: 'Done',
            id: 'create'
        }]
    };

    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            password: '',
            password2: '',
            passwordError: '',
            windowHeight: Dimensions.get('window').height
        };

        this.createAccount = this.createAccount.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    createAccount() {
        if(this.state.password.length < 6) {
            this.setState({
                passwordError: 'Passwords must be atleast 6 characters long'
            })
        }
        else if(this.state.password !== this.state.password2) {
            this.setState({
                passwordError: 'Your passwords must match'
            })
        }
        else {
            const state = this.props.state || {};
            UserController.create({
                first: state.first,
                last: state.last,
                email: state.email,
                title: state.role,
                college: state.college,
                password: this.state.password
            });
        }
    }

    onNavigatorEvent(event) {
        if (event.type == 'DeepLink') {
            this.handleDeepLink(event);
        } else {
            switch (event.id) {
                case 'create':
                    this.createAccount();
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
                <Text style={styles.helperText}>Password</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            password: event.nativeEvent.text
                        });
                    }}
                    secureTextEntry={true}
                    value={this.state.password}
                    placeholder="Password"
                />
                <Text style={styles.error}>{this.state.passwordError}</Text>
                <Text style={styles.helperText}>Confirm Password</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            password2: event.nativeEvent.text
                        });
                    }}
                    secureTextEntry={true}
                    value={this.state.password2}
                    placeholder="Password"
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

export default connect(mapStateToProps)(SignupComplete);