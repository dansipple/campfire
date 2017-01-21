import React, { Component } from 'react';
import {TouchableHighlight, TouchableOpacity, TextInput, Image, Text, StyleSheet, Dimensions, View } from 'react-native';

import firebase from '../../lib/firebase';
import {connect} from 'react-redux';

import * as appActions from '../reducers/app/actions';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.tryLogin = this.tryLogin.bind(this);
        this.signup = this.signup.bind(this);
        this.showTC = this.showTC.bind(this);
    }

    login(user) {
        //this.props.dispatch(appActions.login(user));
    }

    tryLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                this.setState({
                    error: 'Incorrect email/password please try again!'
                })
            });
    }
    signup() {
        this.props.navigator.push({
            screen: 'Signup',
            title: 'Sign Up',
            backButtonTitle: ''
        })
    }
    showTC() {
        this.props.navigator.showModal({
           screen: 'TermsAndConditions',
            title: 'Terms and Conditions'
        });
    }

    render() {
        let {height, width} = Dimensions.get('window');

        return (
                <KeyboardAwareScrollView style={[styles.container]}>
                    <Image style={styles.logo} source={require('../../../img/logo-big.png')} />
                    <View>
                        <Text style={styles.error}>{this.state.error}</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={'Email'}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            onChangeText={(text) => {
                                this.setState({email: text});
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={'Password'}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="#666"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password: text});
                            }}
                        />
                        <TouchableHighlight onPress={this.tryLogin} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableHighlight>
                        <TouchableOpacity onPress={this.signup} style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showTC}>
                            <Text style={styles.tc}>Continuing means you agree to our terms and conditions</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db',
        padding: 25,
        paddingTop: 50,
        paddingBottom: 100
    },
    logo: {
        marginBottom: 10,
        alignSelf: 'center'
    },
    fbLogin: {
        backgroundColor: '#4267B2',
        marginTop: 40,
        padding: 20
    },
    fbLoginText: {
        color: '#fff'
    },
    input: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        height: 60,
        color: '#666',
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    loginButton: {
        backgroundColor: '#4267B2',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 17
    },
    error: {
        alignSelf: 'center',
        color: '#fff',
        paddingBottom: 10
    },
    signupButton: {
        borderColor: '#fff',
        borderWidth: 1,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 17
    },
    tc: {
        color: '#fff',
        marginTop: 15,
        fontSize: 11,
        textAlign: 'center'
    }
});

export default connect()(Login);