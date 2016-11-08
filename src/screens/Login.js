import React, { Component } from 'react';
import {TouchableHighlight, TouchableOpacity, Image, StyleSheet, Dimensions, View } from 'react-native';

import {LoginButton, AccessToken} from 'react-native-fbsdk';

import firebase from '../lib/firebase';
import {connect} from 'react-redux';

import * as appActions from '../../src/reducers/app/actions';

class Login extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(user) {
        this.props.dispatch(appActions.login(user));
    }

    render() {
        let {height, width} = Dimensions.get('window');

        return (
                <View style={[styles.container, {width: width, height: height}]}>
                    <Image style={styles.logo} source={require('../../img/logo-big.png')} />
                    <LoginButton
                        style={{height: 50, width: 250}}
                        readPermissions={['public_profile', 'email', 'user_friends']}
                        loginBehaviorIOS={'native'}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: ", error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.", result);
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                                            firebase.app.auth().signInWithCredential(credential)
                                            .then((user) => {
                                                console.log("Sign In Success", user);
                                            }, (error) => {
                                                console.log("Sign In Error", error);
                                            });
                                        })
                                 }
                            }
                        }
                        onLogoutFinished={() => {}}/>
                    {/*
                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR7')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Colin</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR8')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Dan</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.login.bind(this, '-KPzFJ697NbkNZoHVBR9')} style={styles.fbLogin}>
                        <Text style={styles.fbLoginText}>Login with Red</Text>
                    </TouchableHighlight>
                    */}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
        backgroundColor: '#3498db',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 100
    },
    fbLogin: {
        backgroundColor: '#4267B2',
        marginTop: 40,
        padding: 20
    },
    fbLoginText: {
        color: '#fff'
    }
});

export default connect()(Login);