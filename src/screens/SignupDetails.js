
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet, Dimensions, RefreshControl, ListView, Text, View } from 'react-native';

import * as signupActions from '../reducers/signup/actions';

import {connect} from 'react-redux';

var Analytics = require('react-native-firebase-analytics');

class SignupDetails extends Component {

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
            role: '',
            college: '',
            windowHeight: Dimensions.get('window').height
        };

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    next() {
        this.props.dispatch(signupActions.updateProperty({
            role: this.state.role,
            college: this.state.college
        }));
        this.props.navigator.push({
            screen: 'SignupComplete',
            title: 'Sign Up',
            backButtonTitle: ''
        });
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
                <Text style={styles.helperText}>Current role</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    autoFocus={true}
                    onChange={(event) => {
                        this.setState({
                            role: event.nativeEvent.text
                        });
                    }}
                    value={this.state.role}
                    placeholder="Developer at Convos"
                />
                <Text style={styles.helperText}>College</Text>
                <TextInput
                    style={[styles.textareaStyle]}
                    onChange={(event) => {
                        this.setState({
                            college: event.nativeEvent.text
                        });
                    }}
                    value={this.state.college}
                    placeholder="Harvard University"
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
    }
});

function mapStateToProps(state) {
    return {
        state: state.signup
    };
}

export default connect(mapStateToProps)(SignupDetails);